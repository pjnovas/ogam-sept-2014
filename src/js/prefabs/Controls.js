
$.Controls = $.Base.extend({

  events: {
      "pressing": null
    , "moving": null
    , "release": null

    , "left:on": null
    , "left:off": null
    , "right:on": null
    , "right:off": null
    
    , "pause": null
  },

  enabled: false,

  actions: {},

  start: function(options){
    var doc = window.document
      , c = this.container = options.container || doc;

    c.onmouseup = this._onMouseEvent.bind(this, "release");
    c.onmousedown = this._onMouseEvent.bind(this, "pressing");
    c.onmousemove = this._onMouseEvent.bind(this, "moving");
    doc.addEventListener("keyup", this._onKeyUp.bind(this));
    doc.addEventListener("keydown", this._onKeyDown.bind(this));
  },

  enable: function(){
    this.enabled = true;
    return this;
  },

  disable: function(){
    this.enabled = false;
    return this;
  },

  on: function(evName, callback){
    if (!this.events[evName]){
      this.events[evName] = [];
    }

    this.events[evName].push(callback);

    return this;
  },

  off: function(evName){
    if (this.events[evName]){
      this.events[evName].length = 0;
    }

    return this;
  },

  _getEventName: function(e){
    var key = e.which || e.keyCode;

    switch(key){
      case 65: //A
      case 97: //a
        return "left";
      case 68: //D
      case 100: //d
        return "right";
      case 112: //P
      case 80: //p
        return "pause";
    }

    return;
  },

  _onKeyUp: function(e){
    var evName = this._getEventName(e);

    if (!this.enabled && evName !== "pause"){
      return;
    }

    if (evName){
      
      this.actions[evName] = 0;

      evName += ":off";

      if (this.events[evName]){
        this.events[evName].forEach(function(cb){
          cb();
        });
      }
    }
  },

  _onKeyDown: function(e){
    var evName = this._getEventName(e);

    if (!this.enabled){
      return;
    }

    if (evName){
      this.actions[evName] = 1;

      evName += ":on";
      if (this.events[evName]){
        this.events[evName].forEach(function(cb){
          cb();
        });
      }
    }
  },

  _onMouseEvent: function(type, e){
    if (!this.enabled){
      return;
    }

    var pos = this.getCoordsEvent(e, this.container);

    if (this.events[type]){
      this.events[type].forEach(function(cb){
        cb(pos);
      });
    }
  },

  getCoordsEvent: function(e, ele){
    var x, y
      , doc = document
      , body = doc.body
      , docEle = doc.documentElement;

    if (e.pageX || e.pageY) { 
      x = e.pageX;
      y = e.pageY;
    }
    else { 
      x = e.clientX + body.scrollLeft + docEle.scrollLeft; 
      y = e.clientY + body.scrollTop + docEle.scrollTop; 
    } 
    
    x -= ele.offsetLeft;
    y -= ele.offsetTop;
    
    return { x: x, y: y };
  }

});
