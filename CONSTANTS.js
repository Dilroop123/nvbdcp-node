/**
 * Created by harsh on 16/7/16.
 */

exports.DHIS_URL_BASE = "http://ntdindia.org/lf";

exports.sendSMSURL = "http://api.textlocal.in/send";

exports.TEXTLOCAL_USERNAME = "harsh.atal@gmail.com";
exports.TEXTLOCAL_HASH = "Harsh";
exports.TEXTLOCAL_SENDER = "TXTLCL";




exports.USER_NOT_FOUND = "User Not Found";
exports.username = "admin";
exports.password = "district";
exports.auth = "Basic " + new Buffer(exports.username + ":" + exports.password).toString("base64");

exports.INVALID_FORMAT = "INVALID_FORMAT";
exports.INVALID_PHONE = "INVALID_PHONE";
exports.PERFECT_MESSAGE = "PERFECT_MESSAGE";


exports.PROGRAM_PHONE_NOT_FOUND = "ivNRN35EMWW";
exports.PROGRAM_INVALID_FORMAT = "rdGO9pcR6va";
exports.EVENT_DE_TIMESTAMP = "Uf4qpY5RAAl";
exports.EVENT_DE_MESSAGE = "S5kYviYPt6t";
exports.EVENT_DE_MESSAGE_ID = "NeVR3qMksxK";
exports.EVENT_DE_PHONE = "EnCZWrS6PP3";
exports.EVENT_DE_IS_FORMAT_VALID = "LtJaSGAvngC";
exports.ORGUNIT_ROOT_UID = "WBFNadSm5EQ";



exports.DE_Drug_Administered = "Xyv3GnPTtZI"
exports.DE_MessageID = "MtIn87iDOh3";
exports.DE_Message = "bfkx6RMLAzI";


exports.COC_PreSac_TwoToFive_M = "UtQUjXcW3dB";
exports.COC_Sac_FiveToForteen_M = "Ci5K5kLYVws";
exports.COC_Adults_SixteenPlus_M = "hHuC7esid2N";

exports.COC_PreSac_TwoToFive_F = "c9Ks9MYOiI2";
exports.COC_Sac_FiveToForteen_F = "PIfCZNpJ3g0";
exports.COC_Adults_SixteenPlus_F = "kI9cXwlPBmP";

exports.DE_SideEffect = "BQMbKHGGXbV";
exports.COC_DEFAULT = "HllvX50cXC0";

exports.field1 = {de: exports.DE_Drug_Administered, coc: exports.COC_PreSac_TwoToFive_M}
exports.field2 = {de: exports.DE_Drug_Administered, coc: exports.COC_Sac_FiveToForteen_M}
exports.field3 = {de: exports.DE_Drug_Administered, coc: exports.COC_Adults_SixteenPlus_M}

exports.field4 = {de: exports.DE_Drug_Administered, coc: exports.COC_PreSac_TwoToFive_F}
exports.field5 = {de: exports.DE_Drug_Administered, coc: exports.COC_Sac_FiveToForteen_F}
exports.field6 = {de: exports.DE_Drug_Administered, coc: exports.COC_Adults_SixteenPlus_F}

exports.field7 = {de: exports.DE_SideEffect, coc: exports.COC_DEFAULT}

exports.field8 = {de: exports.DE_MessageID, coc: exports.COC_DEFAULT}
exports.field9 = {de: exports.DE_Message, coc: exports.COC_DEFAULT}




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


exports.languageMap.hindi[exports.INVALID_FORMAT] = "अवैध प्रारूप। सही प्रारूप 30.40.20 30.50.60 10";
exports.languageMap.hindi[exports.INVALID_PHONE] = "आपका नंबर पंजीकृत नहीं है। ब्लॉक अधिकारी से संपर्क करें।";
exports.languageMap.hindi[exports.PERFECT_MESSAGE] = "धन्यवाद! आप ने भेजा";
exports.languageMap.hindi["male"] = "Male";
exports.languageMap.hindi["female"] = "Female";
exports.languageMap.hindi["sideEffect"] = "SE";