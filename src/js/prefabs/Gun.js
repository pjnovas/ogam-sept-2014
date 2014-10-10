
$.Gun = $.Collection.extend({

  dirMove: 0,
  powa: 10,
  vel: 0,

  bounds: {
    min: 0,
    max: 200
  },

  maxVel: 20,

  start: function(){
    this.entities = [];

    var self = this;

    Controls
      .on("left:on", function(){
        self.dirMove = -1;
      })
      .on("left:off", function(){
        self.dirMove = 0;
      })
      .on("right:on", function(){
        self.dirMove = 1;
      })
      .on("right:off", function(){
        self.dirMove = 0;
      });

    this.top = new $.Sprite({
      pos: { x: this.pos.x, y: this.pos.y - 40 },
      resource: "gun",
      sprite: { x: 0, y: 0, w: 150, h: 150 },
      size: { x: 150, y: 150 },
      angle: 0,
    });

    this.tube = new $.Sprite({
      pos: this.pos,
      resource: "gun",
      sprite: { x: 0, y: 150, w: 150, h: 150 },
      size: { x: 150, y: 150 },
      angle: 0,
    });

    this.entities.push(this.tube);
    this.entities.push(this.top);
  },

  shoot: function(){
    this.shooted = $.tm + 1000;
  },

  updateMove: function(){
    this.vel += this.dirMove * $.dt * this.powa;
  
    if (Math.abs(this.vel) > this.maxVel){
      this.vel = this.maxVel * this.dirMove;
    }
    
    this.pos.x += this.vel;

    if (this.pos.x < this.bounds.min){
      this.pos.x = this.bounds.min;
      this.vel = 0;
    }
    else if (this.pos.x > this.bounds.max){
      this.pos.x = this.bounds.max;
      this.vel = 0;
    }

    this.top.pos = { x: this.pos.x, y: this.pos.y - 40 };

    if (this.shooted > $.tm){
      this.top.pos.y += 5;
      this.shooted = $.tm;
    }

    var deacc = this.powa/2;
    if (this.vel > 0){
      deacc*=-1;
    }

    this.vel += deacc* $.dt;
  },

  updateAim: function(){
    //TODO: Add Sprite for up and down animation

    var to = { x: this.pos.x, y: this.cursor.pos.y, z: 0 };
    var d = $.V.normal(this.pos, to);
    d.z = this.cursor.pos.y / config.size.y;
    this.dir = d;

    this.to = $.V3.add(this.pos, $.V.multiply(this.dir, (1 - this.dir.z) * 50));
  },

  update: function(){
    this.updateMove();
    this.updateAim();
  }
  
});
