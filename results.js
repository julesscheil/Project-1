var recipeCardsEl = document.getElementById("recipe-cards");

// TODO: Use page URL to retrieve the holiday search term string
var holiday = "christmas";
var edamamUrl = "https://api.edamam.com/search?q=" + holiday + "&app_id=6896e3c1&app_key=810173b6ecf9f3abd5c456c48ec0a9cc";

// Query the Edamam API for recipes matching the holiday
function edamamQuery() {
  fetch(edamamUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.hits[0]);

      // Display the 10 recipes returned by the API
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
        recipeSection.classList = "m-3"
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
      };
    });
};

edamamQuery();