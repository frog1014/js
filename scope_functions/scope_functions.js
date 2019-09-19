// the 2 extensions only support non-null object

Object.prototype.let = function (callback) {
    return callback.apply(this, [filterPrimitive(this)])
}


// apply is preserved from JS
// return this
Object.prototype.applyy = function (callback) {
    callback.apply(this, [filterPrimitive(this)])
    return this
}

// a transformer for getting the primitive value
function filterPrimitive(obj) {
    return (
            obj instanceof Boolean ||
            obj instanceof Number ||
            obj instanceof String
        ) ?
        obj.valueOf() :
        obj
}