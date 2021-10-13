// ------------------------------------------------- Din kod här --------------------------------------------------------------
$(function() {
  $('#search').on('keypress', async(key) => {
    if (key.code === 'Enter') {
      let results = await search($('#search').val())
      renderResults(results)
      $('#search').val("")
    }
  })
})

async function search(searchString) {
  console.log("Getting: " + `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${searchString}&number=20&ranking=1&ignorePantry=true`)
  let response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${searchString}&number=20&ranking=1&ignorePantry=true`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "047fbdbcfamsh8cf1a4d307fe30cp19b828jsnd6e1d24f4c11",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  })
  let json = await response.json();
  console.log(response)
  return json;
}

function renderResults(results) {
  let list = $("#searchresults")
  if (list.children() && list.children().length > 0) {
    list.empty()
  }
  results.forEach((result) => {
    list.append(`
    <div class="col-2"><img src="${result.image}"/></div>
    <div class="col-10">${result.title}</div>
    `)
  })

}