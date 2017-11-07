## Discovery

_Discovery_ is a backend component in _SPHINX_.
Its purpose is to provide access to Sentinel-2 data and its metadata.

The following functionalities are provided:

 - A Tile Map Service for each provided scene, channel and if available resolution.
 - Metadate with following filter options:
    - Scene name filter
    - bbox filter
    - min date filter
    - max date filter
 - pixel value access
 
This document is intended to document the API and to describe some background
to the realisation.

The _Discovery_-Team consists of: Niklas Trzaska

### Tile Map Service (TMS) and metadata foundation

This section describes the creation of the TMS and metadata foundation.
These two aspects are described in one section, as they have been created on one processing step.


The TMS and metadata foundation have been created with GDAL.
To automate the processing, the following scripts have been written:

The purpose of the following script is to aggregate the execution of other scripts, which
which will do the main work:

```bash
#!/bin/bash

metadataToJson.sh && moveIMG_DATAToRoot.sh && TMSwith1C.sh && TMSwith2A.sh

```

The following script is used to write the metadata from an xml file as JSON into another.
This step is done, as JSON is much easier to process with JavaScript and by doing the work 
right here saves later work and complexity in the code.
```bash
#!/bin/bash

echo --- Start Create Metadata as JSON---

for scene in *
do
(
        cd $scene
        if [ -e MTD_MSIL2A.xml ]; then
        echo Working on 2A product &&
        gdalinfo -json MTD_MSIL2A.xml > MTD.json
        fi

        if [ -e MTD_MSIL1C.xml ]; then
        echo Working on 1C product &&
        gdalinfo -json MTD_MSIL1C.xml > MTD.json
        fi

)
done

echo --- End Create Metadata as JSON---

```

The follwing script moves for each scene the IMG_DATA folder to the root of the scene-folder.
By this the path to access files becomes shorter and more comfortable.
```bash
#!/bin/bash


echo --- Start placing IMG_DATA at the root from main folder ---


for scene in *
do
(       
        cd $scene && cd GRANULE && cd * && mv IMG_DATA ../../

)
done

echo --- End placing IMG_DATA at the root from main folder ---

```
The following script processes MSIL1C data. It creates tiles for each band.
```bash
#!/bin/bash


echo --- Start building TMS with 1C Data ---

for scene in *
do
(
cd $scene &&
if [ -e MTD_MSIL1C.xml ]; then
        echo scene 2c 
        cd IMG_DATA

        for image in *.jp2
        do
        (
                filename=$image
                filenameWithoutType=${filename%.*}
                gdal_translate -ot Byte -scale $image $filenameWithoutType.tif 
        )
        done



        for image in *.tif
        do
        (
                filename=$image
                num=${filename%.*}
                tmsName=${num: -3:3}
                gdal2tiles.py -z '6-14' $image $tmsName
        )
        done

fi
)
done

echo --- End building TMS with 1C Data ---

```

The following script processes MSIL2A-data. It creates tiles for each resolution and band.
```bash
#!/bin/bash


echo --- Start building TMS with 2A Data ---

for scene in *
do
(
cd $scene &&
if [ -e MTD_MSIL2A.xml ]; then
  
        cd IMG_DATA &&

       for resolution in *
                do
                (

                        cd $resolution && 

                                for image in *.jp2
                                do
                                (
                                                filename=$image
                                                filenameWithoutType=${filename%.*}
                                                gdal_translate -ot Byte -scale $image $filenameWithoutType.tif 

                                )
                                done

                                for image in *.tif
                                do
                                (
                                                filename=$image
                                                num=${filename%.*}
                                                tmsName=${num: -7:3}


                                                gdal2tiles.py -z '6-14' $image $tmsName
                                )
                                done

                )
                done

fi
)
done

echo --- End building TMS with 2A Data ---

```

### TMS API
These files are made accessible by using a static resource access to the folders.
#### MSIL1C
**Get:** /img/datasetidentifier/IMG_DATA/band/Z/X/Y.png

 * datasetidentifier: MMM_MSIL1C_YYYYMMDDHHMMSS_Nxxyy_ROOOTxxxxx<Product Discriminator>.SAFE
band: B01, B02, B03, ... B12, BBA
Z/X/Y according TMS

**Response** 
256x256 tile in .png format


#### MSIL2A
**Get:** /img/datasetidentifier/IMG_DATA/resolution/band/Z/X/Y.png

 * datasetidentifier: MMM_MSIL2A_YYYYMMDDHHMMSS_Nxxyy_ROOOTxxxxx<Product Discriminator>.SAFE
 * resolution: R10m, R20m, R60m
 * bands: 
   * R10m: B02, B03, B04, B08, TCI, WVP, AOT
   * R20m: B02, ..., B07, B11, B12, BBA, AOT, SCL, TCI, VIS, WVP
   * R60m: B01, ..., B07, B09, B11, B12, BBA, AOT, SCL, TCI, WVP
 * Z/X/Y according TMS

**Response** 
256x256 tile in .png format



## Metadate filtering

### API
GET: /datasets

**Accepted query parameters:**
 * identifiers: Whitespace seperated String of elements that will be used for matching (matching what?)
 * bbox: Spatial extent as bbox in WGS84: minx, miny, maxx, maxy
 * minDateTime: How old the younges image is allowd to be (exclusive)
 * maxDateTime: How old the oldes image is allowed to be (exclusive)

**Response:**
Array of objects which contains the metadata of matching scenes.


### How it is done
When the server starts, it runs through all scenes in a given folder. For this these scenes have 
to be in the previously created folder structure.
Each MTD.json file is parsed to an array. In this step, further information are added 
(scene-folder name and url to TM-Services).
The code for this is in _cache/metadataCache.js_.

Using an array to store the meta-data as objects in an array,
it is easy to use filter functions. These are chained behind each other.
Finally an array is returned with objects, which passed all filter functions.
The filter functions are aggregated in _filterFunctions/filter.js_.
Each filter function is saved in an own file to ensure maintainability.

The following subsections describe the provided filter.

#### Filename filter
If the query-parameter _identifiers_ is provided, its value is splitted at its white spaces.
Each splitted element is handled as a filter criteria.
The name of a scene has to contain every filter criteria to pass this filter.

The filter is implemented in _filterFunctions/fileNameFilter.js_.

#### Date filter (minimum and maximum)
The given date in minDateTime/maxDateTime will be compared with _DATATAKE_1_DATATAKE_SENSING_START_
from the metadata.
The comparison is strict (>,<).
The given value in the query parameters are passed to _new Date(...)_.
If the result is valid, it will be processed. Otherwise the query element will be ignored.

The filter is implemented in _filterFunctions/minDateFilter.js_/_filterFunctions/maxDateFilter.js_.


#### Polygone intersection filter
The given _bbox_ in the query is used to filter by spatial extend.
A scene passes the filter if at least one coordinate of the given bbox lies inside 
the footprint or if at least one coordinate of the polygone lies inside the bbox.
By this, the following cases of intersection are covered:
![polygone intersection](./Polygone_Bbox_intersection.png)


#### Examples 
##### Simple valid request with filename filter
[http://gis-bigdata:11016/datasets?identifiers=20171010T104021](http://gis-bigdata:11016/datasets?identifiers=20171010T104021)

###### Response

```json
[
    {
        "sceneName": "S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE",
        "currentFilePath": "../sentinel2/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE",
        "MTD": {
            "description": "MTD_MSIL1C.xml",
            "driverShortName": "SENTINEL2",
            "driverLongName": "Sentinel 2",
            "files": [
                "MTD_MSIL1C.xml"
            ],
            "size": [
                512,
                512
            ],
            "coordinateSystem": {
                "wkt": ""
            },
            "metadata": {
                "": {
                    "CLOUD_COVERAGE_ASSESSMENT": "4.9866",
                    "DATATAKE_1_DATATAKE_SENSING_START": "2017-10-10T10:40:21.026Z",
                    "DATATAKE_1_DATATAKE_TYPE": "INS-NOBS",
                    "DATATAKE_1_ID": "GS2A_20171010T104021_012017_N02.05",
                    "DATATAKE_1_SENSING_ORBIT_DIRECTION": "DESCENDING",
                    "DATATAKE_1_SENSING_ORBIT_NUMBER": "8",
                    "DATATAKE_1_SPACECRAFT_NAME": "Sentinel-2A",
                    "DEGRADED_ANC_DATA_PERCENTAGE": "0",
                    "DEGRADED_MSI_DATA_PERCENTAGE": "0",
                    "FOOTPRINT": "POLYGON((-5.792574778325615 15.21306525473414, -5.77238811748588 15.30284082872241, -5.759542476122597 15.35996672719849, -4.772206157911985 15.37008837747189, -4.764121373097517 14.377826199225611, -5.781720811443401 14.368052294534657, -5.792574778325615 15.21306525473414))",
                    "FORMAT_CORRECTNESS_FLAG": "PASSED",
                    "GENERAL_QUALITY_FLAG": "PASSED",
                    "GENERATION_TIME": "2017-10-10T10:49:47.000000Z",
                    "GEOMETRIC_QUALITY_FLAG": "PASSED",
                    "PREVIEW_GEO_INFO": "Not applicable",
                    "PREVIEW_IMAGE_URL": "Not applicable",
                    "PROCESSING_BASELINE": "02.05",
                    "PROCESSING_LEVEL": "Level-1C",
                    "PRODUCT_START_TIME": "2017-10-10T10:40:21.026Z",
                    "PRODUCT_STOP_TIME": "2017-10-10T10:40:21.026Z",
                    "PRODUCT_TYPE": "S2MSI1C",
                    "PRODUCT_URI": "S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE",
                    "QUANTIFICATION_VALUE": "10000",
                    "RADIOMETRIC_QUALITY_FLAG": "PASSED",
                    "REFERENCE_BAND": "B1",
                    "REFLECTANCE_CONVERSION_U": "1.00159547411106",
                    "SENSOR_QUALITY_FLAG": "PASSED",
                    "SPECIAL_VALUE_NODATA": "0",
                    "SPECIAL_VALUE_SATURATED": "65535"
                },
                "SUBDATASETS": {
                    "SUBDATASET_1_NAME": "SENTINEL2_L1C:MTD_MSIL1C.xml:10m:EPSG_32630",
                    "SUBDATASET_1_DESC": "Bands B2, B3, B4, B8 with 10m resolution, UTM 30N",
                    "SUBDATASET_2_NAME": "SENTINEL2_L1C:MTD_MSIL1C.xml:20m:EPSG_32630",
                    "SUBDATASET_2_DESC": "Bands B5, B6, B7, B8A, B11, B12 with 20m resolution, UTM 30N",
                    "SUBDATASET_3_NAME": "SENTINEL2_L1C:MTD_MSIL1C.xml:60m:EPSG_32630",
                    "SUBDATASET_3_DESC": "Bands B1, B9, B10 with 60m resolution, UTM 30N",
                    "SUBDATASET_4_NAME": "SENTINEL2_L1C:MTD_MSIL1C.xml:TCI:EPSG_32630",
                    "SUBDATASET_4_DESC": "True color image, UTM 30N"
                }
            },
            "cornerCoordinates": {
                "upperLeft": [
                    0,
                    0
                ],
                "lowerLeft": [
                    0,
                    512
                ],
                "lowerRight": [
                    512,
                    512
                ],
                "upperRight": [
                    512,
                    0
                ],
                "center": [
                    256,
                    256
                ]
            },
            "wgs84Extent": {
                "type": "Polygon",
                "coordinates": [
                    []
                ]
            },
            "bands": []
        },
        "availableBands": [
            "B01",
            "B02",
            "B03",
            "B04",
            "B05",
            "B06",
            "B07",
            "B08",
            "B09",
            "B10",
            "B11",
            "B12",
            "B8A",
            "TCI"
        ],
        "tmsUrls": {
            "B01": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B01",
            "B02": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B02",
            "B03": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B03",
            "B04": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B04",
            "B05": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B05",
            "B06": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B06",
            "B07": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B07",
            "B08": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B08",
            "B09": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B09",
            "B10": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B10",
            "B11": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B11",
            "B12": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B12",
            "B8A": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/B8A",
            "TCI": "http://gis-bigdata:11016/img/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/TCI"
        }
    }
]
```

## Pixel value
As the provided tiles to not carry the original measurement values, 
_Discovery_ provides access to the original measurement data.

### API
GET: /pixelValue

**Accepted query parameters:**
 * identifier: scene name 
 * band
 * lat
 * long

**Response:**
Object, containing the pixel values

#### Examples 
##### Valud Request
[http://gis-bigdata:11016/pixelValue?identifier=S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE&band=TCI&lat=15&long=-5](http://gis-bigdata:11016/pixelValue?identifier=S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE&band=TCI&lat=15&long=-5)

###### Response

```json
{  
   "Report":{  
      "pixel":"8496",
      "line":"4074",
      "BandReport":[  
         {  
            "band":"1",
            "Value":"161"
         },
         {  
            "band":"2",
            "Value":"129"
         },
         {  
            "band":"3",
            "Value":"115"
         }
      ]
   }
}
```

##### Invalud Request
[http://gis-bigdata:11016/pixelValue?identifier=S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE&band=TCI&lat=-5&long=-5](http://gis-bigdata:11016/pixelValue?identifier=S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE&band=TCI&lat=-5&long=-5)

###### Response

```json
{  
   "Report":{  
      "pixel":"7826",
      "line":"225304",
      "Alert":"Location is off this file! No further details to report."
   }
}
```