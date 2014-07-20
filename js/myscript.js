var on_input_change = function(loan, percent, revenue){ 
  var months = (loan / ((revenue * percent) / (1200))).toFixed(0); //Calculate the months for the loan, then rounds to the nearest whole number
  months = Math.max(1, months); //Don't ever display 0 months
  var monthly = (loan / months).toFixed(0); //Calculate monthly rate BASED ON PREVIOS CALCULATION FOR MONTHS
  monthly = Math.min(monthly, loan); //This should be unnecessary, but makes sure that the displayed monthly rate isn't greater than the total loan
  if ((!isNaN(months))&&(!isNaN(monthly))){ //If those are both numbers (which they will be when all fields have been filled out
    $("#monthsToComplete").text(months); //Write the values to the screen
    $("#perMonth").text(monthly);
  }
};

$("input").on("change", function(){
  on_input_change(parseInt($("#inputBorrow").val().replace(/,/g, "")), 
                  $("#slider").slider("value"), 
                  parseInt($("#inputRevenue").val().replace(/,/g, "")));
});

$(function () {
  $("#slider").slider({
    value: 2.5,
    min: .5,
    max: 20,
    step: .5,
    slide: function (event, ui) {
      $( "#percent" ).text( ui.value + "%"); //Prints the percentage
      on_input_change(parseInt($("#inputBorrow").val().replace(/,/g, "")),
                      ui.value,
                      parseInt($("#inputRevenue").val().replace(/,/g, "")));
    }
  }); //sets up the slider
  $( "#percent" ).text( "" + $("#slider" ).slider("value") + "%");  //prints the initial percent
});
