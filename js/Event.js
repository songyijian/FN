"use strict";

function Event(name) {
  this.ev = {}
  if(name){ this.name = name}
}

Event.prototype.on = function (type, fn) {
  if (typeof fn !== 'function' || typeof type !== 'string') return;
  (this.ev[type] || (this.ev[type] =[])).push({func:fn, type:'on'})
  return this
}

Event.prototype.once = function (type, fn) {
  if (typeof fn !== 'function'  || typeof type !== 'string') return;
  (this.ev[type] || (this.ev[type] =[])).push({func: fn, type: 'once'})
  return this
}

Event.prototype.emit = function (type) {
  var args = [].slice.call(arguments, 1),
      evt = this.ev[type],
      inon = [];
  if (evt) {
    for (var index = 0; index < evt.length; index++) {
      try {
        evt[index].func.apply(this, args);
        evt[index].type === 'on' && inon.push(evt[index])
      } catch (error) {
        console.error(`[ Event ] Error:${this.name} - ${evt[index].type} - ${type} - ${evt[index].func}`,error)
      }
    }
    this.ev[type] = inon
  } 
  return this
}

Event.prototype.off = function (type, fn) {
  if (fn === undefined) {
    this.ev[type] && delete this.ev[type];
  } else {
    if (this.ev[type]) {
      for (var i in this.ev[type]) {
        if (this.ev[type][i].func === fn) {
          this.ev[type].splice(i, 1);
        }
      }
    }
  }
  return this
}

export default Event
