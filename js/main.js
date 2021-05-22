// AOS Instance
AOS.init();

// Variables
const searchForm = document.querySelector('form');
let contentSection = document.getElementsByTagName('section')[1];
let searchResultDiv = document.querySelector('.search-result');
let container = document.querySelector('.showcase .container');
let searchQuery = '';
const APP_ID = 'ef4c255e';
const APP_KEY = '74812718514a53e6b5bfb8df7b147fff';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI () {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=21`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    // console.log(data);
}

function generateHTML(results) {
    contentSection.classList.add('content');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet label: ${(result.recipe.dietLabels.length > 0) ? result.recipe.dietLabels: 'N/A'}</p>
            <p class="item-data">Health label: ${result.recipe.healthLabels.slice(0, 10).join(', ')}</p>
        </div>
        `
    })
    let sectionHTML = (results.length > 0) ?
    `
    <div class="container">
        <h1 class="query">${searchQuery.toUpperCase()}</h1>
        <div class="search-result">
        ${generatedHTML}
        </div>
    </div>
    `: "<h1 class='no-result' data-aos='fade-up' data-aos-duration='1000'>Sorry, we couldn't find any result that matched your search</h1>"
    contentSection.innerHTML = sectionHTML;
}
