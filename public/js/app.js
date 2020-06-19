$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<a id='title' target='_blank' href=" + data[i].url + ">" +
      data[i].title + "</a><br><br><p id='description'>" +
      data[i].description + "</p><br><button id='comment-btn' type='button' data-id=" +
      data[i]._id + ">Comment</button><hr>");
  }
});


$(document).on("click", "#comment-btn", function () {
  console.log("clicked: " + $(this).attr("data-id"));
  $("#comment-input").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId

  }).then(function (data) {
    console.log(thisId);
    console.log(data);
    $("#comment-input").append("<h3>" + data.title + "</h3>");
    $("#comment-input").append("<input id='comment-title' name='title' ><br>");
    $("#comment-input").append("<textarea id='comment-body' name='body'></textarea><br>");
    $("#comment-input").append("<button data-id=" + data._id + "id='savecomment'>Submit comment</button>");

    if (data.comment) {
      $("#comment-title").val(data.comment.title);
      $("#comment-body").val(data.comment.body);
    }
  });
});


$(document).on("click", "#savecomment", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#comment-title").val(),
      body: $("#comment-body").val()
    }
  })
    // With that done
    .then(function(data) {
      console.log(data);
      $("#comments").empty();
      $("#comments").append("<p>" + data.body + "</p>");
    });

  $("#comment-title").val("");
  $("#comment-body").val("");
});