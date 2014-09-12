
$.Target = $.Circle.extend({

  fill: [0,255,0],
  radius: 60,


  start: function(){
    this.hit = false;
    this.force = { x: 30, y: 0, z: 0 };

    this.shadow = new $.Circle({
      pos: { x: this.pos.x, y: this.pos.y, z: 50 },
      radius: Math.abs((this.radius - this.pos.z) * 5),
      fill: [0,0,0,0.1]
    });

    this.center = { x: config.size.x/2, y: config.size.y};
  },

  update: function(){
    if (this.hit){
      return;
    }

    var pos = $.V.add(this.pos, $.V.multiply(this.force, $.dt));
    this.pos = { x: pos.x, y: pos.y, z: this.pos.z };
    this.pos = $.V3.round(this.pos);

    var d = $.V.normal(this.center, this.pos);
    d = $.V.add(this.pos, $.V.multiply(d, 10));
    this.shadow.pos = { x: d.x, y: d.y, z: 50 };

    this.shadow.radius = Math.pow(this.radius, -this.pos.z/100) * this.radius*10;
  },
  
});