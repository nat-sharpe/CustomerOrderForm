var orderForm = document.querySelector('.form');
var URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';
var orderList = [];


var postOrder = function (order) {
    $.ajax(URL, {
        method: 'POST',
        data: order,
        success: function () {
            printOrder(order);
        }
    });
};

var deleteOrder = function (order) {
    var emailAddress = order.emailAddress;
    $.ajax(`https://dc-coffeerun.herokuapp.com/api/coffeeorders/${emailAddress}`, {
        method: 'DELETE',
        data: order
    });
};

var getData = function () {
    $.ajax(URL, {
        success: function(coffeeOrders) {
            Object.values(coffeeOrders).forEach(function(order) {
                printOrder(order);
            });
            console.log(coffeeOrders)
        },
        error: function() {
            console.log('boom')
        }
    });
}

var printOrder = function (order) {
    var results = document.querySelector('.results')

    var currentOrder = document.createElement("ul");

    var drink = document.createElement("li");
    var email = document.createElement("li");
    var size = document.createElement("li");
    var shot = document.createElement("li");
    var caffeine = document.createElement("li");
    var completed = document.createElement("button");

    drink.textContent = order.coffee;
    email.textContent = order.emailAddress;
    size.textContent = order.size;
    shot.textContent = order.flavor;
    caffeine.textContent = order.strength;
    completed.textContent = 'Completed';

    currentOrder.appendChild(drink);
    currentOrder.appendChild(email);
    currentOrder.appendChild(size);
    currentOrder.appendChild(shot);
    currentOrder.appendChild(caffeine);
    currentOrder.appendChild(completed);

    console.log()
    results.appendChild(currentOrder);


    var removeOrder = function () {
        results.removeChild(currentOrder);
        deleteOrder(order);
    };

    completed.addEventListener('click', removeOrder);
};

// var populate = function () {
//     orderList.forEach(printOrder)
// };

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




