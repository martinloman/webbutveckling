// ------------------------------------------------- Din kod här --------------------------------------------------------------

const API_IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w154"
let movieSearch = document.getElementById("movieSearch")

movieSearch.onkeydown = async function (event) {
  console.log(event.key)
  if (event.key === "Enter") {
    event.preventDefault() // Detta hindrar Enter-tryckningen från att ladda om sidan.

    console.log("Söker efter::", movieSearch.value)

    let apiSearchResult = await doAPISearch(movieSearch.value)
    console.log("Resultat:", apiSearchResult)

    //Den här funktionen lägger in resultatet från APIet i sidan.
    renderResults(apiSearchResult.results)

    movieSearch.value = "" // Tömmer sökfältet inför nästa sökning
  }
}

/*
  Funktionen doAPISearch() är asynkron och gör ett anrop till ett API
  för att sedan returnera resultatet från APIet.
 */
async function doAPISearch(searchString) {
  var url = `https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=1a08c634ec1bc9d64558c15c3e88cdbf`

  console.log("Getting: " + url)

  // Här gör anropet till APIet. Det svaret måste man vänta på med await.
  let response = await fetch(url)

  let json = await response.json()
  return json
}

/*
  Funktionen renderResults() är ansvarig för att visa resultat på skärmen.
*/
function renderResults(results) {
  let resultDiv = document.getElementById("searchresults")

  //En if-sats som kollar om resultat-div:en har tidigare sökresultat i sig.
  if (resultDiv.children.length > 0) {
    resultDiv.innerHTML = "" //Detta tömmer resultat-div:en
  }

  //En loop som går igenom hela resultatet (en array med objekt)
  //och skapar en div för varje resultat som stoppas in i DOM.
  results.forEach((result) => {
    //Skapa en sträng med HTML som innehåller information om filmen.
    let movieCardHtml = `
    <div class="movie-card">
      <img src="${API_IMAGE_BASE_PATH + result.poster_path}"/>
      <div class="movie-text">
        <h3>${result.title}</h3>
        <p>${result.overview}</p>
        <p>
          <span><strong>Release:</strong> ${result.release_date}</span>
          <span><strong>Popularity:</strong> ${result.popularity}</span>
        </p>
        <p>
          <span><strong>Vote average:</strong> ${result.vote_average}</span>
          <span><strong>Votes:</strong> ${result.vote_count}</span>
        </p>
        <p class="right"><a href="#" class="read-more">Read more</a></p>
      </div>
    </div>
    `
    //Skapa element i DOMen från HTML.
    resultDiv.insertAdjacentHTML("beforeend", movieCardHtml)
  })
}
