var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
ctx.lineCap = "round";
var coordonne = [];

var outils = "";

var pinc = false;
var sgmt = false;
var gomme = false;
var rect = false;
var rectfill = false;
var tabl = [];

//Trait libre
$("#pinceau").click(function () {
  outils = "pinceau";
  pinc = false;
  sgmt = false;
  gomme = false;
  rect = false;
  rectfill = false;


  $(canvas).mousedown(function (e) {
    pinc = true;
    ctx.beginPath();
    ctx.strokeStyle = document.getElementById("color").value;
    ctx.lineWidth = document.getElementById("size").value;

    $(canvas).mousemove(function (e) {
      if (pinc === true && outils === "pinceau") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

      $(canvas).mouseup(function (e) {
        ctx.closePath();
        pinc = false;
        if (coordonne[4]) {
          coordonne = [];
        }
      });
    });
  });
});

//Ligne
$("#ligne").click(function () {
  outils = "ligne";
  pinc = false;
  sgmt = false;
  gomme = false;
  rect = false;
  rectfill = false;


  $(canvas).click(function (e) {
    ctx.strokeStyle = document.getElementById("color").value;
    ctx.lineWidth = document.getElementById("size").value;
    coordonne.push(e.offsetX, e.offsetY);

    canvas.onmousedown = function (e) {
      sgmt = true;

      if (sgmt === true && outils === "ligne") {
        ctx.beginPath();

        coordonne.push(e.offsetX, e.offsetY);
        ctx.moveTo(coordonne[0], coordonne[1]);
        ctx.lineTo(coordonne[2], coordonne[3]);
        ctx.stroke();
        ctx.closePath();
      }

      canvas.onmouseup = function (e) {
        sgmt = false;
        if (coordonne[4]) {
          coordonne = [];
        }
      };
    };
  });
});

//Gomme
$("#gomme").click(function () {
  outils = "gomme";
  pinc = false;
  sgmt = false;
  gomme = false;
  rect = false;
  rectfill = false;

  $(canvas).mousedown(function (e) {
    gomme = true;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = document.getElementById("size").value;

    $(canvas).mousemove(function (e) {
      if (gomme === true && outils === "gomme") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

      $(canvas).mouseup(function (e) {
        ctx.closePath();
        gomme = false;
      });
    });
  });
});

//Rectangle
$("#rectangle").click(function () {
  outils = "rectangle";
  pinc = false;
  sgmt = false;
  gomme = false;
  rect = false;
  rectfill = false;


  $(canvas).click(function (e) {
    rect = true;

    if (tabl[4]) {
      tabl = [];
    }

    tabl.push(e.pageX, e.pageY);
    ctx.strokeStyle = document.getElementById("color").value;
    ctx.lineWidth = document.getElementById("size").value;

    canvas.onmousedown = function (e) {
      if (rect === true && outils === "rectangle") {
        ctx.beginPath();
        tabl.push(e.pageX, e.pageY);
        ctx.rect(tabl[0] - canvas.offsetLeft, tabl[1] - canvas.offsetTop, tabl[2] - tabl[0], tabl[3] - tabl[1]);
        ctx.stroke();
        ctx.closePath();
      }

      canvas.onmouseup = function (e) {
        rect = false;
      };
    };
  });
});

//Rectangle rempli
$("#rectanglerempli").click(function () {
  outils = "rectanglerempli";
  pinc = false;
  sgmt = false;
  gomme = false;
  rect = false;
  rectfill = false;


  $(canvas).click(function (e) {
    rectfill = true;

    if (tabl[4]) {
      tabl = [];
    }

    tabl.push(e.pageX, e.pageY);
    ctx.fillStyle = document.getElementById("color").value;
    ctx.lineWidth = document.getElementById("size").value;

    canvas.onmousedown = function (e) {
      if (rectfill === true && outils === "rectanglerempli") {
        ctx.beginPath();
        tabl.push(e.pageX, e.pageY);
        ctx.rect(tabl[0] - canvas.offsetLeft, tabl[1] - canvas.offsetTop, tabl[2] - tabl[0], tabl[3] - tabl[1]);
        ctx.fill();
        ctx.closePath();
      }

      canvas.onmouseup = function (e) {
        rectfill = false;
      };
    };
  });
});

//Nettoyer la toile
$("#clear").click(function () {
  location.reload();
});
