window.onload = function() {

  //hämta alla knappar med deras klassnamn, det blir en array av knappar
  let buttons = document.getElementsByClassName('remove-list-item')

  //loopa igenom arrayen med knappar
  for (let i = 0; i < buttons.length; i++) {

    // den aktuella knappen i loopen
    let button = buttons[i]

    //knyt en event listener till onclick
    button.onclick = function() {
      //fråga användaren
      let removeNode = confirm('Ta bort?')

      // ta bort om användaren svara ja (true)
      if (removeNode === true) {
        this.parentNode.remove()
      }
    }
  }
}