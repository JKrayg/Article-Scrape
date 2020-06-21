$(document).ready(function () {
  $.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<a id='title' target='_blank' href=" + data[i].url + ">" +
        data[i].title + "</a><br><br><p id='description'>" +
        data[i].description + "</p><button id='comment-btn' type='button' data-id=" +
        data[i]._id + ">Comment</button><br><p id= 'comments' data-id= " + data[i]._id + "><hr>");
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
      $("#comment-input").append("<h4>" + data.title + "</h4>");
      $("#comment-input").append("<textarea id='comment-body' placeholder='body' name='body'></textarea><br>");
      $("#comment-input").append("<button data-id='" + data._id +
        "' id='savecomment'>comment</button><button id='clear'>Clear comment</button>");

      if (data.comment) {
        $("#comment-body").val(data.comment.body);
        console.log(data.comment.body)

      }
    });
  });

  $(document).on("click", "#clear", function () {
    $("#comment-body").val("");
  });


  $(document).on("click", "#savecomment", function () {
    var thisId = $(this).attr("data-id");
    var comment = $("#comment-body").val();
    if (comment === "") {
      alert("Comment body is empty")
    } else {
      $.ajax({
          method: "POST",
          url: "/articles/" + thisId,
          data: {
            body: $("#comment-body").val()
          }
        })
        // With that done
        .then(function (data) {
          console.log(data);
          $("#comments").empty();
          var e = $("#comments");
          e.attr('id', thisId);
          e.append($("<p data-id= " + thisId + ">" + comment + "</p>"));
          
              
            
        });
        
      $("#comment-body").val("");
      
    }

  });
});