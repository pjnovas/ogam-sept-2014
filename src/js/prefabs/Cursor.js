
$.Cursor = $.Circle.extend({

  stroke: {
    color: "#fff",
    size: 2
  },

  radius: 20,

  active: false,

  start: function(options){
    var self = this;
    this.manager = options.manager;

    Controls
      .on("pressing", function(pos){
        self.pos = pos;
        self.active = true;
      })
      .on("moving", function(pos){
        self.pos = pos;
      })
      .on("release", function(){
        self.active = false;
        self.manager.shoot();
      });

  },
  
});
