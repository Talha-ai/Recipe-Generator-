const searchBox = document.querySelector('.search-box');
const search = document.getElementById('search_inp');
const searchBtn = document.getElementById("search_btn");

const mealSearch = document.querySelector('.meal-search');
const para = document.querySelector('.para');
const smol_para = document.querySelector('.smol-para');


const title = document.querySelector('.title');
const title2 = document.querySelector('.title2');

const meal = document.getElementById('meal-result'); //grid

const mealContent = document.querySelector('.meal-content'); //res

const recipeCloseBtn = document.getElementById('close-res-btn');


searchBox.addEventListener('click', function () {
  searchBox.classList.add('active');
});

search.addEventListener('blur', function () {
  searchBox.classList.remove('active');
});

search.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    meals();
  }
});

searchBtn.addEventListener('click', meals);

meal.addEventListener('click', getRecipeId);

mealContent.addEventListener('click', (e) => {
  if (e.target.classList.contains('bandh')) {
    mealContent.classList.remove('pop');
    document.body.classList.remove('popup-open');
    setTimeout(() => {
      mealContent.parentElement.classList.remove('showRecipe');
    }, 1000);
  }
});


const appId = '419d6d9e';
const apiKey = '4b61683e04ec5674d790bf5ed4876434';

async function meals() {
  mealSearch.classList.add('up');
  para.classList.add('hidden');
  smol_para.classList.add('hidden');
  title.classList.add('hidden');
  title2.classList.add('hidden');

  let input = document.getElementById("search_inp").value;
  const api = `https://api.edamam.com/search?q=${input}&to=12&app_id=${appId}&app_key=${apiKey}`

  // fetch(api)
  //   .then(response => response.json())
  //   .then(data => {
  // const res = await fetch(api);
  // const data = await res.json();

  const res = await axios.get(api)
  let html = "";
  if (res.data.hits.length) {
    title.classList.remove('hidden');
    res.data.hits.forEach(meal => {
      console.log(meal)
      html += `          
          <div class="meal py-10 h-full flex">
            <div class="meal-item flex flex-col rounded-xl overflow-hidden shadow-3xl">

              <div class="meal-img h-48">
                <img src="${meal.recipe.image}" alt="" class="food-img border-b-2">
              </div>

              <div class="meal-name  bg-[#F0EDD4] flex-1 flex flex-col justify-center">
                <h3 class="name text-center font-bold text-xl mb-2 px-6">${meal.recipe.label}</h3>
                <div class="grid grid-flow-col gap-5 pb-2 px-6">
                  <span class="cuisine-type rounded-full px-3 py-1 text-sm font-base mb-2 text-center">${meal.recipe.cuisineType}</span>
                  <span class=" dish-type rounded-full px-3 py-1 text-sm font-base mb-2 text-center">${meal.recipe.dishType}</span>
                </div>
                <a href="#" id="res-btn" data-id="${meal.recipe.uri.split('_')[1]}" class="recipe-btn flex justify-center mx-10 rounded-xl">Get recipe</a>
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
  // let food = document.querySelector('.food-img')
  // food.addEventListener('load', () => {
  //   // meal.classList.add('show-page');
  //   meal.innerHTML = html;

  // });

}

async function getRecipeId(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    let recipeId = e.target.getAttribute('data-id');
    let input = document.getElementById("search_inp").value;
    let api = `https://api.edamam.com/search?q=${input}&to=21&app_id=${appId}&app_key=${apiKey}`
    // fetch(api)
    //   .then(response => response.json())
    //   .then(data => {
    // const res = await fetch(api)
    // const data = await res.json();
    const res = await axios.get(api);
    // for (let i = 0; i < res.data.hits.length; i++) {
    //   if (res.data.hits[i].recipe.uri === "http://www.edamam.com/ontologies/edamam.owl#recipe_" + recipeId) {
    //     getRecipe(res.data.hits[i].recipe)
    //   }
    // }
    const recipe = res.data.hits.filter(hits => hits.recipe.uri === "http://www.edamam.com/ontologies/edamam.owl#recipe_" + recipeId);
    getRecipe(recipe[0].recipe);
  }
}

function getRecipe(meal) {
  let html = `
      <div class="wrupper">
      <button type="button" class="close-btn" id="close-res-btn">
      <i class="bandh fa-solid fa-xmark text-xl"></i>
    </button>
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
  `;

  mealContent.innerHTML = html;

  const img = mealContent.querySelector('.recipe-img-yum');
  // mealContent.classList.add('pop');

  img.addEventListener('load', () => {
    mealContent.parentElement.classList.add('showRecipe');
    document.body.classList.add('popup-open');
    setTimeout(() => {
      mealContent.classList.add('pop');
    }, 100);
  });


  let ingredientList = document.getElementById("ingredient-list");
  ingredientList.innerHTML = "";

  meal.ingredientLines.forEach(ingredient => {
    let li = document.createElement("li");
    li.textContent = ingredient;
    ingredientList.appendChild(li);
    let hr = document.createElement("hr");
    ingredientList.appendChild(hr);
  })
}


