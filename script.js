const API_URL = 'https://randomuser.me/api/?results=25';
let users = [];
let container = document.querySelector('.container');
let sortSpan = document.querySelector('.sort');
let filter = document.querySelector('.filter');
let div = document.createElement('div');


fetch(API_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        users = json.results;
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
    console.log("click");
    let grid = document.querySelector('.grid');
    let sortedByAge = data.sort((a, b) => {
        return a.dob.age - b.dob.age;
    });
    grid.innerHTML = "";
    createCards(sortedByAge);

}

function sortByName(data) {
    console.log("click");

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