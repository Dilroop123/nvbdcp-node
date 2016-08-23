/**
 * Created by harsh on 7/5/16.
 */


exports.prepareIdToObjectMap = function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        map[object[i][id]] = object[i];
    }
    return map;
}

exports.prepareListFromMap= function(map){
    var list = [];
    for (var key in map){
        list.push(map[key]);
    }
    return list;
}
