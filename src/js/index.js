
(function(){
  var w = window;
  var doc = w.document;
  doc.title = "BASE GAME";

  function $get(id){
    return doc.getElementById(id);
  }

  var gameCtn = $get("ctn");

  function $newCanvas(id){
    var cv = doc.createElement("canvas");
    cv.id = id;
    gameCtn.appendChild(cv);
    return cv;
  }

  function configGame(){
    var ele = doc.documentElement
      , body = doc.body;

    function getSize(which){
      var offset = "offset", scroll = "scroll";
      return Math.max(
        ele["client" + which], 
        ele[scroll + which], 
        ele[offset + which],
        body[scroll + which], 
        body[offset + which] 
      );
    }

    var w = getSize("Width")/* - 20*/;
    var h = getSize("Height") - 30;

    var max = { x: 1000, y: 600 };
    var min = { x: 1000, y: 600 };

    var size = {
      x: (w > max.x ? max.x : w),
      y: (h > max.y ? max.y : h),
      z: 50,
      floor: 450
    };

    size.x = (size.x < min.x ? min.x : size.x);
    size.y = (size.y < min.y ? min.y : size.y);
    
    gameCtn.style.width = size.x + "px";
    gameCtn.style.height = size.y + "px";

    return {
      size: size,
      world: {
        margin: { x: 0, y: 0 }
      }
    };
  }

  function initGame(){

    w.Time = new $.GameTime();

    w.Controls = new $.Controls({
      container: gameCtn
    });

    var cview = $newCanvas("viewport");

    var front = doc.createElement("div");
    front.id = "front";
    gameCtn.appendChild(front);
    
    var cworld = $newCanvas("world");

    cworld.style.zIndex = 1;
    front.style.zIndex = 2;
    cview.style.zIndex = 3;
    
    w.game = new $.Game({
      cview: cview,
      cworld: cworld
    });

    function pauseGame(){
      if (game.paused){
        game.mainModal.hide();
        game.play();
      }
      else {
        game.mainModal.show();
        game.stop(); 
      }
    }

    w.Controls.on('pause', pauseGame);
  }

  function onDocLoad(){

    w.Repository = new $.Repository();

    var loader = new $.Loader();

    var images = {
      "bg": "../images/bg.png",
      "front": "../images/front.png",

      "gun": "../images/gun.png",
      "targets": "../images/targets.png"
    };

    loader
      .initResources(
        images/*, 
        sounds*/
      )
      .on('error', function(err){
        window.console.log(err);
      })
      .on('report', function(prg){
        window.console.log('LOADING > ' + prg);
      })
      .on('complete', function(){
        //TODO: check to config before load images to show progress
        w.config = configGame();

        initGame();
        w.game.play();
      })
      .load();    
  }

  w.onload = onDocLoad;

}());