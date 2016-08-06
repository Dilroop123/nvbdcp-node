/**
 * Created by harsh on 16/7/16.
 */

exports.DHIS_URL_BASE = "http://ntdindia.org/lf";

exports.sendSMSURL = "http://api.textlocal.in/send";
exports.unicodeLookUpURL = "http://ntdindia.org/examples/servlets/servlet/HelloWorldExample?";

exports.TEXTLOCAL_USERNAME = "harsh.atal@gmail.com";
exports.TEXTLOCAL_HASH = "Harsh";
exports.TEXTLOCAL_SENDER = "TXTLCL";




exports.USER_NOT_FOUND = "User Not Found";
exports.username = "admin";
exports.password = "district";
exports.auth = "Basic " + new Buffer(exports.username + ":" + exports.password).toString("base64");

exports.META_ATTRIBUTE_OU_LANGUAGE = "ffIs5OKSvHG";
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
 English : {},
 //Hindi  :  {},
 Gujarati : {}
}

exports.languageMap.English[exports.INVALID_FORMAT] = "Invalid format. Correct format example: 30.40.20 30.50.60 10";
exports.languageMap.English[exports.INVALID_PHONE] = "Your number is not registered. Please contact concerned authority.";
exports.languageMap.English[exports.PERFECT_MESSAGE] = "Thank you! You sent";
exports.languageMap.English["male"] = "Male";
exports.languageMap.English["female"] = "Female";
exports.languageMap.English["sideEffect"] = "SE";

//
//exports.languageMap.Hindi[exports.INVALID_FORMAT] = "@U09050935094809270020092A094D0930093E09300942092A096400200938093909400020092A094D0930093E09300942092A002000330030002E00340030002E00320030002000330030002E00350030002E00360030002000310030";
//exports.languageMap.Hindi[exports.PERFECT_MESSAGE] = "@U09270928094D092F0935093E0926002100200906092A0020092809470020092D0947091C093E";
//exports.languageMap.Hindi["male"] = "Male";
//exports.languageMap.Hindi["female"] = "Female";
//exports.languageMap.Hindi["sideEffect"] = "SE";


//exports.languageMap.Gujarati[exports.INVALID_FORMAT] = "@U0A850AAE0ABE0AA80ACD0AAF00200AAC0A820AA70ABE0AB00AA3002E00200AAF0ACB0A970ACD0AAF00200AAC0A820AA70ABE0AB00AA30AAE0ABE0A82002000330030002E00340030002E00320030002000330030002E00350030002E00360030002000310030";
//exports.languageMap.Gujarati[exports.PERFECT_MESSAGE] = "@U0A860AAD0ABE0AB0002100200AA40AAE0AC7";
//exports.languageMap.Gujarati["male"] = "0aaa0ac10ab00ac10ab7";//"પુરુષ";
//exports.languageMap.Gujarati["female"] = "U0AB80ACD0AA40ACD0AB00AC0";
//exports.languageMap.Gujarati["sideEffect"] = "U0AB80ABE0A870AA100200A870AAB0AC70A950ACD0A9F0ACD0AB8"//"સાઇડ ઇફેક્ટ્સ";
//exports.languageMap.Gujarati["sent"] = "U0AAE0ACB0A950AB20AB50ABE0AAE0ABE0A82"//"મોકલવામાં";


exports.languageMap.Gujarati[exports.INVALID_FORMAT] = "@U0A850AAE0ABE0AA80ACD0AAF00200AAC0A820AA70ABE0AB00AA3002E00200AAF0ACB0A970ACD0AAF00200AAC0A820AA70ABE0AB00AA30AAE0ABE0A82002000330030002E00340030002E00320030002000330030002E00350030002E00360030002000310030";
exports.languageMap.Gujarati[exports.PERFECT_MESSAGE] = "આભાર! તમે";
exports.languageMap.Gujarati["male"] = "પુરુષ";//"પુરુષ";
exports.languageMap.Gujarati["female"] = "સ્ત્રી";
exports.languageMap.Gujarati["sideEffect"] = "સાઇડ ઇફેક્ટ્સ"//"સાઇડ ઇફેક્ટ્સ";
exports.languageMap.Gujarati["sent"] = "મોકલવામાં"//"મોકલવામાં";
