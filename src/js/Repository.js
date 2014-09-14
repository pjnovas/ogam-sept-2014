
$.Repository = $.Base.extend({

  resources: {},
  loaded: 0,

  events: {
      complete: function(){}
    , report: function(){}
    , error: function(){}
  },

  getCount: function(){
    return Object.keys(this.resources).length;
  },
  
  imageLoaded: function() {
    var current = this.getCount();
    var prg = (++this.loaded * 100) / current;

    if (this.loaded <= current){
      this.events.report(prg);

      if (prg >= 100) { 
        this.events.complete();
      }
    }
  },
  
  imageFailed: function(evt, etc){
    this.events.error(evt, etc);       
  },

  on: function(eventName, callback){
    if (this.events[eventName]) {
      this.events[eventName] = callback;
    }
    return this;
  },
  
  loadOne: function(name, callback, errorCallback){
    var cb = (callback || function(){}),
      errorCb = (errorCallback || function(){});
    
    if (!name) {
      throw "Parameter 'name' not specified";
    }
    
    if (this.resources[name]){
      this[name] = new window.Image();
      this[name].onload = cb;
      this[name].onerror = errorCb;
      this[name].src = this.resources[name];
    } else {
      throw "Resource " + name + " not found!. Use addReource() before load.";
    }
    return this;
  },
  
  load: function(){
    this.loaded = 0;
    for (var img in this.resources) {
      if (this.resources.hasOwnProperty(img)){
        this[img] = new window.Image();
        this[img].onload = this.imageLoaded.bind(this);
        this[img].onerror = this.imageFailed.bind(this);
        this[img].src = this.resources[img];
      }
    }
    return this;
  },
  
  addResources: function(newResources){
    for(var r in newResources){
      if (newResources.hasOwnProperty(r)){
        if (this.resources.hasOwnProperty(r)) {
          throw 'The resource ' + r + ' already exists.';
        }
        this.resources[r] = newResources[r];
      }
    }
    return this;
  },
  
  clear: function(){
    var i = this.getCount();

    do {
      if (this[this.resources[i]]){
        this[this.resources[i]] = null;
        delete this[this.resources[i]];
      }
    } while (i--);

    this.resources = {};
  }
  
});