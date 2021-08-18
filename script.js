const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";

const appId = "cf85c200";
const appKey = "3d656473b28a1ed5a7ccdb8042ff07a9";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});
async function fetchAPI() {
  const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&to=100`;
  const response = await fetch(baseUrl);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `<div class="item">
            <img src="${result.recipe.image}"" />
            <div class="flex-cotainer">
              <h1 class="title">${result.recipe.label}</h1>
              <a class="view-button" href="${
                result.recipe.url
              }"target="_blank">view recipe</a>
            </div>
            <p class="item-data">Calories:${result.recipe.calories.toFixed(
              2
            )}</p>
            <p class="item-data">Health label:${result.recipe.healthLabels}</p>
          </div>
        `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
