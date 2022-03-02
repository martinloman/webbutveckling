document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOMload")
  const title = document.getElementById("title")
  let searchParams = new URLSearchParams(window.location.search)

  console.log(searchParams.get("id"))

  let movie = await getMovieFromAPI(searchParams.get("id"))
  console.log(movie)
  renderMovie(movie)
})

function renderMovie(movie) {
  document.title = "Film: " + movie.title
  title.innerText = movie.title

  let hero = document.getElementsByClassName("hero")[0]
  hero.style.backgroundImage = `url(${
    API_BACKDROP_BASE_PATH + movie.backdrop_path
  })`

  let footer = document.getElementsByTagName("footer")[0]
  footer.style.backgroundImage = `url(${
    API_BACKDROP_BASE_PATH + movie.backdrop_path
  })`

  document.getElementById("synopsis").innerText = movie.overview

  genreStrings = ""
  movie.genres.forEach(function (genre) {
    genreStrings += genre.name + " "
  })

  document.getElementById("genres").innerText = genreStrings
  document.getElementById(
    "homepage"
  ).innerHTML = `<a href="${movie.homepage}">${movie.homepage}</a>`
}

const API_IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w154"
const API_BACKDROP_BASE_PATH = "https://image.tmdb.org/t/p/original"

async function getMovieFromAPI(id) {
  var url = `https://api.themoviedb.org/3/movie/${id}?api_key=1a08c634ec1bc9d64558c15c3e88cdbf`

  console.log("Getting: " + url)

  // Här gör anropet till APIet. Det svaret måste man vänta på med await.
  let response = await fetch(url)

  let json = await response.json()
  return json
}
