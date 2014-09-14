
$.Loader = $.Base.extend({

  events: {
      complete: function(){}
    , report: function(){}
    , error: function(){}
  },

  totalImages: 0,
  //totalSounds: 0,
  completed: false,

  checkComplete: function() {
    if (!this.completed && this.totalImages >= 100 /*&& this.totalSounds >= 50*/){
      this.completed = true;
      this.events.complete();
    }
  },

  reportProgress: function(){
    this.events.report(this.totalImages/* + totalSounds*/);
  },

  initResources: function(images/*, sounds*/){
    var self = this;

    Repository
      .addResources(images)
      .on('error', this.events.error)
      .on('report', function(prg){
        //totalImages = prg/2;
        self.totalImages = prg;
        self.reportProgress();
        self.checkComplete();
      })
      .on('complete', this.checkComplete.bind(this));
/*
    Sounds
      .addSounds(sounds)
      .on('error', events.error)
      .on('report', function(prg){
        totalSounds = prg/2;
        reportProgress();
        checkComplete();
      })
      .on('complete', checkComplete);    
*/
    return this;
  },

  on: function(eventName, callback){
    if (this.events[eventName]) {
      this.events[eventName] = callback;
    }
    return this;
  },

  load: function(){
    Repository.load();
    //Sounds.load(window.jetpacked.settings.soundsUrl);
  }

});

