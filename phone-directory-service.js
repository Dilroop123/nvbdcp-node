/**
 * Created by harsh on 23/8/16.
 */


exports.phoneDirectoryService = function(log){

    var db = require("./wiki_mobile_directory.json");
    var utility = require("./utility-functions");
    var CONSTANTS = require("./CONSTANTS");

    var dbMap = utility.prepareIdToObjectMap(db.data,"prefix");
    var referenceMap = utility.prepareIdToObjectMap(db.reference,"state");

    log.info("[PHONE_DIRECTORY]"+db.data.length + ","+db.reference.length);

    this.getStateByPhone = function (logID,phone){
        try{
            var prefix = phone.substr(2,4);
            if (dbMap[prefix]){
                if (dbMap[prefix].state != 0 ){
                    log.info(logID+"[PHONE_DIRECTORY][State Found+]"+dbMap[prefix].state + ","+referenceMap[dbMap[prefix].state].ou);
                    return referenceMap[dbMap[prefix].state].ou;
                }
            }
        }catch(e){
            log.error(logID+e)
        }

        log.info(logID+"[PHONE_DIRECTORY][State Found-]");
        return CONSTANTS.ORGUNIT_INVALID_PHONE_PARENT_UID;
    }
}
