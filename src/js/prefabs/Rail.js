
$.Rail = $.Collection.extend({

  wobjects: [],
  vel: 1.5,

  createTarget: 0,

  start: function(){

    this.shadow = new $.Line({
      pos: { x: 0, y: this.pos.y+10, z: config.size.z },
      to: { x: config.size.x, y: this.pos.y+10, z: config.size.z },
      size: 8,
      color: [0,0,0,0.1]
    });

    this.entities = [];

    //TODO: Change this into ONE large sprite!
    for (var x=0; x<10; x++){
      var rail = new $.Sprite({
        resource: "targets",
        pos: { x: x*100 , y: this.pos.y+23, z: this.pos.z },
        sprite: { x: 0, y: 100, w: 100, h: 100 },
        size: { x: 100, y: 100 }
      });

      this.wobjects.push(rail);
      this.entities.push(rail);

      this.targets = new $.Targets({
        top: this.pos.y,
        far: this.pos.z-1,
        wobjects: this.wobjects
      });
    }
  },

  update: function(){
    this.createTarget -= $.dt;

    if (this.createTarget <= 0){
      this.targets.createOne(0, this.vel*4);
      this.createTarget = this.vel;
    }

    this.targets.update();
  },

  draw: function(ctx){
    this.targets.draw(ctx);
  }
  
});
