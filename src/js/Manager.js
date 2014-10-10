
$.Manager = $.Base.extend({

  start: function(){
    this.cursor = new $.Cursor({
      manager: this
    });

    this.wobjects = [];
    this.shoots = [];

    this.shootPos = { x: config.size.x/2, y: config.size.y - 110, z: 1 };

    this.gun = new $.Gun({
      pos: this.shootPos,
      cursor: this.cursor,
      bounds: {
        min: 120,
        max: config.size.x - 115
      }
    });

    this.rails = new $.Rails({
      wobjects: this.wobjects
    });
  },

  shoot: function(){
    this.gun.shoot();
    
    var s = new $.Shoot({
      pos: this.gun.pos,
      dir: this.gun.dir
    });

    this.shoots.push(s);
    this.wobjects.push(s);
  },

  update: function(){

    this.cursor.update();
    this.gun.update();

    this.shoots.forEach(function(shoot){
      shoot.checkCollide(this.rails);
      shoot.update();
    }, this);

    this.rails.update();
  },

  draw: function(viewCtx, worldCtx){
    var s = config.size;

    viewCtx.clearRect(0, 0, s.x, s.y);
    worldCtx.clearRect(0, 0, s.x, s.y);

    //this.cursor.draw(viewCtx);

    this.wobjects.sort(function(a, b){
      return a.pos.z <= b.pos.z;
    });
    
    this.wobjects.forEach(function(obj){
      if (obj.shadow){
        obj.shadow.draw(worldCtx);
      }
    });

    this.wobjects.forEach(function(obj){
      obj.draw(worldCtx);
    });

    this.gun.draw(viewCtx);

  },

});
