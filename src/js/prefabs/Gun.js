
$.Gun = $.Line.extend({

  color: [255,255,255],
  size: 10,

  dirMove: 0,
  powa: 5,
  vel: 0,

  bounds: {
    min: 0,
    max: 200
  },

  maxVel: 20,

  start: function(){
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

  },

  updateAim: function(){
    var d = $.V.normal(this.pos, this.cursor.pos);
    d.z = this.cursor.pos.y / config.size.y;
    this.dir = d;

    this.to = $.V3.add(this.pos, $.V.multiply(this.dir, (1 - this.dir.z) * 50));
  },

  update: function(){
    this.updateMove();
    this.updateAim();
  }
  
});
