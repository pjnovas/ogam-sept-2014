
$.Sprite = $.Entity.extend({

  //resource: "",
  //pos: { x: 0, y: 0 },
  //sprite: { x: 0, y: 0, w: 20, h: 20 },
  //size: { x: 20, y: 20 },
  //angle: 0,

  start: function(){},

  update: function(){ },

  draw: function(ctx){
    $.Renderer.sprite(ctx, this);
  },

  getSpatialCircle: function(){
    
    return this;

    /*
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
    */
  }

});
