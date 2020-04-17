/**
 *
 * Search by Name
 * https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
 *
 * Lookup a single random meal
 * https://www.themealdb.com/api/json/v1/1/random.php
 *
 * Full meal details by ID
 * https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
 *
 */

// UI Variables
const search = document.getElementById("search"),
  random = document.getElementById("random"),
  submit = document.getElementById("submit"),
  alert = document.getElementById("alert"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  singleMeal = document.getElementById("single-meal");

// Search Meal Function & Fetch from API
function searchMeal(e) {
  // Fetch the meals
  // Loop through
  // Output
  e.preventDefault();

  // Clear single meal
  singleMeal.innerHTML = "";

  // Get search term
  const term = search.value;

  // Check for empty input
  if (term.trim()) {
    alert.innerHTML = "";
    mealsEl.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for ${term.toUpperCase()}:</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h3>There are no search results. Try again</h3>`;
          mealsEl.innerHTML = "";
          alert.innerHTML = "";
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `
            )
            // map() loops through an array
            // join() displays as a string
            .join("");
        }
        // Clear search input text
        search.value = "";
      });
  } else {
    alert.innerHTML = "Please enter a meal";
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch a random meal
function getRandomMeal() {
  // Clear meals & heading
  meals.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  // Put ingredients into an array
  for (let i = 1; i <= 20; i++) {
    // Check if there is an ingredient
    if (meal[`strIngredient${i}`]) {
      // Push on = ingredient - measurement
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // If no more ingredients
      break;
    }
  }

  singleMeal.innerHTML = `
  <div class="single-meal">
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
  </div>`;
}

// Search event
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    // Check if there is a class inside
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  // Check for meal info
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
