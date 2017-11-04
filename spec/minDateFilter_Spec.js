// const minDateFilter = require('../filterFunctions/minDateFilter.js').minDateFilter;
//
//
// describe('filterMinDate', () => {
//   it('filters the correct elements for a valid give date', done => {
//     const validDateTimeString = "2017-10-07T10:30:21.026Z";
//     const reqObj = {filterResult: testArray, query: {minDate: validDateTimeString}};
//
//     minDateFilter(reqObj).then(result => {
//       expect(result.filterResult.length).toEqual(2); done();
//     });
//   });
//
//   it('filters the correct elements for an invalid give date', done => {
//     const validDateTimeString = "%";
//     const reqObj = {filterResult: testArray, query: {minDate: validDateTimeString}};
//
//     minDateFilter(reqObj).then(result => {
//       expect(result.filterResult.length).toEqual(4); done();
//     });
//   });
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// let testArray = [
//   {
//       "sceneName":"S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE",
//       "currentFilePath":"../sentinel2/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE",
//       "MTD":{
//          "description":"MTD_MSIL2A.xml",
//          "driverShortName":"SENTINEL2",
//          "driverLongName":"Sentinel 2",
//          "files":[
//             "MTD_MSIL2A.xml"
//          ],
//          "size":[
//             512,
//             512
//          ],
//          "coordinateSystem":{
//             "wkt":""
//          },
//          "metadata":{
//             "":{
//                "AOT_RETRIEVAL_ACCURACY":"0.0",
//                "BARE_SOILS_PERCENTAGE":"18.798756",
//                "CLOUD_COVERAGE_ASSESSMENT":"0.2673",
//                "CLOUD_COVERAGE_PERCENTAGE":"2.834892",
//                "CLOUD_SHADOW_PERCENTAGE":"0.960429",
//                "DARK_FEATURES_PERCENTAGE":"6.142580",
//                "DATATAKE_1_DATATAKE_SENSING_START":"2017-08-25T10:20:21.026Z",
//                "DATATAKE_1_DATATAKE_TYPE":"INS-NOBS",
//                "DATATAKE_1_ID":"GS2A_20170825T102021_011359_N02.05",
//                "DATATAKE_1_SENSING_ORBIT_DIRECTION":"DESCENDING",
//                "DATATAKE_1_SENSING_ORBIT_NUMBER":"65",
//                "DATATAKE_1_SPACECRAFT_NAME":"Sentinel-2A",
//                "DEGRADED_ANC_DATA_PERCENTAGE":"0",
//                "DEGRADED_MSI_DATA_PERCENTAGE":"0",
//                "FOOTPRINT":"POLYGON((7.428721662869659 45.95294906157136, 7.468260721947195 46.07045453324583, 7.516386073210944 46.213490853317474, 7.517758158864944 46.21754158588799, 7.521569290186732 46.22807986962516, 7.57075666489608 46.363780659561655, 7.621397098483933 46.510761605158926, 7.670477784533144 46.65814962639098, 7.723134018788286 46.804566396003615, 7.77358747930861 46.9468887304708, 7.814710439787223 46.947573655919015, 7.835955516975941 45.95962253249568, 7.428721662869659 45.95294906157136))",
//                "FORMAT_CORRECTNESS_FLAG":"PASSED",
//                "GENERAL_QUALITY_FLAG":"PASSED",
//                "GENERATION_TIME":"2017-08-27T06:04:30Z",
//                "GEOMETRIC_QUALITY_FLAG":"PASSED",
//                "HIGH_PROBA_CLOUDS_PERCENTAGE":"0.867042",
//                "L1C_TOA_QUANTIFICATION_VALUE":"10000",
//                "L1C_TOA_QUANTIFICATION_VALUE_UNIT":"none",
//                "L2A_AOT_QUANTIFICATION_VALUE":"1000.0",
//                "L2A_AOT_QUANTIFICATION_VALUE_UNIT":"none",
//                "L2A_BOA_QUANTIFICATION_VALUE":"10000",
//                "L2A_BOA_QUANTIFICATION_VALUE_UNIT":"none",
//                "L2A_WVP_QUANTIFICATION_VALUE":"1000.0",
//                "L2A_WVP_QUANTIFICATION_VALUE_UNIT":"cm",
//                "LOW_PROBA_CLOUDS_PERCENTAGE":"7.255157",
//                "MEDIUM_PROBA_CLOUDS_PERCENTAGE":"1.967849",
//                "NODATA_PIXEL_PERCENTAGE":"83.873871",
//                "PREVIEW_GEO_INFO":"Not applicable",
//                "PREVIEW_IMAGE_URL":"Not applicable",
//                "PROCESSING_BASELINE":"02.05",
//                "PROCESSING_LEVEL":"Level-2Ap",
//                "PRODUCT_START_TIME":"2017-08-25T10:20:21.026Z",
//                "PRODUCT_STOP_TIME":"2017-08-25T10:20:21.026Z",
//                "PRODUCT_TYPE":"S2MSI2Ap",
//                "PRODUCT_URI_1C":"S2A_MSIL1C_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE",
//                "PRODUCT_URI_2A":"S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE",
//                "RADIATIVE_TRANSFER_ACCURAY":"0.0",
//                "RADIOMETRIC_QUALITY_FLAG":"PASSED",
//                "REFERENCE_BAND":"B1",
//                "REFLECTANCE_CONVERSION_U":"0.97772393572511",
//                "SATURATED_DEFECTIVE_PIXEL_PERCENTAGE":"0.000700",
//                "SENSOR_QUALITY_FLAG":"PASSED",
//                "SNOW_ICE_PERCENTAGE":"5.943215",
//                "SPECIAL_VALUE_NODATA":"0",
//                "SPECIAL_VALUE_SATURATED":"65535",
//                "THIN_CIRRUS_PERCENTAGE":"0.000000",
//                "VEGETATION_PERCENTAGE":"55.021519",
//                "WATER_PERCENTAGE":"3.042754",
//                "WATER_VAPOUR_RETRIEVAL_ACCURACY":"0.0"
//             }
//          },
//          "cornerCoordinates":{
//             "upperLeft":[
//                0,
//                0
//             ],
//             "lowerLeft":[
//                0,
//                512
//             ],
//             "lowerRight":[
//                512,
//                512
//             ],
//             "upperRight":[
//                512,
//                0
//             ],
//             "center":[
//                256,
//                256
//             ]
//          },
//          "wgs84Extent":{
//             "type":"Polygon",
//             "coordinates":[
//                [
//
//                ]
//             ]
//          },
//          "bands":[
//
//          ]
//       },
//       "availableResolutionsWithBands":{
//          "R10m":{
//             "bands":[
//                "AOT",
//                "B02",
//                "B03",
//                "B04",
//                "B08",
//                "TCI",
//                "WVP"
//             ]
//          },
//          "R20m":{
//             "bands":[
//                "AOT",
//                "B02",
//                "B03",
//                "B04",
//                "B05",
//                "B06",
//                "B07",
//                "B11",
//                "B12",
//                "B8A",
//                "SCL",
//                "TCI",
//                "VIS",
//                "WVP"
//             ]
//          },
//          "R60m":{
//             "bands":[
//                "AOT",
//                "B01",
//                "B02",
//                "B03",
//                "B04",
//                "B05",
//                "B06",
//                "B07",
//                "B09",
//                "B11",
//                "B12",
//                "B8A",
//                "SCL",
//                "TCI",
//                "WVP"
//             ]
//          }
//       },
//       "tmsUrls":{
//          "R10m":{
//             "AOT":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R10m/AOT",
//             "B02":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R10m/B02",
//             "B03":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R10m/B03",
//             "B04":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R10m/B04",
//             "B08":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R10m/B08",
//             "TCI":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R10m/TCI",
//             "WVP":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R10m/WVP"
//          },
//          "R20m":{
//             "AOT":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/AOT",
//             "B02":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B02",
//             "B03":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B03",
//             "B04":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B04",
//             "B05":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B05",
//             "B06":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B06",
//             "B07":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B07",
//             "B11":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B11",
//             "B12":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B12",
//             "B8A":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/B8A",
//             "SCL":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/SCL",
//             "TCI":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/TCI",
//             "VIS":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/VIS",
//             "WVP":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R20m/WVP"
//          },
//          "R60m":{
//             "AOT":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/AOT",
//             "B01":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B01",
//             "B02":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B02",
//             "B03":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B03",
//             "B04":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B04",
//             "B05":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B05",
//             "B06":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B06",
//             "B07":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B07",
//             "B09":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B09",
//             "B11":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B11",
//             "B12":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B12",
//             "B8A":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/B8A",
//             "SCL":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/SCL",
//             "TCI":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/TCI",
//             "WVP":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TLS_20170825T102114.SAFE/IMG_DATA/R60m/WVP"
//          }
//       }
//    },
//    {
//       "sceneName":"S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE",
//       "currentFilePath":"../sentinel2/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE",
//       "MTD":{
//          "description":"MTD_MSIL2A.xml",
//          "driverShortName":"SENTINEL2",
//          "driverLongName":"Sentinel 2",
//          "files":[
//             "MTD_MSIL2A.xml"
//          ],
//          "size":[
//             512,
//             512
//          ],
//          "coordinateSystem":{
//             "wkt":""
//          },
//          "metadata":{
//             "":{
//                "AOT_RETRIEVAL_ACCURACY":"0.0",
//                "BARE_SOILS_PERCENTAGE":"10.997164",
//                "CLOUD_COVERAGE_ASSESSMENT":"6.141",
//                "CLOUD_COVERAGE_PERCENTAGE":"7.872797",
//                "CLOUD_SHADOW_PERCENTAGE":"3.503932",
//                "DARK_FEATURES_PERCENTAGE":"4.572249",
//                "DATATAKE_1_DATATAKE_SENSING_START":"2017-08-25T10:20:21.026Z",
//                "DATATAKE_1_DATATAKE_TYPE":"INS-NOBS",
//                "DATATAKE_1_ID":"GS2A_20170825T102021_011359_N02.05",
//                "DATATAKE_1_SENSING_ORBIT_DIRECTION":"DESCENDING",
//                "DATATAKE_1_SENSING_ORBIT_NUMBER":"65",
//                "DATATAKE_1_SPACECRAFT_NAME":"Sentinel-2A",
//                "DEGRADED_ANC_DATA_PERCENTAGE":"0",
//                "DEGRADED_MSI_DATA_PERCENTAGE":"0",
//                "FOOTPRINT":"POLYGON((7.69095044306825 46.71507622910944, 7.723134018788286 46.804566396003615, 7.773491650249043 46.94661840975689, 9.128266945124432 46.95363733424615, 9.125967263075736 45.96548172662488, 7.708999870250291 45.958258688896564, 7.69095044306825 46.71507622910944))",
//                "FORMAT_CORRECTNESS_FLAG":"PASSED",
//                "GENERAL_QUALITY_FLAG":"PASSED",
//                "GENERATION_TIME":"2017-08-27T09:02:00Z",
//                "GEOMETRIC_QUALITY_FLAG":"PASSED",
//                "HIGH_PROBA_CLOUDS_PERCENTAGE":"5.484431",
//                "L1C_TOA_QUANTIFICATION_VALUE":"10000",
//                "L1C_TOA_QUANTIFICATION_VALUE_UNIT":"none",
//                "L2A_AOT_QUANTIFICATION_VALUE":"1000.0",
//                "L2A_AOT_QUANTIFICATION_VALUE_UNIT":"none",
//                "L2A_BOA_QUANTIFICATION_VALUE":"10000",
//                "L2A_BOA_QUANTIFICATION_VALUE_UNIT":"none",
//                "L2A_WVP_QUANTIFICATION_VALUE":"1000.0",
//                "L2A_WVP_QUANTIFICATION_VALUE_UNIT":"cm",
//                "LOW_PROBA_CLOUDS_PERCENTAGE":"5.932196",
//                "MEDIUM_PROBA_CLOUDS_PERCENTAGE":"2.370320",
//                "NODATA_PIXEL_PERCENTAGE":"0.642894",
//                "PREVIEW_GEO_INFO":"Not applicable",
//                "PREVIEW_IMAGE_URL":"Not applicable",
//                "PROCESSING_BASELINE":"02.05",
//                "PROCESSING_LEVEL":"Level-2Ap",
//                "PRODUCT_START_TIME":"2017-08-25T10:20:21.026Z",
//                "PRODUCT_STOP_TIME":"2017-08-25T10:20:21.026Z",
//                "PRODUCT_TYPE":"S2MSI2Ap",
//                "PRODUCT_URI_1C":"S2A_MSIL1C_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE",
//                "PRODUCT_URI_2A":"S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE",
//                "RADIATIVE_TRANSFER_ACCURAY":"0.0",
//                "RADIOMETRIC_QUALITY_FLAG":"PASSED",
//                "REFERENCE_BAND":"B1",
//                "REFLECTANCE_CONVERSION_U":"0.97772393572511",
//                "SATURATED_DEFECTIVE_PIXEL_PERCENTAGE":"0.000047",
//                "SENSOR_QUALITY_FLAG":"PASSED",
//                "SNOW_ICE_PERCENTAGE":"3.421965",
//                "SPECIAL_VALUE_NODATA":"0",
//                "SPECIAL_VALUE_SATURATED":"65535",
//                "THIN_CIRRUS_PERCENTAGE":"0.018046",
//                "VEGETATION_PERCENTAGE":"61.630463",
//                "WATER_PERCENTAGE":"2.069182",
//                "WATER_VAPOUR_RETRIEVAL_ACCURACY":"0.0"
//             }
//          },
//          "cornerCoordinates":{
//             "upperLeft":[
//                0,
//                0
//             ],
//             "lowerLeft":[
//                0,
//                512
//             ],
//             "lowerRight":[
//                512,
//                512
//             ],
//             "upperRight":[
//                512,
//                0
//             ],
//             "center":[
//                256,
//                256
//             ]
//          },
//          "wgs84Extent":{
//             "type":"Polygon",
//             "coordinates":[
//                [
//
//                ]
//             ]
//          },
//          "bands":[
//
//          ]
//       },
//       "availableResolutionsWithBands":{
//          "R10m":{
//             "bands":[
//                "AOT",
//                "B02",
//                "B03",
//                "B04",
//                "B08",
//                "TCI",
//                "WVP"
//             ]
//          },
//          "R20m":{
//             "bands":[
//                "AOT",
//                "B02",
//                "B03",
//                "B04",
//                "B05",
//                "B06",
//                "B07",
//                "B11",
//                "B12",
//                "B8A",
//                "SCL",
//                "TCI",
//                "VIS",
//                "WVP"
//             ]
//          },
//          "R60m":{
//             "bands":[
//                "AOT",
//                "B01",
//                "B02",
//                "B03",
//                "B04",
//                "B05",
//                "B06",
//                "B07",
//                "B09",
//                "B11",
//                "B12",
//                "B8A",
//                "SCL",
//                "TCI",
//                "WVP"
//             ]
//          }
//       },
//       "tmsUrls":{
//          "R10m":{
//             "AOT":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R10m/AOT",
//             "B02":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R10m/B02",
//             "B03":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R10m/B03",
//             "B04":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R10m/B04",
//             "B08":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R10m/B08",
//             "TCI":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R10m/TCI",
//             "WVP":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R10m/WVP"
//          },
//          "R20m":{
//             "AOT":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/AOT",
//             "B02":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B02",
//             "B03":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B03",
//             "B04":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B04",
//             "B05":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B05",
//             "B06":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B06",
//             "B07":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B07",
//             "B11":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B11",
//             "B12":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B12",
//             "B8A":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/B8A",
//             "SCL":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/SCL",
//             "TCI":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/TCI",
//             "VIS":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/VIS",
//             "WVP":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R20m/WVP"
//          },
//          "R60m":{
//             "AOT":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/AOT",
//             "B01":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B01",
//             "B02":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B02",
//             "B03":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B03",
//             "B04":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B04",
//             "B05":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B05",
//             "B06":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B06",
//             "B07":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B07",
//             "B09":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B09",
//             "B11":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B11",
//             "B12":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B12",
//             "B8A":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/B8A",
//             "SCL":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/SCL",
//             "TCI":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/TCI",
//             "WVP":"http://gis-bigdata:11016/img/S2A_MSIL2A_20170825T102021_N0205_R065_T32TMS_20170825T102114.SAFE/IMG_DATA/R60m/WVP"
//          }
//       }
//    },
//    {
//       "sceneName":"S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE",
//       "currentFilePath":"../sentinel2/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE",
//       "MTD":{
//          "description":"MTD_MSIL1C.xml",
//          "driverShortName":"SENTINEL2",
//          "driverLongName":"Sentinel 2",
//          "files":[
//             "MTD_MSIL1C.xml"
//          ],
//          "size":[
//             512,
//             512
//          ],
//          "coordinateSystem":{
//             "wkt":""
//          },
//          "metadata":{
//             "":{
//                "CLOUD_COVERAGE_ASSESSMENT":"4.9547",
//                "DATATAKE_1_DATATAKE_SENSING_START":"2017-10-09T08:38:29.027Z",
//                "DATATAKE_1_DATATAKE_TYPE":"INS-NOBS",
//                "DATATAKE_1_ID":"GS2B_20171009T083829_003093_N02.05",
//                "DATATAKE_1_SENSING_ORBIT_DIRECTION":"DESCENDING",
//                "DATATAKE_1_SENSING_ORBIT_NUMBER":"64",
//                "DATATAKE_1_SPACECRAFT_NAME":"Sentinel-2B",
//                "DEGRADED_ANC_DATA_PERCENTAGE":"0",
//                "DEGRADED_MSI_DATA_PERCENTAGE":"0",
//                "FOOTPRINT":"POLYGON((16.921050243240472 -20.788945135565847, 17.97503544087241 -20.773909033307064, 17.995029639506605 -21.764638706882494, 16.93397464729607 -21.780461682364, 16.921050243240472 -20.788945135565847))",
//                "FORMAT_CORRECTNESS_FLAG":"PASSED",
//                "GENERAL_QUALITY_FLAG":"PASSED",
//                "GENERATION_TIME":"2017-10-09T08:54:33.000000Z",
//                "GEOMETRIC_QUALITY_FLAG":"PASSED",
//                "PREVIEW_GEO_INFO":"Not applicable",
//                "PREVIEW_IMAGE_URL":"Not applicable",
//                "PROCESSING_BASELINE":"02.05",
//                "PROCESSING_LEVEL":"Level-1C",
//                "PRODUCT_START_TIME":"2017-10-09T08:38:29.027Z",
//                "PRODUCT_STOP_TIME":"2017-10-09T08:38:29.027Z",
//                "PRODUCT_TYPE":"S2MSI1C",
//                "PRODUCT_URI":"S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE",
//                "QUANTIFICATION_VALUE":"10000",
//                "RADIOMETRIC_QUALITY_FLAG":"PASSED",
//                "REFERENCE_BAND":"B1",
//                "REFLECTANCE_CONVERSION_U":"1.0009705232045",
//                "SENSOR_QUALITY_FLAG":"PASSED",
//                "SPECIAL_VALUE_NODATA":"0",
//                "SPECIAL_VALUE_SATURATED":"65535"
//             },
//             "SUBDATASETS":{
//                "SUBDATASET_1_NAME":"SENTINEL2_L1C:MTD_MSIL1C.xml:10m:EPSG_32733",
//                "SUBDATASET_1_DESC":"Bands B2, B3, B4, B8 with 10m resolution, UTM 33S",
//                "SUBDATASET_2_NAME":"SENTINEL2_L1C:MTD_MSIL1C.xml:20m:EPSG_32733",
//                "SUBDATASET_2_DESC":"Bands B5, B6, B7, B8A, B11, B12 with 20m resolution, UTM 33S",
//                "SUBDATASET_3_NAME":"SENTINEL2_L1C:MTD_MSIL1C.xml:60m:EPSG_32733",
//                "SUBDATASET_3_DESC":"Bands B1, B9, B10 with 60m resolution, UTM 33S",
//                "SUBDATASET_4_NAME":"SENTINEL2_L1C:MTD_MSIL1C.xml:TCI:EPSG_32733",
//                "SUBDATASET_4_DESC":"True color image, UTM 33S"
//             }
//          },
//          "cornerCoordinates":{
//             "upperLeft":[
//                0,
//                0
//             ],
//             "lowerLeft":[
//                0,
//                512
//             ],
//             "lowerRight":[
//                512,
//                512
//             ],
//             "upperRight":[
//                512,
//                0
//             ],
//             "center":[
//                256,
//                256
//             ]
//          },
//          "wgs84Extent":{
//             "type":"Polygon",
//             "coordinates":[
//                [
//
//                ]
//             ]
//          },
//          "bands":[
//
//          ]
//       },
//       "availableBands":[
//          "B01",
//          "B02",
//          "B03",
//          "B04",
//          "B05",
//          "B06",
//          "B07",
//          "B08",
//          "B09",
//          "B10",
//          "B11",
//          "B12",
//          "B8A",
//          "TCI"
//       ],
//       "tmsUrls":{
//          "B01":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B01",
//          "B02":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B02",
//          "B03":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B03",
//          "B04":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B04",
//          "B05":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B05",
//          "B06":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B06",
//          "B07":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B07",
//          "B08":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B08",
//          "B09":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B09",
//          "B10":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B10",
//          "B11":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B11",
//          "B12":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B12",
//          "B8A":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/B8A",
//          "TCI":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171009T083829_N0205_R064_T33KYS_20171009T085433.SAFE/IMG_DATA/TCI"
//       }
//    },
//    {
//       "sceneName":"S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE",
//       "currentFilePath":"../sentinel2/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE",
//       "MTD":{
//          "description":"MTD_MSIL1C.xml",
//          "driverShortName":"SENTINEL2",
//          "driverLongName":"Sentinel 2",
//          "files":[
//             "MTD_MSIL1C.xml"
//          ],
//          "size":[
//             512,
//             512
//          ],
//          "coordinateSystem":{
//             "wkt":""
//          },
//          "metadata":{
//             "":{
//                "CLOUD_COVERAGE_ASSESSMENT":"4.9575",
//                "DATATAKE_1_DATATAKE_SENSING_START":"2017-10-10T16:33:09.027Z",
//                "DATATAKE_1_DATATAKE_TYPE":"INS-NOBS",
//                "DATATAKE_1_ID":"GS2B_20171010T163309_003112_N02.05",
//                "DATATAKE_1_SENSING_ORBIT_DIRECTION":"DESCENDING",
//                "DATATAKE_1_SENSING_ORBIT_NUMBER":"83",
//                "DATATAKE_1_SPACECRAFT_NAME":"Sentinel-2B",
//                "DEGRADED_ANC_DATA_PERCENTAGE":"0",
//                "DEGRADED_MSI_DATA_PERCENTAGE":"0",
//                "FOOTPRINT":"POLYGON((-91.04181910203256 23.498246176850945, -89.9675241650983 23.481034384212897, -89.98957580531028 22.49054569679087, -91.0560740062828 22.506951929579667, -91.04181910203256 23.498246176850945))",
//                "FORMAT_CORRECTNESS_FLAG":"PASSED",
//                "GENERAL_QUALITY_FLAG":"PASSED",
//                "GENERATION_TIME":"2017-10-10T16:40:25.000000Z",
//                "GEOMETRIC_QUALITY_FLAG":"PASSED",
//                "PREVIEW_GEO_INFO":"Not applicable",
//                "PREVIEW_IMAGE_URL":"Not applicable",
//                "PROCESSING_BASELINE":"02.05",
//                "PROCESSING_LEVEL":"Level-1C",
//                "PRODUCT_START_TIME":"2017-10-10T16:33:09.027Z",
//                "PRODUCT_STOP_TIME":"2017-10-10T16:33:09.027Z",
//                "PRODUCT_TYPE":"S2MSI1C",
//                "PRODUCT_URI":"S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE",
//                "QUANTIFICATION_VALUE":"10000",
//                "RADIOMETRIC_QUALITY_FLAG":"PASSED",
//                "REFERENCE_BAND":"B1",
//                "REFLECTANCE_CONVERSION_U":"1.00173665207297",
//                "SENSOR_QUALITY_FLAG":"PASSED",
//                "SPECIAL_VALUE_NODATA":"0",
//                "SPECIAL_VALUE_SATURATED":"65535"
//             },
//             "SUBDATASETS":{
//                "SUBDATASET_1_NAME":"SENTINEL2_L1C:MTD_MSIL1C.xml:10m:EPSG_32615",
//                "SUBDATASET_1_DESC":"Bands B2, B3, B4, B8 with 10m resolution, UTM 15N",
//                "SUBDATASET_2_NAME":"SENTINEL2_L1C:MTD_MSIL1C.xml:20m:EPSG_32615",
//                "SUBDATASET_2_DESC":"Bands B5, B6, B7, B8A, B11, B12 with 20m resolution, UTM 15N",
//                "SUBDATASET_3_NAME":"SENTINEL2_L1C:MTD_MSIL1C.xml:60m:EPSG_32615",
//                "SUBDATASET_3_DESC":"Bands B1, B9, B10 with 60m resolution, UTM 15N",
//                "SUBDATASET_4_NAME":"SENTINEL2_L1C:MTD_MSIL1C.xml:TCI:EPSG_32615",
//                "SUBDATASET_4_DESC":"True color image, UTM 15N"
//             }
//          },
//          "cornerCoordinates":{
//             "upperLeft":[
//                0,
//                0
//             ],
//             "lowerLeft":[
//                0,
//                512
//             ],
//             "lowerRight":[
//                512,
//                512
//             ],
//             "upperRight":[
//                512,
//                0
//             ],
//             "center":[
//                256,
//                256
//             ]
//          },
//          "wgs84Extent":{
//             "type":"Polygon",
//             "coordinates":[
//                [
//
//                ]
//             ]
//          },
//          "bands":[
//
//          ]
//       },
//       "availableBands":[
//          "B01",
//          "B02",
//          "B03",
//          "B04",
//          "B05",
//          "B06",
//          "B07",
//          "B08",
//          "B09",
//          "B10",
//          "B11",
//          "B12",
//          "B8A",
//          "TCI"
//       ],
//       "tmsUrls":{
//          "B01":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B01",
//          "B02":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B02",
//          "B03":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B03",
//          "B04":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B04",
//          "B05":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B05",
//          "B06":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B06",
//          "B07":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B07",
//          "B08":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B08",
//          "B09":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B09",
//          "B10":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B10",
//          "B11":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B11",
//          "B12":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B12",
//          "B8A":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/B8A",
//          "TCI":"http://gis-bigdata:11016/img/S2B_MSIL1C_20171010T163309_N0205_R083_T15QYF_20171010T164025.SAFE/IMG_DATA/TCI"
//       }
//    }
// ]
