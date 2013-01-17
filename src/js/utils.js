function recursiveGetProp(obj, lookup, callback) {
    for (property in obj) {
        if (property == lookup) {
            callback(obj[property]);
        } else if (obj[property] instanceof Object) {
            recursiveGetProp(obj[property], lookup, callback);
        }
    }
}

recursiveGetProp(yourObj, 'Compounds', function(obj) {
    var count = 0;

for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
        count++;
    }
}
    console.debug(count);
});