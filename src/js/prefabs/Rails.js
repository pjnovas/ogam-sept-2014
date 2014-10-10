
$.Rails = $.Collection.extend({

  far: 45,
  places: [100, 200, 300],

  wobjects: [],

  start: function(){
    this.entities = [];
    this.rails = [];
    this.createRails();
  },

  createRails: function(){
    for (var i=0; i<this.places.length; i++){
      var rail = new $.Rail({
        pos: { x: 0, y: this.places[i]+23, z: this.far },
        wobjects: this.wobjects
      });

      this.entities.push(rail);
      this.wobjects.push(rail);
    }
  },

  getTargets: function(){
    var targets = [];
    this.entities.forEach(function(rail){
      targets = targets.concat(rail.targets.getActives());
    });
    return targets;
  }

});
