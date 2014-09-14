
$.Manager = $.Base.extend({

  start: function(){
    this.cursor = new $.Cursor({
      manager: this
    });

    this.wobjects = [];
    this.shoots = [];
    this.targets = [];

    this.shootPos = { x: config.size.x/2, y: config.size.y - 110, z: 1 };

    this.gun = new $.Gun({
      pos: this.shootPos,
      cursor: this.cursor,
      bounds: {
        min: 120,
        max: config.size.x - 115
      }
    });

    this.rails = [];
    this.createRails();

    this.createTarget({ x: 100, y: 100, z: 45 });
    this.createTarget({ x: 120, y: 200, z: 45 });
    this.createTarget({ x: 130, y: 300, z: 45 });

  },

  createRails: function(){
    for (var i=1; i<4; i++){
      this.rails = new $.Rail({
        pos: { x: 0, y: (i*100)+23, z: 46 },
        wobjects: this.wobjects
      });
    }
  },

  createTarget: function(pos){
    var t = new $.Target({ pos: pos });
    this.targets.push(t);
    this.wobjects.push(t);
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
