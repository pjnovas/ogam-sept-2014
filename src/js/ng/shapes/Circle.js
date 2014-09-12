
$.Circle = $.Entity.extend({

  //pos: { x: 0, y: 0 },
  //radius: 5,
  //fill:null,
  //stroke: null,

  start: function(){},

  update: function(){ },

  draw: function(ctx){
    $.Renderer.circle(ctx, this);
  },

  getSpatialCircle: function(){
    var r = this.radius;
    if (this.pos.z){
      r /= this.pos.z * 0.1;
    }
    
    if (r > this.radius){
      r = this.radius;
    }

    return {
      pos: this.pos,
      radius: r
    };
  }

});
