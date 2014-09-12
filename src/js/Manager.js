
$.Manager = $.Base.extend({

  start: function(){
    this.cursor = new $.Cursor({
      manager: this
    });

    this.wobjects = [];
    this.shoots = [];
    this.targets = [];

    this.shootPos = { x: config.size.x/2, y: config.size.y, z: 1 };

    this.gun = new $.Gun({
      pos: this.shootPos,
      cursor: this.cursor,
      bounds: {
        min: 100,
        max: config.size.x - 100
      }
    });

    this.createTarget({ x: 100, y: 100, z: 40 });
    this.createTarget({ x: 120, y: 150, z: 35 });
    this.createTarget({ x: 130, y: 200, z: 30 });
  },

  createTarget: function(pos){
    var t = new $.Target({ pos: pos });
    this.targets.push(t);
    this.wobjects.push(t);
  },

  shoot: function(){
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
      shoot.checkCollide(this.targets);
      shoot.update();
    }, this);

    this.targets.forEach(function(target){
      target.update();
    });
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
