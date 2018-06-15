$(document).ready(function() {


// logout button
$("#logout").on("click", function() {
    $.get("/logout");
});

// THIS SECTION LOADS THE CUURENT DATA SET AND DISPLAYS IT IN THE TABLE THAT IS HARD-CODED IN THE HTML FILE

var userID;
var userPurchasesArray = [];


function tableData() {
$.get("/api/user").then(function(userObj) {
    var userID = JSON.parse(JSON.stringify(userObj)).id;
    getUserSpending(userID);
});

    function getUserSpending(userID) {
        console.log("userID: " + userID);
        $.get("/api/spending/UserId/" + userID).then(function(data) {
            console.log("current user's spending data: ", data);
            for (var i = 0; i < data.length; i++) {
                var purchaseObject = {"amount": data[i].amount};
                userPurchasesArray.push(purchaseObject);
            }
            var j = 1;
            for (var i = data.length; i > -1; i--) {
                $("#amount" + j).text("$" + data[i-1].amount);
                $("#category" + j).text(data[i-1].category);
                $("#date" + j).text(data[i-1].createdAt);
                j++;
            }
        });
    }
}

tableData();

console.log(userPurchasesArray);
// use the userPurchasesArray, that is now full of all of the purchase amounts, to make a graph via vis package
var container = document.getElementById('spendingGraphic');
var data = [
  {id: 1, content: 'item 1', start: '2013-04-20'},
  {id: 2, content: 'item 2', start: '2013-04-14'},
  {id: 3, content: 'item 3', start: '2013-04-18'},
  {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
  {id: 5, content: 'item 5', start: '2013-04-25'},
  {id: 6, content: 'item 6', start: '2013-04-27'}
];
var options = {};
var timeline = new vis.Timeline(container, data, options);

// ALL CODE BELOW HANDLES SUBMITTING A NEW DATA ENTRY

// getting jquery references for inputs
var spendingAmount = $("#dollars");
var spendingCategory = $("#category");
var spendingForm = $("#spending");

// event listener for when form is submitted
$(spendingForm).on("submit", handleFormSubmit);

// A function for handling what happens when the form to create a new post is submitted
function handleFormSubmit(event) {
    event.preventDefault();


    $.get("/api/user").then(function(userObj) {
        // get user id to attach to purchase object
        var userID;
        var newPurchase;
        userID = JSON.parse(JSON.stringify(userObj)).id;
        // Constructing a newPurchase object to hand to the database
        newPurchase = {
        amount: spendingAmount
            .val()
            .trim(),
        category: spendingCategory
            .val()
            .trim(),
        UserId: userID
        };

        // Wont submit the purchase if we are missing an amount or category
        if (!spendingAmount.val().trim() || !spendingCategory.val().trim()) {
            console.log("spendingAmount input: " + spendingAmount.val().trim());
            console.log("spendingCategory input: " + spendingCategory.val().trim());
            console.log("an amount and/or category was not provided");
            return;
        }

        submitPurchase(newPurchase);

        // clear input fields after submission and inputs have been used
        $("#dollars").val("");
        $("#category").val("");
    });
    
}


// Submits a new purchase
function submitPurchase(purchase) {
    $.post("/api/spending", purchase).then(function() {
        location.reload();
    });
}







}); //end of docready