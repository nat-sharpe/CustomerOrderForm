var orderForm = document.querySelector('.form');
var urlAPI = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders/';
var orderList = [];


var postOrder = function (order) {
    printOrder(order);
    fetch(urlAPI, {
        method: 'post',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(order)
    });
};

var deleteOrder = function (order) {
    var emailAddress = order.emailAddress;
    fetch((urlAPI + emailAddress), {
        method: 'delete'
    });
};

var getData = function () {
    var coffeOrdersPromise = fetch(urlAPI);
    coffeOrdersPromise.then(function(response) {
        var toJSONPromise = response.json();
        toJSONPromise.then(function(allOrders) {
            Object.values(allOrders).forEach(function(order) {
                printOrder(order);
            });
        });
    });
};

var printOrder = function (order) {
    var results = document.querySelector('.results')
    var currentOrder = document.createElement("div");
    currentOrder.classList.add('new-order');

    var completed = document.createElement("button");
    var orderSheet = document.createElement("p");
    var orderSheet2 = document.createElement("p");
    orderSheet.textContent = `Customer ordered a ${order.size} ${order.coffee} with ${order.strength}mg of caffeine and a ${order.flavor} flavor shot.`
    orderSheet2.textContent = `Send receipt to ${order.emailAddress}.`
    completed.textContent = 'Completed';

    currentOrder.appendChild(orderSheet);
    currentOrder.appendChild(orderSheet2);
    currentOrder.appendChild(completed);

    results.appendChild(currentOrder);

    var removeOrder = function () {
        currentOrder.classList.add('green');
        setTimeout(function () {results.removeChild(currentOrder)}, 2000);
        deleteOrder(order);
    };

    completed.addEventListener('click', removeOrder);
};


var submit = function (event) {
    event.preventDefault();
    var coffee = document.querySelector('[name="order"]');
    var emailAddress = document.querySelector('[name="email"]');
    var size = document.querySelector('[name="size"]:checked');
    var flavor = document.querySelector('[name="shots"]');
    var strength = document.querySelector('[name="caffeine"]');
    var newOrder = {
        'coffee': coffee.value,
        'emailAddress': emailAddress.value,
        'size': size.value,
        'flavor': flavor.value,
        'strength': strength.value
    };
    orderList.push(newOrder);
    postOrder(newOrder);
};

orderForm.addEventListener('submit', submit);

getData();