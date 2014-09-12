
$.V3 = $.Base.extend({ }, {

  zero: { x: 0, y: 0, z: 0 },
  one: { x: 1, y: 1, z: 0 },

  clone: function(v){
    return { x: v.x, y: v.y, z: v.z };
  },
/*
  
  divide: function(vector, delta){
    return { x: vector.x / delta, y: vector.y / delta };
  },
*/
  
  prod: function(a, b){
    return { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z };
  },

  multiply: function(vector, delta){
    return { x: vector.x * delta, y: vector.y * delta, z: vector.z * delta };
  },

  add: function(a, b){
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
  },

  dif: function(from, to){
    return { x: to.x - from.x, y: to.y - from.y, z: to.z - from.z };
  },

  magnitude: function(a, b){
    var dif = $.V.dif(a, b);
    return Math.sqrt(dif.x*dif.x + dif.y*dif.y + dif.z*dif.z);
  },

  normal: function(from, to){
    var d = $.V.dif(from, to);
    var l = $.V.magnitude(from, to);

    return {
        x: d.x / l || 0
      , y: d.y / l || 0
      , z: d.z / l || 0
    };
  },

  circlesCollide: function(cirA, cirB){
    var za = cirA.pos.z;
    var zb = cirB.pos.z;
    var gap = 0.5;

    if (za > zb - gap && za < zb + gap){
      return $.V.circlesCollide(cirA, cirB);
    }

    return false;
  },

  round: function(v){
    v.x = Math.round(v.x);
    v.y = Math.round(v.y);
    v.z = Math.round(v.z);
    return v;
  },


/*
  

  // get "which" part of a point between 2 (i.e. 4th part)
  part: function(from, to, which){
    return $.V.lerp(from, to, which/10);
  },

  angleTo: function(from, to){
    var p = $.V.dif(from, to);
    return Math.atan2(p.y, p.x);
  },

  // get mid point between 2
  mid: function(from, to){
    return $.V.divide($.V.add(from, to), 2);
  },

  eql: function(a, b){
    return (a.x === b.x && a.y === b.y);
  },

 

  origin: function(pos, size){
    return {
        x: pos.x - size.x/2,
        y: pos.y - size.y/2,
    };
  },

  center: function(pos, size){
    return {
        x: pos.x + size.x/2,
        y: pos.y + size.y/2,
    };
  },

 

  pointInCircle: function(p, pos, radius){
    return $.V.magnitude(p, pos) < radius;
  },
  
  lerp: function(from, to, t){

    return {
      x: from.x + (to.x - from.x) * t,
      y: from.y + (to.y - from.y) * t
    };

  },

  round: function(v){
    v.x = Math.round(v.x);
    v.y = Math.round(v.y);
    return v;
  },

  isOut: function(p, min, max){
    return (p.x < min.x || p.x > max.x || p.y < min.y || p.y > max.y);
  },

  rotate: function(p, deg, clockwise){
    var rad = $.M.degToRad(deg * (clockwise ? 1 : -1));
    return {
      x: (p.x * Math.cos(rad)) - (p.y * Math.sin(rad)),
      y: (p.x * Math.sin(rad)) + (p.y * Math.cos(rad))
    };
  }
*/
});
