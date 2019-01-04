const API_URL = 'https://randomuser.me/api/?results=25';
let users = [];
let container = document.querySelector('.container');
let sortSpan = document.querySelector('.sort');

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
    let div = document.createElement('div');
    div.className = "grid";
    data.forEach((item) => {
        console.log(item);
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
function sortCards(data) {
    let div = document.querySelector('.grid');
    let sortedByAge = data.sort((a, b) => {
        return a.dob.age - b.dob.age;
    });
    sortSpan.addEventListener('click', () => {
        div.innerHTML = "";
        createCards(sortedByAge);

    });

}



function render(data) {
    createCards(data);
    sortCards(data);
    console.log(users[0].name.title);

}


