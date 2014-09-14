
$.Rail = $.Collection.extend({

  start: function(options){
    /*
    this.shadow = new $.Circle({
      pos: { x: this.pos.x, y: this.pos.y, z: config.size.z },
      radius: Math.abs((this.radius - this.pos.z) * 2),
      fill: [0,0,0,0.1]
    });
  */

    this.entities = [];

    for (var x=0; x<10; x++){
      var rail = new $.Sprite({
        resource: "targets",
        pos: { x: x*100 , y: this.pos.y, z: this.pos.z },
        sprite: { x: 0, y: 100, w: 100, h: 100 },
        size: { x: 100, y: 100 }
      });

      options.wobjects.push(rail);
      this.entities.push(rail);
    }
  },

  update: function(){
/*
    var d = $.V.normal(this.center, this.pos);
    d = $.V.add(this.pos, $.V.multiply(d, 10));
    this.shadow.pos = { x: d.x, y: d.y, z: config.size.z };

    this.shadow.radius = Math.pow(this.radius, -this.pos.z/100) * this.radius*10;
*/
  },
  
});
