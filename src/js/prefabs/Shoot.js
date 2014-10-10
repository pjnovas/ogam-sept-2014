
$.Shoot = $.Sprite.extend({

  hit: false,
  resting: false,

  resource: "gun",
  sprite: { x: 0, y: 300, w: 75, h: 75 },
  size: { x: 40, y: 40 },
  angle: 0,

  radius: 20,

  start: function(options){
    var z = 1-options.dir.z;
    var power = z * 22;

    this.vel = {
      x: 0, //options.dir.x,
      //y: options.dir.y * (power + 18),
      y: options.dir.y * (power + 18),
      z: options.dir.z * 10
    };
/*
    this.shadow = new $.Circle({
      pos: { x: this.pos.x, y: this.pos.y, z: config.size.z },
      radius: Math.abs((this.radius - this.pos.z) * 5),
      fill: [0,0,0,0.1]
    });
*/
    this.center = { x: config.size.x/2, y: config.size.y};
  },

  setHit: function(){
    this.hit = true;
    this.shadow = null;
    this.vel = $.V3.zero;
    this.vel.y = $.M.rnd(1, 10) * -1;
    this.vel.x = $.M.rnd(1, 2) * $.M.rnd11();
  },

  checkCollide: function(rails){
    if (this.hit){
      return;
    }

    var targets = rails.getTargets();

    targets.forEach(function(target){
      if ($.V3.circlesCollide(this.getSpatialCircle(), target.getSpatialCircle())){
        this.setHit();
        target.hit = true;
        this.z = target.z - 5;
      }
    }, this);
  },

  checkfloor: function(){
    if (this.hit && this.pos.y > config.size.floor){
      this.resting = true;
    }
  },

  update: function(){
    if (this.resting){
      return;
    }

    this.vel = $.V3.add(this.vel, $.V3.multiply(this.vel, $.dt));
    
    //if (this.hit){
      //var gravity = 0.98;
      var gravity = 2;
      this.vel.y += gravity;
    //}

    this.pos = $.V3.add(this.pos, this.vel);
    this.pos = $.V3.round(this.pos);

    this.checkfloor();

    if (!this.hit){
      if (this.pos.z > config.size.z){
        this.setHit();
        return;
      }
/*
      var d = $.V.normal(this.center, this.pos);
      d = $.V.add(this.pos, $.V.multiply(d, 10));
      this.shadow.pos = { x: d.x, y: d.y, z: config.size.z };
      
      this.shadow.radius = Math.pow(this.radius, -this.pos.z/100) * this.radius*10;
*/      
    }
  }
  
});
