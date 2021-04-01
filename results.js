var recipeCardsEl = document.getElementById("recipe-cards");
var savedRecipeEl = document.getElementById("saved-recipes");

// Use page URL to retrieve the holiday search term string
var queryString = document.location.search;
var holiday = queryString.split("=")[1];
var edamamUrl = "https://api.edamam.com/search?q=" + holiday + "&app_id=6896e3c1&app_key=810173b6ecf9f3abd5c456c48ec0a9cc";
var savedRecipes = localStorage.getItem("savedRecipes") || [];

// Create function to store previously searched holidays to local storage CHANGE TO ARRAY
function saveRecipe (event) {
  var savedRecipe = {
    name: event.target.getAttribute("data-label"),
    link: event.target.getAttribute("data-url")
  };
  savedRecipes.push(savedRecipe);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
};

// Create function to load previously searched holidays from local storage CONVERT TO ARRAY
function getRecipes () {
  var oldRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
  if (oldRecipes !== null) {
    for (var i = 0; i < oldRecipes.length; i++) {
      var oldRecipe = document.createElement("a");
      oldRecipe.textContent = oldRecipes[i].name;
      oldRecipe.setAttribute("href", oldRecipes[i].link);
      oldRecipe.setAttribute("target", "_blank");
      oldRecipe.classList = "btn-light";
      savedRecipeEl.appendChild(oldRecipe);
    };
  };
};

// Query the Edamam API for recipes matching the holiday
function edamamQuery() {
  fetch(edamamUrl).then(function (response) {
    response.json().then(function (data) {
      // If results are returned, display results
      if (data.hits.length > 0) {
        // Display up to 30 recipes returned by the API
        for (var i=0; i < data.hits.length; i++) {
          // Create a recipe card for each recipe
          var cardEl = document.createElement("div");
          cardEl.classList = "card p-3 m-2 d-flex flex-row";
          recipeCardsEl.appendChild(cardEl);

          // Display recipe image to the left or recipe
          var recipeImg = document.createElement("img");
          recipeImg.setAttribute("src", data.hits[i].recipe.image);
          recipeImg.classList = "card-thumbnail";
          cardEl.appendChild(recipeImg);

          // Display the recipe name
          var recipeSection = document.createElement("div");
          recipeSection.classList = "m-3 d-flex flex-column w-100"
          cardEl.appendChild(recipeSection);
          var recipeName = document.createElement("h3");
          recipeName.textContent = data.hits[i].recipe.label;
          recipeName.classList = "card-title";
          recipeSection.appendChild(recipeName);

          // Create ingredient list and display the first three ingredients
          var ingredientList = document.createElement("ul");
          ingredientList.classList = "card-text";
          recipeSection.appendChild(ingredientList);
          var ingredient1 = document.createElement("li");
          ingredient1.textContent = data.hits[i].recipe.ingredientLines[0];
          ingredientList.appendChild(ingredient1);
          var ingredient2 = document.createElement("li");
          ingredient2.textContent = data.hits[i].recipe.ingredientLines[1];
          ingredientList.appendChild(ingredient2);
          var ingredient3 = document.createElement("li");
          ingredient3.textContent = data.hits[i].recipe.ingredientLines[2];
          ingredientList.appendChild(ingredient3);
          var ingredient4 = document.createElement("li");
          ingredient4.textContent = "...";
          ingredientList.appendChild(ingredient4);

          // Display recipe link and open in a new tab
          var recipeLink = document.createElement("a");
          recipeLink.setAttribute("target", "_blank");
          recipeLink.setAttribute("href", data.hits[i].recipe.url)
          recipeLink.textContent = "Source: " + data.hits[i].recipe.source;
          recipeLink.classList = "card-link";
          recipeSection.appendChild(recipeLink);

          // Create button to bookmark this recipe
          var saveBtn = document.createElement("button");
          saveBtn.textContent = "Bookmark Recipe";
          saveBtn.classList = "btn-lg mt-3 w-50"
          saveBtn.setAttribute("data-label", data.hits[i].recipe.label);
          saveBtn.setAttribute("data-url", data.hits[i].recipe.url);
          recipeSection.appendChild(saveBtn);
        };
      } else {
          // 
          var noResults = document.createElement("h3");
          noResults.textContent = "Your search did not return any results. Please return to the homepage and select a different holiday.";
          noResults.classList = "p-3 text-light";
          recipeCardsEl.appendChild(noResults);
      };
    });
  });
};

// Add event listener for button click to save a recipe
recipeCardsEl.addEventListener("click", saveRecipe)

// Run query and display saved recipes from local storage
edamamQuery();
getRecipes();