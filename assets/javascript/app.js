list= ["nene leakes", "cats", "dogs"];
searchTerm = "";
queryURL = "";
userInput= "";
//animate machine

$( document ).ready(function() {
  renderGif(list);
  //local storage

});

// button generator machine
function renderGif(list) {
  $("#buttons").empty(); // empties out the html
  bubble_Sort(list);
  // render our todos to the page
  for (var i = 0; i < list.length; i++) {
    // Create a new variable that will hold a "<p>" tag.
    // Then set the to-do "value" as text to this <p> element.
    var gifText = $("<button>");
    gifText.attr("data-searchterm", list[i])
    gifText.addClass("btn btn-dark btn-lg clickable")
    gifText.attr("id", "clickable")
    gifText.text(list[i]);
    // Add the button and to do item to the to-dos div
    $("#buttons").append(gifText);
  }
  $(".clickable").on("click", function (){
    console.log("it clicks")
    var userInput = $(this).attr("data-searchTerm");
    console.log(userInput)
    ajaxRequest(userInput)

    
    
  });


}
function bubble_Sort(a)
{
    var swapp;
    var n = a.length-1;
    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (x[i] > x[i+1])
            {
               var temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);
 return x; 
};



function ajaxRequest(x){
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KdRKs6fHYc9MuNvHE3xycHidCnR883t7&q=" + x + "&limit=5&offset=0&rating=R&lang=en"
  $.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    $("#jumbotron").empty();
    console.log(response);
    for (var i=0; i<5; i++){
    gifSelector= $("<img>")
    gifSelector.addClass("gif")
    gifSelector.attr("data-state", "animate")
    $(gifSelector).attr("src", response.data[i].images.original.url)
    $(gifSelector).attr("data-still", response.data[i].images.original_still.url)
    $(gifSelector).attr("data-animate", response.data[i].images.original.url)
  
    $("#jumbotron").append(gifSelector)
}
$(".gif").on("click", function() {
  var state = $(this).attr("data-state");
  console.log(state)
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

});

};
// input box -- boilerplate
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  var searchTerm = $("#search-term").val();
  list.push(searchTerm);
  // console.log(queryURL)
  ajaxRequest(searchTerm);
  renderGif(list);
  $("#search-term").text("")
})


//api 
