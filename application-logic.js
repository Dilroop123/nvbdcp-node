/**
 * Created by harsh on 16/7/16.
 */

function Engine(){

    var CONSTANTS = require("./CONSTANTS");
    var Q = require('q');
    var moment = require("moment");
    var ajax = require("./ajax");


    this.processData = function(logID,data,entry){
        if(entry){logID=logID + "-" + entry;}
        var self = this;
        getOrgUnitByPhone(logID,data.sender).then(function(orgUnits){
            var message = messageParser(data.content);
            if (orgUnits.length>0){
                var language = extractLanguage(orgUnits[0])
                __logger.debug("language="+language);

                //  __logger.info(logID + "Org Unit Found");
                if (message == CONSTANTS.INVALID_FORMAT){
                    prepareEventAndPush(logID,data,orgUnits[0],false,language);
                }else{
                    prepareDVSAndPush(logID,message,orgUnits[0],data,language);
                }
            }else{// Phone not registered
                __logger.info(logID +  "Org Unit Not Found..will create");
                createOrgUnit(logID,data,self.processData);
                if (message == CONSTANTS.INVALID_FORMAT) {
                        prepareEventAndPush(logID,data,false,false,"English");
                    }else{
                        prepareEventAndPush(logID,data,false,true,"English");
                    }
                }
        })
    }

    function createOrgUnit(logID,data,processData){
        var ou = {
            name:"OU-"+data.sender,
            parent:{
                id : CONSTANTS.ORGUNIT_INVALID_PHONE_PARENT_UID
            },
            openingDate:moment().format("YYYY-MM-DD"),
            shortName: "OU-"+data.sender,
            //dataSets: [
            //    {
            //        id: CONSTANTS.DATASET_MDA_UID
            //    }
            //],
            //programs: [
            //    {
            //        id: CONSTANTS.PROGRAM_INVALID_FORMAT
            //    }
            //],
            phoneNumber : data.sender
        }

        ajax.postReq(CONSTANTS.DHIS_URL_BASE+"/api/organisationUnits?",ou,CONSTANTS.auth,callback);

        function callback(error,response,body){
            if (error == null){
                __logger.info(logID+"[OU_CREATION+]"+body.status);
                assignToProgram(logID,data,processData,body.response.lastImported)

            }else{
                __logger.error(logID+"[OU_CREATION-]"+error.message);
            }
        }


    }

    function assignToProgram(logID,data,processData,ou){

        __logger.debug(logID + " ou="+ou);
        ajax.postWithoutDataReq(CONSTANTS.DHIS_URL_BASE+"/api/programs/"+CONSTANTS.PROGRAM_INVALID_FORMAT+"/organisationUnits/"+ou,CONSTANTS.auth,assignToDataSet);

        function assignToDataSet(error,response,body){
            if (error == null){

                __logger.info(logID+"[UPDATE-PROGRAM+]"+response.statusMessage);
                ajax.postWithoutDataReq(CONSTANTS.DHIS_URL_BASE+"/api/dataSets/"+CONSTANTS.DATASET_MDA_UID+"/organisationUnits/"+ou,CONSTANTS.auth,reentry);
            }else{
                __logger.error(logID+"[UPDATE-PROGRAM-]"+error.message);
            }
        }

        function reentry(error,response,body){
            if (error == null){
                __logger.info(logID+"[UPDATE-DATASET+]"+response.statusMessage);
                processData(logID,data,"REENTRY")

            }else{
                __logger.error(logID+"[UPDATE-DATASET-]"+error.message);
            }
        }
    }
    function extractLanguage(orgUnit){
        var language = "English";
        var parent = orgUnit.parent;
        try{
            if (orgUnit.attributeValues){
                var value = extractValueFromAttributeValues(orgUnit.attributeValues,CONSTANTS.META_ATTRIBUTE_OU_LANGUAGE);
                if (value) return value;
            }

            for (var i=0;i<10;i++){
                if (!parent) break;

                if (parent.parent){
                    if (parent.parent.id){
                        var attrValues = parent.parent.attributeValues;
                        var value = extractValueFromAttributeValues(attrValues,CONSTANTS.META_ATTRIBUTE_OU_LANGUAGE);
                        if (value) return value;
                    }
                }
                parent = parent.parent;
            }
        }catch(e){
            __logger.error("extractLanguage says"+ e.message);
            return language;
        }

        return language;
    }

    function extractValueFromAttributeValues(attrValues,id){
        for (var i=0;i<attrValues.length;i++){
            if (attrValues[i].attribute.id== id){
                return attrValues[i].value;
            }
        }
        return undefined;
    }
    function messageParser(message){

        message = JSON.parse(JSON.stringify(message));
        var result = {
            field1	:	undefined,
            field2	:	undefined,
            field3	:	undefined,
            field4	:	undefined,
            field5	:	undefined,
            field6	:	undefined,
            field7	:	undefined
        };

        message = message.replace(/[<>~`"'!@#$%^&*()_;:,.?=/+\{}\[\]\\-]+/g," ");
        message = message.toLowerCase().trim();

        message = message.replace(/female/g,"");
        message = message.replace(/femel/g,"");
        message = message.replace(/male/g,"");
        message = message.replace(/mel/g,"");


        message = message.replace(/side effect/g,"");
        message = message.replace(/sideeffect/g,"");
        message = message.replace(/effect/g,"");


        message = message.replace(/919293210011/g,"");
        message = message.replace(/9293210011/g,"");

        message = message.replace(/se/g,"");
        message = message.replace(/to/g,"");

        message = message.replace(/m/g,"");
        message = message.replace(/f/g,"");
        message = message.replace(/o/g,"0");

        message = message.replace(/\s+/g," ").trim();

        var pattern = /^\s*\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s*\d*\s*$/;

        if (pattern.test(message)){
            var msg_parts = message.split(" ");

            for (var i=0;i<6;i++) {
                result["field"+(i+1)] = msg_parts[i];
            }
            if (msg_parts[6]){
                result["field7"] = msg_parts[i];
            }else{
                result["field7"] = "0";
            }

            return result;
        }

        return CONSTANTS.INVALID_FORMAT;
    }

    function prepareDVSAndPush(logID,message,ou,data,language){

        var orgUnit = ou.id;
        var msgDate = moment();
        var period = msgDate.format("YYYYMMDD"); __logger.debug("Period="+period);
        var storedBy = CONSTANTS.username;

        var dv = {"dataValues":[]};

        dv.dataValues.push(makeDVJson(CONSTANTS.field1.de,CONSTANTS.field1.coc,period,orgUnit,message["field1"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field2.de,CONSTANTS.field2.coc,period,orgUnit,message["field2"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field3.de,CONSTANTS.field3.coc,period,orgUnit,message["field3"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field4.de,CONSTANTS.field4.coc,period,orgUnit,message["field4"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field5.de,CONSTANTS.field5.coc,period,orgUnit,message["field5"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field6.de,CONSTANTS.field6.coc,period,orgUnit,message["field6"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field7.de,CONSTANTS.field7.coc,period,orgUnit,message["field7"],storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field8.de,CONSTANTS.field8.coc,period,orgUnit,data.msgId+"-"+msgDate.format("YYYY-MM-DD HH:mm:ss Z"),storedBy));
        dv.dataValues.push(makeDVJson(CONSTANTS.field9.de,CONSTANTS.field9.coc,period,orgUnit,data.content,storedBy));


        ajax.postReq(CONSTANTS.DHIS_URL_BASE+"/api/dataValueSets?",dv,CONSTANTS.auth,callback);

        function callback(error,response,body){
            if (error == null){
                //send confirmation
                sendConfirmationMessage(logID,CONSTANTS.PERFECT_MESSAGE,message,language,msgDate,data.sender);
                __logger.info(logID+"[PERFECT_MESSAGE+]"+body.status);
            }else{
                __logger.error(logID+"[PERFECT_MESSAGE-]"+error.message);
            }
        }

        function makeDVJson(de,cc,pe,ou,val,storedBy){
            var dv = {
                "dataElement":de,
                "period":pe,
                "orgUnit":ou,
                "categoryOptionCombo":cc,
                "value":val,
                "storedBy":storedBy
            }
            return dv;
        }
    }

    function getOrgUnitByPhone(logID,phone){
        var def = Q.defer();
        var url = CONSTANTS.DHIS_URL_BASE+"/api/organisationUnits?fields=id,name,attributeValues,parent[parent[parent[parent[parent[parent[id,name,attributeValues[value,attribute[id,name]]]]]]]]&filter=phoneNumber:eq:"+phone;

        ajax.getReq(url,CONSTANTS.auth,callback);
        function callback(error,response,body){
            if(error == null){
                body = JSON.parse(body);
                def.resolve(body.organisationUnits);
                __logger.info(logID+"[OrgUnit+]"+response.statusMessage + " Length:"+body.organisationUnits.length);
            }else{
                __logger.error(logID+"[OrgUnit-]"+error.message);
            }
        }

        return def.promise;
    }

    function prepareEventAndPush(logID,data,orgUnit,formatValid,language){

        var type = undefined;
        var event = {};
        var msgDate = moment();
        event.eventDate =  msgDate; __logger.debug("EventDate="+msgDate.format("YYYY-MM-DD HH:mm:ss Z"));
        event.dataValues = [];
        event.dataValues.push({ dataElement:CONSTANTS.EVENT_DE_MESSAGE,     value:data.content});
        event.dataValues.push({ dataElement:CONSTANTS.EVENT_DE_MESSAGE_ID,  value:data.msgId});
        event.dataValues.push({ dataElement:CONSTANTS.EVENT_DE_TIMESTAMP,   value:msgDate.format("YYYY-MM-DD HH:mm:ss Z")});

        if (!orgUnit){
            type = CONSTANTS.INVALID_PHONE;
            event.program = CONSTANTS.PROGRAM_PHONE_NOT_FOUND;
            event.dataValues.push({ dataElement:CONSTANTS.EVENT_DE_PHONE,value:data.sender});
            event.orgUnit = CONSTANTS.ORGUNIT_ROOT_UID;

            if (formatValid){
                event.dataValues.push({ dataElement:CONSTANTS.EVENT_DE_IS_FORMAT_VALID,value:true});
            }else{
                event.dataValues.push({ dataElement:CONSTANTS.EVENT_DE_IS_FORMAT_VALID,value:false});
            }
        }else{
            event.dataValues.push({ dataElement:CONSTANTS.EVENT_DE_PHONE,value:data.sender});
            event.orgUnit = orgUnit.id;
            type = CONSTANTS.INVALID_FORMAT;
            event.program = CONSTANTS.PROGRAM_INVALID_FORMAT;
            sendConfirmationMessage(logID,type,data,language,msgDate,data.sender);
        }

        pushEvent(logID,event);

        function pushEvent(logID,event){
            var url = CONSTANTS.DHIS_URL_BASE+"/api/events?";

            ajax.postReq(url,event,CONSTANTS.auth,callback);

            function callback(error,response,body){
                if (error==null){
                    __logger.info(logID +"["+type+"-"+formatValid+"]"+"[Event Push+]"+body.message);

                }else{
                    __logger.error(logID+"["+type+"-"+formatValid+"]"+"[Event Push-]"+error.message);
                }
            }
        }
    }

    function sendConfirmationMessage(logID,type,data,language,msgDate,phone){

        if (language == "Odiya"){
            language = "English";
        }

        if (type == CONSTANTS.PERFECT_MESSAGE && language != "English" ){

            var message =  data["field1"]+","+
                            data["field2"]+","+
                            data["field3"]+","+
                            data["field4"]+","+
                            data["field5"]+","+
                            data["field6"]+","+
                            data["field7"];

            sendSMSThroughProxy(message,phone,language,msgDate.format("DD-MM-YYYY"),callback);

        }else{
            var confirmationMessage = buildMsg(type,data,language,msgDate);
//__logger.info(type+","+JSON.stringify(data) + phone);
            var url = buildURL();
            url = url+"&message="+confirmationMessage+"&numbers="+phone;

//__logger.info(url);
            ajax.getReqWithoutAuth(url,callback);
        }

        function callback(error,response,body){
            if (error == null){
                body = JSON.parse(body);
__logger.debug(JSON.stringify(body));
                __logger.info(logID+"[ConfirmationSMS+]"+body.status);
            }else{
                __logger.error(logID+"[ConfirmationSMS-]"+error.message);
            }
        }

        }

        function buildMsg(type,data,language,msgDate){

            var translation = CONSTANTS.languageMap[language];
            if (!translation){
                translation = CONSTANTS.languageMap["English"];
            }
            var msg = "";
            switch (type){
                case CONSTANTS.PERFECT_MESSAGE :
//__logger.info(JSON.stringify(translation));
                    msg = translation[CONSTANTS.PERFECT_MESSAGE];
				msg = msg + " "+translation["male"]+"("+
                                     data["field1"]+","+
                                     data["field2"]+","+
                                     data["field3"]+"),"+translation["female"]+"("+
                                     data["field4"]+","+
                                     data["field5"]+","+
                                     data["field6"]+"),"+translation["sideEffect"]+"("+
                                     data["field7"]+") ";

                                     if (language=="English" || language == "Hindi"){
                                        msg =  msg+msgDate.format("DD-MM-YYYY");
                                     }else{
                                        msg = msg + translation["sent"]+msgDate.format("DD-MM-YYYY");
                                     }
                    break;

                case CONSTANTS.INVALID_FORMAT :
                    msg = translation[CONSTANTS.INVALID_FORMAT];
                    break;

                case CONSTANTS.INVALID_PHONE :
                    msg = translation[CONSTANTS.INVALID_PHONE];
                    break;
            }

            __logger.info("message = "+msg);

            return msg;
        }

        function buildURL(language){
            var url = CONSTANTS.sendSMSURL + "?username="+CONSTANTS.TEXTLOCAL_USERNAME+
                        "&hash="+CONSTANTS.TEXTLOCAL_HASH+
                        "&sender="+CONSTANTS.TEXTLOCAL_SENDER+"";

            if (language!="English"){
                url = url + "&unicode=1";
            }

        return url;
        }

    function getUnicodeFromTextLocal(msg,language,callback){

        var url = CONSTANTS.unicodeLookUpURL + "message="+msg;
        ajax.getReqWithoutAuth(url,callback);

    }

    function sendSMSThroughProxy(message,phone,language,date,callback){
        var url = CONSTANTS.unicodeLookUpURL + "message="+message+"&mobileno="+phone+"&language="+language+"&date="+date+"&hash="+CONSTANTS.TEXTLOCAL_HASH;
        ajax.getReqWithoutAuth(url,callback);
    }
}

module.exports = new Engine();
