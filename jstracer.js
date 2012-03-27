(function () {
    // external
    trace = function(object, functionName) {
        var oldFunction = object[functionName];
        if (!oldFunction || oldFunction.__tracer__) return null;
        object[functionName] = makeTracer(object, functionName);
        object[functionName].__original_function__ = oldFunction;
    }

    // external
    untrace = function(object, functionName) {
        if (!object[functionName] ||
            !object[functionName].__tracer__) return null;
        object[functionName] = object[functionName].__original_function__;
    }
  
    function makeTracer(object, functionName) {
        var oldFunction = object[functionName];
        var result = function() {
            indent.indent = indent.indent + 1;
            console.log(indent() + "[" + functionName + "]");
            try {
                oldFunction.apply(object, arguments);
                console.log(indent() + "[/" + functionName + "]");
            } finally {
                indent.indent = indent.indent - 1;
            }
        }
        result.__tracer__ = true;
        return result;  
    }
        
    function indent() {
        var s = "";
        for (var i = 1; i < indent.indent; i += 1) s += " ";
        return s;
    }
    indent.indent = 0;        
})();



