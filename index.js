"use strict";

const auth = {
  client_id: "e8033d42aa30bb30901d",
  client_secret: "0472f82c2196c408ab6a7541a2d5d5f461dcc29a"
};

function getSearchValue() {
  let text = $("#js-search-term").val();
  return text;
}

// need to add parameters object on how to sort returned data

function getUserRepo() {
  fetch(`https://api.github.com/users/${getSearchValue()}`, auth)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`${err.message}`);
    });
}

function displayResults(responseJson) {
  $("#results-list").html("");
  $("#results-list").append(
    `<li>Username: ${responseJson.login} <ul><li>Visit: <a href="${
      responseJson.html_url
    }"> ${responseJson.repos_url}</a></li></ul></li>`
  );
  $("#js-error-message").empty();
  $("#js-search-term").val("");
  $("#results").removeClass("hidden");
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    getUserRepo();
  });
}

$(function() {
  console.log("App is working");
  watchForm();
});
