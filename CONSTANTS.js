/**
 * Created by harsh on 16/7/16.
 */

 exports.DHIS_URL_BASE = "http://127.0.0.1:8080/dhis23";

 exports.sendSMSURL = "http://localhost:8001/sendSMS?";

 exports.USER_NOT_FOUND = "User Not Found";
 exports.username = "admin";
 exports.password = "district";
 exports.auth = "Basic " + new Buffer(exports.username + ":" + exports.password).toString("base64");

 exports.INVALID_FORMAT = "INVALID_FORMAT";
 exports.INVALID_PHONE = "INVALID_PHONE";
 exports.PERFECT_MESSAGE = "PERFECT_MESSAGE";


exports.PROGRAM_PHONE_NOT_FOUND = "nhuGvx4BrYW";
exports.PROGRAM_INVALID_FORMAT = "wtCnhB0Hwwf";
exports.EVENT_DE_TIMESTAMP = "IduKf7VQhsw";
exports.EVENT_DE_MESSAGE = "JsMkULAV88V";
exports.EVENT_DE_MESSAGE_ID = "Jft8sfZbdCi";
exports.EVENT_DE_PHONE = "JTSiyE9NiNj";
exports.EVENT_DE_IS_FORMAT_VALID = "uVSwrDcq7Cp";
exports.ORGUNIT_ROOT_UID = "IFOBH4e3JuN";





 exports.DE_Drug_Administered = "Tb1ghTossEY";

 exports.COC_PreSac_TwoToFour_M = "mjawpWOwuwe";
 exports.COC_Sac_FiveToFifteen_M = "HVv1j9toqK3";
 exports.COC_Adults_FifteenPlus_M = "uJSABYiu0kO";

 exports.COC_PreSac_TwoToFour_F = "XPTCPEKf9ou";
 exports.COC_Sac_FiveToFifteen_F = "ofZzY3qlkZd";
 exports.COC_Adults_FifteenPlus_F = "vrpw537qg8F";

 exports.DE_SideEffect = "EGd3y9uIM8P";
 exports.COC_DEFAULT = "HllvX50cXC0";

 exports.field1 = {de: exports.DE_Drug_Administered, coc: exports.COC_PreSac_TwoToFour_M}
 exports.field2 = {de: exports.DE_Drug_Administered, coc: exports.COC_Sac_FiveToFifteen_M}
 exports.field3 = {de: exports.DE_Drug_Administered, coc: exports.COC_Adults_FifteenPlus_M}

 exports.field4 = {de: exports.DE_Drug_Administered, coc: exports.COC_PreSac_TwoToFour_F}
 exports.field5 = {de: exports.DE_Drug_Administered, coc: exports.COC_Sac_FiveToFifteen_F}
 exports.field6 = {de: exports.DE_Drug_Administered, coc: exports.COC_Adults_FifteenPlus_F}

 exports.field7 = {de: exports.DE_SideEffect, coc: exports.COC_DEFAULT}


exports.languageMap = {
 english : {},
 hindi  :  {}
}

exports.languageMap.english[exports.INVALID_FORMAT] = "Invalid format. Correct format example: 30.40.20 30.50.60 10";
exports.languageMap.english[exports.INVALID_PHONE] = "Your number is not registered. Please contact concerned authority.";
exports.languageMap.english[exports.PERFECT_MESSAGE] = "Thank you! You sent";
exports.languageMap.english["male"] = "Male";
exports.languageMap.english["female"] = "Female";
exports.languageMap.english["sideEffect"] = "SE";






