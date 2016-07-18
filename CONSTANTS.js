/**
 * Created by harsh on 16/7/16.
 */


 exports.DHIS_URL_BASE = "http://localhost:8080/dhis";

 exports.sendSMSURL = "http://180.151.233.59:8000/send?";

 exports.USER_NOT_FOUND = "User Not Found";
 exports.username = "admin";
 exports.password = "district";
 exports.auth = "Basic " + new Buffer(exports.username + ":" + exports.password).toString("base64");

 exports.INVALID_FORMAT = "INVALID_FORMAT";
 exports.INVALID_PHONE = "INVALID_PHONE";

 exports.DE_Drug_Administered = "Tb1ghTossEY";

 exports.COC_PreSac_TwoToFour_M = "mjawpWOwuwe";
 exports.COC_Sac_FiveToFifteen_M = "HVv1j9toqK3";
 exports.COC_Adults_FifteenPlus_M = "uJSABYiu0kO";

 exports.COC_PreSac_TwoToFour_F = "XPTCPEKf9ou";
 exports.COC_Sac_FiveToFifteen_F = "ofZzY3qlkZd";
 exports.COC_Adults_FifteenPlus_F = "vrpw537qg8F";

 exports.DE_SideEffect = "EGd3y9uIM8P";
 exports.COC_DEFAULT = "HllvX50cXC0"

 exports.field1 = {de: exports.DE_Drug_Administered, coc: exports.COC_PreSac_TwoToFour_M}
 exports.field2 = {de: exports.DE_Drug_Administered, coc: exports.COC_Sac_FiveToFifteen_M}
 exports.field3 = {de: exports.DE_Drug_Administered, coc: exports.COC_Adults_FifteenPlus_M}

 exports.field4 = {de: exports.DE_Drug_Administered, coc: exports.COC_PreSac_TwoToFour_F}
 exports.field5 = {de: exports.DE_Drug_Administered, coc: exports.COC_Sac_FiveToFifteen_F}
 exports.field6 = {de: exports.DE_Drug_Administered, coc: exports.COC_Adults_FifteenPlus_F}

 exports.field7 = {de: exports.DE_SideEffect, coc: exports.COC_DEFAULT}
