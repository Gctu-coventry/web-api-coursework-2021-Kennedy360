exports.status = function(res,statusCode,statusMessage = null,headers=null){
    if(headers == null){
        headers = { 'Content-Type' : 'application/json'}
    }
    res.writeHead(statusCode,statusMessage,headers)
}

exports.json = function(data){
    return JSON.stringify(data);
}


exports.setData = function(keys,values){
    if(keys.length != values.length){
        console.error("Length of keys and values must match")
    }else{
        const data = {}
        const size = keys.length
        for(var i=0;i<size;i++){
            data[keys[i]] = values[i];
        }
        return data;
    }
}