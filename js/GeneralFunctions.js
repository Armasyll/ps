// General functions
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(nextSource);
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function completeAssign(target, ...sources) {
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});
    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Date.prototype.addSeconds = function() {
    var args = arguments;
    if (Number.isInteger(args[0]) && args[0] > 0)
        this.setSeconds(this.getSeconds() + args[0]);
    return this;
};
Date.prototype.addMinutes = function() {
    var args = arguments;
    if (Number.isInteger(args[0]) && args[0] > 0)
        this.setMinutes(this.getMinutes() + args[0]);
    return this;
};
Date.prototype.addHours = function() {
    var args = arguments;
    if (Number.isInteger(args[0]) && args[0] > 0)
        this.setHours(this.getHours() + args[0]);
    return this;
}
Date.prototype.addDate = function() {
    var args = arguments;
    if (Number.isInteger(args[0]) && args[0] > 0)
        this.setDate(this.getDate() + args[0]);
    return this;
}

function array_flip(trans) {
    var key;
    var tmpArr = {};
    
    for (key in trans) {
        if (!trans.hasOwnProperty(key)) {
            continue;
        }
        tmpArr[trans[parseInt(key)]-1] = (key);
    }
    return tmpArr;
}

function map_flip(trans) {
    var tmpMap = new Map();
    
    trans.forEach(function(val, key) {
        tmpMap.set(val, key);
    });
    
    return tmpMap;
}

function array_compare(a1, a2) {
    if (a1.length != a2.length) return false;
    var length = a2.length;
    for (var i = 0; i < length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
}

function in_array(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

function unixTimeToDate(_unixTimestamp = currentTime) {
    if (_unixTimestamp == 'undefined')
        return true;
    
    _length = _unixTimestamp.toString().length;
    
    if (_length != 13) {
        if (_length > 13)
            _unixTimestamp = _unixTimestamp.toString().substring(0, 13);
        else {
            _padding = (13 - _length);
            for (var _i = 0; _i < _padding; _i++) {
                _unixTimestamp = _unixTimestamp + "0";
            }
        }
    }
    
    _date = new Date(parseInt(_unixTimestamp));
    
    return _date;
}
function unixTimeToDateString(_unixTimestamp = currentTime) {
    if (Number.isInteger(_unixTimestamp) && _unixTimestamp.length > 10)
        _date = unixTimeToDate(_unixTimestamp);
    else
        _date = currentTime;
    
    return String(
        _date.getFullYear() + "/" +
        ('0' + (_date.getMonth() + 1)).slice(-2) + "/" +
        ('0' + _date.getDate()).slice(-2) + ' ' +
        ('0' + _date.getHours()).slice(-2) + ":" +
        ('0' + _date.getMinutes()).slice(-2)
    );
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}

if(!jQuery) {
    include_jQuery();
    var $ = jQuery.noConflict();
} else {
    var $ = jQuery;
}