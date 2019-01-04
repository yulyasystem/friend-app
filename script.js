const API_URL = 'https://randomuser.me/api/?results=25';
let users = [];
let container = document.querySelector('.container');
let sortSpan = document.querySelector('.sort');
let filter = document.querySelector('.filter');
let div = document.createElement('div');
let isSorted = false;
let copy;

fetch(API_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        users = json.results;
        console.log(copy);
        render(users);
    })
    .catch(alert);

function createCards(data) {
    div.className = "grid";
    data.forEach((item) => {
        div.innerHTML += `<div class="user-card">
                <img src="${item.picture.large}" class="thumbnail">
                <div class="profile">
                    <p class="name">${item.name.first}  ${item.name.last}</p>
                    <p class = "text"><b>Gender:</b> ${item.gender} age: ${item.dob.age}</p>
                    <p class = "text"><b>Email:</b> ${item.email} </p>
                    <p class = "text"><b>Phone:</b> ${item.phone}</p>
                </div>

            </div>`;
    });
    container.appendChild(div);
}

function sortByAge(data) {
    console.log(isSorted,"click");
    let grid = document.querySelector('.grid');
    let sortedByAge = data.sort((a, b) => {
        return a.dob.age - b.dob.age;
    }).slice();
    let sortedByAgeDown = data.sort((a, b) => {
        return b.dob.age - a.dob.age;
    }).slice();
    console.log(sortedByAge,sortedByAgeDown);
    console.log(sortedByAge===sortedByAgeDown);
    if (isSorted) {
        console.log(isSorted);
        grid.innerHTML = "";
        createCards(sortedByAgeDown);
        isSorted = false;
    } else{
        console.log(isSorted,"else");
        grid.innerHTML = "";
        createCards(sortedByAge);
        isSorted = true;
    }


}

function sortByName(data) {
    let grid = document.querySelector('.grid');
    let sortedByName = data.sort((a, b) => {
        if (a.name.first < b.name.first) return -1;
        if (a.name.first > b.name.first) return 1;
        return 0;
    });
    grid.innerHTML = "";
    createCards(sortedByName);

}

function render(data) {
    createCards(data);

    sortSpan.addEventListener('click', () => sortByAge(data));
    filter.addEventListener('click', () => sortByName(data));



}