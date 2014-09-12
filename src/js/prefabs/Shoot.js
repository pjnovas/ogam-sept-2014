
$.Shoot = $.Circle.extend({

  fill: [255,255,255],

  radius: 20,

  start: function(options){
    this.hit = false;

    var z = 1-options.dir.z;
    var power = z * 10;

    this.vel = {
      x: options.dir.x * (power + 10),
      y: options.dir.y * (power + 18),
      z: z
    };

    this.shadow = new $.Circle({
      pos: { x: this.pos.x, y: this.pos.y, z: 50 },
      radius: Math.abs((this.radius - this.pos.z) * 5),
      fill: [0,0,0,0.1]
    });

    this.center = { x: config.size.x/2, y: config.size.y};
  },

  checkCollide: function(targets){
    if (this.hit){
      return;
    }

    targets.forEach(function(target){
      if ($.V3.circlesCollide(this.getSpatialCircle(), target.getSpatialCircle())){
        this.hit = true;
        target.hit = true;
        this.z = target.z - 5;
      }
    }, this);
  },

  update: function(){
    if (this.hit){
      this.shadow = null;
      return;
    }

    var gravity = 0.98;

    this.vel = $.V3.add(this.vel, $.V3.multiply(this.vel, $.dt));
    this.vel.y += gravity;

    this.pos = $.V3.add(this.pos, this.vel);

    this.pos = $.V3.round(this.pos);

    if (this.pos.z > 50){
      this.fill = [100,100,100];
      this.radius *= 2;
      this.hit = true;
    }

    var d = $.V.normal(this.center, this.pos);
    d = $.V.add(this.pos, $.V.multiply(d, 10));
    this.shadow.pos = { x: d.x, y: d.y, z: 50 };
    
    this.shadow.radius = Math.pow(this.radius, -this.pos.z/100) * this.radius*10;
  }
  
});
