$(document).ready(function() {

// getting jquery references for inputs
var spendingAmount = $("#dollars");
var spendingCategory = $("#category");
var spendingForm = $("#spending");

// event listener for when form is submitted
$(spendingForm).on("submit", handleFormSubmit);

// A function for handling what happens when the form to create a new post is submitted
function handleFormSubmit(event) {
    event.preventDefault();

    // get user id to attach to purchase object
    var userID;
    $.get("/api/user", function(userObj) {
        console.log("user object i'm hoping to pull: " + userObj);
        userID = userObj.id;
    });

    // Wont submit the purchase if we are missing an amount or category
    if (!spendingAmount.val().trim() || !spendingCategory.val().trim()) {
        console.log("spendingAmount input: " + spendingAmount.val().trim());
        console.log("spendingCategory input: " + spendingCategory.val().trim());
        console.log("an amount and/or category was not provided");
        return;
    }
    // Constructing a newPurchase object to hand to the database
    var newPurchase = {
      amount: spendingAmount
        .val()
        .trim(),
      category: spendingCategory
        .val()
        .trim(),
      UserId: userID
    };

    // clear input fields after submission and inputs have been used
    $("#dollars").val("");
    $("#category").val("");


    submitPurchase(newPurchase);
    
}



// Submits a new purchase
function submitPurchase(purchase) {
    $.post("/api/spending", purchase);
    console.log(purchase);
}


// getting user id to attach to spending post
// function getUserId() {
//     $.get("/api/user", function(userObj) {
//         userID = userObj.id;
//     });
// }

}); //end of docready