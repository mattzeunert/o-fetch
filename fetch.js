function oFetch(object){
    var keys = Array.prototype.slice.apply(arguments);
    keys.shift();
    if (keys.length === 1) {
        var key = keys[0];
        return getValue(object, key);
    } else {
        return keys.map(function(key){
            return getValue(object, key);
        });
    }

    function getValue(object, key){
        var value = object[key];
        if (object[key] !== undefined){
            return object[key];
        }

        if (key.indexOf(".") !== 0) {
            var path = key.split(".");
            var firstKey = path.shift();
            var newObject = object[firstKey];
            if (typeof newObject === "undefined"){
                throw "Property '" + key  + "' is undefined"
            } else {
                return getValue(newObject, path.join("."));
            }
        } else {
            throw "Property '" + key + "' is undefined.";
        }
    }
}

module.exports = oFetch;