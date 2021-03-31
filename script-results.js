function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl =
    "https://api.edamam.com/search?q=christmas&app_id=6896e3c1&app_key=810173b6ecf9f3abd5c456c48ec0a9cc";

  fetch(
    requestUrl
   
    
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.hits);
    });
}
getApi();
