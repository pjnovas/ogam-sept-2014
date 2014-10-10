
$.Targets = $.Collection.extend({

  top: 0,
  far: 0,

  wobjects: [],

  start: function(){
    this.entities = [];
  },

  createOne: function(from, vel){
    var target =new $.Target({ 
      pos: { x: from, y: this.top, z: this.far },
      force: { x: vel*10, y: 0, z: 0 },
    });

    this.entities.push(target);
    this.wobjects.push(target);
  },

  getActives: function(){
    var actives = [];
    for (var i=0; i<this.entities.length; i++){
      var ent = this.entities[i];
      if (!ent.hit){
        actives.push(ent);
      }
    }
    return actives;
  }

});
