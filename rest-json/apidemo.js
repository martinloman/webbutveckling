$(function() {
  $('#search').on('keypress', async(event) => {
    if (event.key === 'Enter') {

      let searchTerm = "" //skriv kod som hämtar värdet i sökfältet

      // Det här anropar funktionen för att hämta info från ett API
      let results = await search(searchTerm)

      renderResults(results)

      // Skriv kod för att tömma sökfältet igen
    }
  })
})

// Detta är en asyncron funktion som anropar ett API och returnerar svaret som ett JSON-objekt.
async function search(searchString) {
  // Använd funktionen fetch för att anropa ett API med rätt parametrar.
  /* 
    Om ni vill använder ni The Movie Database API.
    Det finns dokumentation här https://developers.themoviedb.org/3/getting-started/introduction
    Ni kan i så fall låna min API-nyckel.
    Då blir URLen `https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=1a08c634ec1bc9d64558c15c3e88cdbf`
    */

  var url = ``
  console.log(url)
  let response = await fetch(url)

  //Använd console.log för att skriva ut resultatet till konsollen och titta på det

  let json = await response.json(); // Detta gör om resultatet från APIet till ett JSON-objekt.
  return json;
}

/*
  Den här funktionen går igenom sökresultatet som är parametern "results"
  och skriver ut det i en lista i DOMen.
*/
function renderResults(res) {
  let list = $("#searchresults") //Hämtar ut diven med id="searchresults" för att lägga in resultatet där
    //Använd console.log för att se ur objektet res ser ut.
  console.log(res)

  let allObjects = [] //hämta ut rätt del av res och tilldela allObjects det värdet.
  allObjects.forEach((object) => {
    // lägg in en div i list för varje objekt
    // du kan använda t.ex. list.append("en sträng med html")
  })

}