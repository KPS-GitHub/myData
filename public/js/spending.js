$(document).ready(function() {

// getting jquery references
var spendingAmount = $("#dollars");
var spendingCategory = $("#category");
var spendingForm = $("#spending");

// event listener for when form is submitted
$(spendingForm).on("submit", handleFormSubmit);

// A function for handling what happens when the form to create a new post is submitted
function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the purchase if we are missing an amount or category
    if (!spendingAmount.val().trim() || !spendingCategory.val().trim()) {
      return;
    }
    // Constructing a newPurchase object to hand to the database
    var newPurchase = {
      amount: spendingAmount
        .val()
        .trim(),
      category: spendingCategory
        .val()
        .trim()
    };


    submitPurchase(newPurchase);
    
}

// Submits a new purchase
function submitPurchase(purchase) {
    $.post("/api/spending", purchase);
}


}); //end of docready