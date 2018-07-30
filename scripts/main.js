var formBox = document.querySelector('.form');
var results = document.querySelector('.results')

var order = document.querySelector('[name="order"]');
var email = document.querySelector('[name="email"]');
var size = document.querySelector('[name="size"]:checked');
var shots = document.querySelector('[name="shots"]');
var caffeine = document.querySelector('[name="caffeine"]');


formBox.addEventListener('submit', function(clickedSubmit){
    clickedSubmit.preventDefault();

    var row1 = document.createElement("li");
    results.appendChild(row1);
    row1.textContent = order.value;

    var row2 = document.createElement("li");
    results.appendChild(row2);
    row2.textContent = email.value;

    var row3 = document.createElement("li");
    results.appendChild(row3);
    size.setAttribute("checked");
    console.log(size.value)
    row3.textContent = size.value;

    var row4 = document.createElement("li");
    results.appendChild(row4);
    row3.textContent = shots.value;

    var row5 = document.createElement("li");
    results.appendChild(row5);
    row3.textContent = caffeine.value;
})