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

    function showError(message){
        console.error("Error fetching from this object:", object);
        throw new Error(message);
    }

    function getValue(object, key, alreadyEvaluatedKeys){
        var value = object[key];
        if (value !== undefined){
            return value;
        }

        var isNestedProperty = key.indexOf(".") !== 0;
        if (isNestedProperty) {
            var path = key.split(".");
            var firstKey = path.shift();

            if (alreadyEvaluatedKeys === undefined) {
                alreadyEvaluatedKeys = [];
            }
            alreadyEvaluatedKeys = alreadyEvaluatedKeys.concat([firstKey])

            var newObject = object[firstKey];
            if (newObject === undefined){
                var firstPartOfErrorMessage = "Property '" + alreadyEvaluatedKeys.join(".") + "' is undefined"
                var secondPartOfErrorMessage = "";
                if (path.join(".") !== alreadyEvaluatedKeys.join(".")){
                    secondPartOfErrorMessage = " (fetching '" + exceptLast(alreadyEvaluatedKeys).join(".") + "." + key + "')";
                }
                showError(firstPartOfErrorMessage + secondPartOfErrorMessage);
            } else {
                return getValue(newObject, path.join("."), alreadyEvaluatedKeys);
            }
        } else {
            showError("Property '" + key + "' is undefined.");
        }
    }
}

function exceptLast(array){
    var ret = array.slice();
    ret.pop();
    return ret;
}

module.exports = oFetch;

