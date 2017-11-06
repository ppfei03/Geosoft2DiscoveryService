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
 -pixel value access
 
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
The following script processes 1C-Data. It creates tiles for each band.
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

The following script processes 2A-Data. It creates tiles for each resolution and band.
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

These files are made accessible by using a static resource access to the folders.

