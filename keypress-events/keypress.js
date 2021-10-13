/* 
  Objektet keys har en egenskap för varje piltangent.
  Egenskapen kommer vara true om knappen är nedtryckt.
  Egenskapen kommer bli false igen när knappen släpps upp.
*/
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

/*
  Den här eventlyssnaren sätter värdet egenskaper i keys-objektet till true
  om knappen trycks ned.
*/
document.addEventListener('keydown', (event) => {
  if (event.key == 'ArrowUp' ||
    event.key == 'ArrowDown' ||
    event.key == 'ArrowLeft' ||
    event.key == 'ArrowRight'
  ) {
    keys[event.key] = true
      //console.log(keys)
    draw()
  }
})

/*
  Den här eventlyssnaren sätter värdet egenskaper i keys-objektet till false
  om knappen släpps upp.
*/
document.addEventListener('keyup', (event) => {
  if (event.key == 'ArrowUp' ||
    event.key == 'ArrowDown' ||
    event.key == 'ArrowLeft' ||
    event.key == 'ArrowRight'
  ) {
    keys[event.key] = false
      //console.log(keys)
    draw()
  }
})

let x = 100,
  y = 100,
  dx = 10,
  dy = 10

draw = () => {
  //Beräknar nya koordinater beroende på värden i keys
  if (keys.ArrowRight) {
    x += dx
  }
  if (keys.ArrowLeft) {
    x -= dx
  }
  if (keys.ArrowDown) {
    y += dy
  }
  if (keys.ArrowUp) {
    y -= dy
  }

  //TODO: Rita ut objektet på nya positionen
  console.log("x=" + x, "y=" + y)
}