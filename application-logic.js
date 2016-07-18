/**
 * Created by harsh on 16/7/16.
 */


function Engine(){

    var CONSTANTS = require("./CONSTANTS");
    var Q = require('q');
    var moment = require("moment");
    var ajax = require("./ajax");

    this.processData = function(data){

        getOrgUnitByPhone(data.number).then(function(orgUnits){
            var message = messageParser(data.message);
            if (orgUnits.length>0){
                if (message == CONSTANTS.INVALID_FORMAT){
                    prepareEventAndPush(data,orgUnits[0],false);
                }else{
                    prepareDVSAndPush(message,orgUnits[0]);
                }
            }else{// Phone not registered
                    if (message == CONSTANTS.INVALID_FORMAT) {
                        prepareEventAndPush(data,false,false);
                    }else{
                        prepareEventAndPush(data,false,true);
                    }
                }
        })
    }

    function messageParser(message){
        var result = {
            field1	:	undefined,
            field2	:	undefined,
            field3	:	undefined,
            field4	:	undefined,
            field5	:	undefined,
            field6	:	undefined,
            field7	:	undefined
        };

        // # 1.2.3 4.5.6 7
        if (message.indexOf(".")!=-1){
            var msg_parts = message.split(" ");

            if (msg_parts.length!=4)
            return CONSTANTS.INVALID_FORMAT;

            var maleList = msg_parts[1].split(".");
            var femaleList = msg_parts[2].split(".");

            if (maleList.length!=3 || femaleList.length!=3)
            return CONSTANTS.INVALID_FORMAT;

            result.field1 = maleList[0];
            result.field2 = maleList[1];
            result.field3 = maleList[2];
            result.field4 = femaleList[0];
            result.field5 = femaleList[1];
            result.field6 = femaleList[2];
            result.field7 = msg_parts[3];
            return result;

        }else{ //# 2 3 5 6 7 8 9
            var msg_parts = message.split(" ");

            if (msg_parts.length != 8)
            return CONSTANTS.INVALID_FORMAT;

            for (var i=1;i<8;i++) {
                result["field"+i] = msg_parts[i];
            }
            return result;
        }
    }

    function prepareDVSAndPush(data,ou){

        var orgUnit = ou.id;
        var period = moment().format("YYYYMMDD");
        var storedBy = undefined;

        var dv = {"dataValues":[]}

        dv.dataValues.push(makeDVJson(CONSTANTS.field1.de,CONSTANTS.field1.coc,period,orgUnit,data["field1"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field2.de,CONSTANTS.field2.coc,period,orgUnit,data["field2"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field3.de,CONSTANTS.field3.coc,period,orgUnit,data["field3"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field4.de,CONSTANTS.field4.coc,period,orgUnit,data["field4"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field5.de,CONSTANTS.field5.coc,period,orgUnit,data["field5"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field6.de,CONSTANTS.field6.coc,period,orgUnit,data["field6"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field7.de,CONSTANTS.field7.coc,period,orgUnit,data["field7"],storedBy));

        ajax.postReq(CONSTANTS.DHIS_URL_BASE+"/api/dataValueSets?",dv,CONSTANTS.auth,callback);

        function callback(response){

            if (response.status == "SUCCESS"){
                //send confirmation
                __logger.info(response.status);

            }else{

            }
        }

        function makeDVJson(de,cc,pe,ou,val,storedBy){
            var dv = {
                "dataElement":de,
                "period":pe,
                "orgUnit":ou,
                "categoryOptionCombo":cc,
                "value":val
            }
            return dv;
        }
    }

    function getOrgUnitByPhone(phone){
        var def = Q.defer();
        var url = CONSTANTS.DHIS_URL_BASE+"/api/organisationUnits?fields=id,name&filter=phoneNumber:eq:"+phone;

        ajax.getReq(url,CONSTANTS.auth,callback);
        function callback(response){
            def.resolve(response.organisationUnits);
        }

        return def.promise;
    }

    function prepareEventAndPush(data,ou,format){
        __logger.info(CONSTANTS.INVALID_FORMAT);

    }

}

module.exports = new Engine();
