function edamamQuery() {
  // fetch request gets a list of all the repos for the node.js organization
  var edamamUrl = "https://api.edamam.com/search?q=christmas&app_id=6896e3c1&app_key=810173b6ecf9f3abd5c456c48ec0a9cc";

  fetch(edamamUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.hits[0]);
    });
}

edamamQuery();