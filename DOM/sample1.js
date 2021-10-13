var x = 3
var y = 7

var coordinateString = "(" + x + "," + y + ")"

var coordinateTemplateString = `(${x}, ${y})`

window.addEventListener("mousemove", function(ev) {
  var xy = "(" + ev.x + ", " + ev.y + ")"
  var rgb = toRGBString(ev.pageX, ev.pageY)
  document.getElementById("coordinates").style.backgroundColor = rgb

  document.getElementById("coordinates").innerHTML = "<p>Koordinat:" + xy + "<br/>" + rgb + "</p>"
})

function toRGBString(x, y) {
  var xPart = Math.floor((Number(x) / window.innerWidth) * 255)
  var yPart = Math.floor((Number(y) / window.innerHeight) * 255)
  return 'rgb(' + xPart + ',' + yPart + ',' + xPart + ')'
}

/*
  var hsl = toHSLString(ev.pageX, ev.pageY)
  document.getElementById("coordinates").style.backgroundColor = hsl

  document.getElementById("coordinates").innerHTML = "<p>" + xy + "<br/>" + hsl + "</p>"

  function toHSLString(x) {
  var xPart = Math.floor((Number(x) / window.innerWidth) * 255)
  return 'hsl(' + xPart + ',50%,50%)'
}
*/

/*

var rgb = toRGBString(ev.pageX, ev.pageY)
    document.getElementById("coordinates").style.backgroundColor = rgb

    document.getElementById("coordinates").innerHTML = "<p>" + xy + "<br/>" + rgb + "</p>"

function toRGBString(x, y) {
  var xPart = Math.floor((Number(x) / window.innerWidth) * 255)
  var yPart = Math.floor((Number(y) / window.innerHeight) * 255)
  return 'rgb(' + xPart + ',' + yPart + ',' + xPart + ')'
}

*/