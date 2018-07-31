
var orderForm = document.querySelector('.form');
var allOrders = [];


var storeOrders = function () {
    localStorage.setItem('orders', JSON.stringify(allOrders));
    var oldOrders = JSON.parse(localStorage.getItem('orders'));
    console.log(oldOrders);

};



var printOrder = function (order) {
    var orderList = document.querySelector('.results')

    var currentOrder = document.createElement("ul");
    orderList.appendChild(currentOrder);

    var drink = document.createElement("li");
    var email = document.createElement("li");
    var size = document.createElement("li");
    var shot = document.createElement("li");
    var caffeine = document.createElement("li");
    var completed = document.createElement("button");

    currentOrder.appendChild(drink);
    drink.textContent = order['drink'];

    currentOrder.appendChild(email);
    email.textContent = order['email'];

    currentOrder.appendChild(size);
    size.textContent = order['size'];

    currentOrder.appendChild(shot);
    shot.textContent = order['shot'];

    currentOrder.appendChild(caffeine);
    caffeine.textContent = order['caffeine'];

    currentOrder.appendChild(completed);
    completed.textContent = 'Completed';

    var removeOrder = function () {
        orderList.removeChild(currentOrder);
    };

    completed.addEventListener('click', removeOrder);

};

orderForm.addEventListener('submit', function(event){
    event.preventDefault();
    
    var currentDrink = document.querySelector('[name="order"]');
    var currentEmail = document.querySelector('[name="email"]');
    var currentSize = document.querySelector('[name="size"]:checked');
    var currentShot = document.querySelector('[name="shots"]');
    var currentCaffeine = document.querySelector('[name="caffeine"]');

   var newOrder = {'drink': currentDrink.value,
    'email': currentEmail.value,
    'size': currentSize.value,
    'shot': currentShot.value,
    'caffeine': currentCaffeine.value
    };
   
    allOrders.push(newOrder);
    storeOrders();
    printOrder(newOrder);

});


