const searchBtn = document.getElementById("search_btn")
const meal = document.getElementById('meal-result');
const title = document.querySelector('.title');
const title2 = document.querySelector('.title2');
const mealDetailsContent = document.querySelector('.meal-content');
const recipeCloseBtn = document.getElementById('close-res-btn');

meal.addEventListener('click', getRecipeId);

recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
  document.body.classList.remove('popup-open');
});

searchBtn.addEventListener('click', meals);

const appId = '419d6d9e';
const apiKey = '4b61683e04ec5674d790bf5ed4876434';
// const apiKey = 'fd05bdfa7db4484bbadf73c642c58544';

function meals() {
  title.classList.add('hidden');
  title2.classList.add('hidden');
  let input = document.getElementById("search_inp").value.trim();
  const api = `https://api.edamam.com/search?q=${input}&to=12&app_id=${appId}&app_key=${apiKey}`
  // const api = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${input}`
  const pro = fetch(api)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if (data.hits.length) {
        title.classList.remove('hidden');
        data.hits.forEach(meal => {
          console.log(meal)
          html += `          
          <div class="meal py-10 h-full flex">
          <div class="meal-item flex flex-col rounded-xl overflow-hidden shadow-3xl">
            <div class="meal-img h-48">
              <img src="${meal.recipe.image}" alt="" class="food-img border-b-2">
            </div>

            <div class="meal-name bg-white flex-1 flex flex-col justify-center">
              <h3 class="name text-center font-bold text-xl mb-2 px-6">${meal.recipe.label}</h3>
              <div class="grid grid-flow-col gap-5 pb-2 px-6">
                <span
                  class="cuisine-type bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2 text-center">#${meal.recipe.cuisineType}</span>
                <span class=" dish-type bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2 text-center">#${meal.recipe.dishType}</span>
              </div>
              <a href="#" id="" data-id=${meal.recipe.uri.split('_')[1]} class="recipe-btn flex justify-center bg-yellow-200 mx-10 rounded-xl">Get recipe</a>
            </div>
          </div>
        </div>
                  `
        })
      }
      else {
        title2.classList.remove('hidden');
      }
      meal.innerHTML = html;
    })
}

function getRecipeId(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    let recipeId = e.target.getAttribute('data-id');
    console.log(recipeId);
    let input = document.getElementById("search_inp").value;
    let api = `https://api.edamam.com/search?q=${input}&to=21&app_id=${appId}&app_key=${apiKey}`
    let pro = fetch(api)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.hits.length; i++) {
          if (data.hits[i].recipe.uri === "http://www.edamam.com/ontologies/edamam.owl#recipe_" + recipeId) {
            console.log("http://www.edamam.com/ontologies/edamam.owl#recipe_" + recipeId)
            getMealRecipe(data.hits[i].recipe)
          }
        }
      })
  }
}

function getMealRecipe(meal) {
  let html = `
    <div class="wrupper">
        <div class="meal-wrapper flex justify-around">

          <div class="recipe-meal-img">
            <img src="${meal.image}" alt="" class=" recipe-img-yum rounded-xl overflow-hidden mt-5 shadow-3xl">
            <div class="recipe-link">
            <a href="${meal.url}" target="_blank" class="res flex justify-center mt-10 text-lg bg-gray-300 rounded-full mx-auto py-1">View Full Recipe <i class="fa-solid fa-arrow-up-right-from-square my-auto pl-2"></i></a>
          </div>
          </div>

          <div class="meal-ingredients w-96">
            <h2 class="recipe-title font-bold text-4xl text-center">${meal.label}</h2>
            <div class="recipe-instruct w-full mx-auto">
              <h3 class="text-lg text-gray-500 font-semibold mt-5">Ingredients:</h3><hr>
              <div class="lala"> <ul id="ingredient-list" class="text-gray-700"></ul></div>
            </div>
          </div>

        </div>



      </div>
       
</div>
</div>
  `;

  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
  //scol stop
  document.body.classList.add('popup-open');


  let ingredientList = document.getElementById("ingredient-list");
  ingredientList.innerHTML = "";

  meal.ingredientLines.forEach(ingredient => {
    let li = document.createElement("li");
    li.textContent = ingredient;
    ingredientList.appendChild(li);
    let hr = document.createElement("hr");
    ingredientList.appendChild(hr);
  });
}

