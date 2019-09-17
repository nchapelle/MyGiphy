list= ["nene leakes", "cats", "big anime tiddies"];
searchTerm = "";
queryURL = "";
//animate machine

$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

// button generator machine
function renderGif(list) {
  $("#buttons").empty(); // empties out the html

  // render our todos to the page
  for (var i = 0; i < list.length; i++) {
    // Create a new variable that will hold a "<p>" tag.
    // Then set the to-do "value" as text to this <p> element.
    var gifText = $("<button>");
    gifText.attr("data-searchterm", list[i])
    gifText.addClass("clickable")
    gifText.text(list[i]);
    // Add the button and to do item to the to-dos div
    $("#buttons").append(gifText);
  }
  $(".clickable").on("click", function (){
    console.log("it clicks")
  
    
  });


}


// input box -- boilerplate
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  var searchTerm = $("#search-term").val();
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KdRKs6fHYc9MuNvHE3xycHidCnR883t7&q=" + searchTerm + "&limit=5&offset=0&rating=R&lang=en"

  

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (response) {
      console.log(response);
      for (var i=0; i<5; i++){
      gifSelector= $("<img>")
      $(gifSelector).attr("src", response.data[i].images.original.url)
      $("#jumbotron").append(gifSelector)
  }
  });


})


//api 
