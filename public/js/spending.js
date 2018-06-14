// var dataVis = require("simple-data-vis");

$(document).ready(function() {

// THIS SECTION LOADS THE CUURENT DATA SET AND DISPLAYS IT
var userID;
$.get("/api/user").then(function(userObj) {
    var userID = JSON.parse(JSON.stringify(userObj)).id;
    getUserSpending(userID);
});

function getUserSpending(userID) {
    console.log("userID: " + userID);
    $.get("/api/spending/UserId/" + userID).then(function(data) {
        console.log("current user's spending data: ", data);
        for (var i = 0; i < 5; i++) {
            $("#amount" + (i+1)).text(data[i].amount);
            $("#category" + (i+1)).text(data[i].category);
            $("#date" + (i+1)).text(data[i].createdAt);
        }
    });
}


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

    // // get user id to attach to purchase object
    // var userID;
    // $.get("/api/user", function(userObj) {
    //     console.log("user object i'm hoping to pull: " + JSON.stringify(userObj));
    //     userID = JSON.parse(JSON.stringify(userObj)).id;
    //     console.log("userID: " + userID);
    //     // userID is correct here, but never makes it to the newPurchase object
    // });


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
    $.post("/api/spending", purchase);
}


}); //end of docready