$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<a id= title target=_blank href=" + data[i].url + ">"
        + data[i].title + "</a><br><br><p id= description>"
        + data[i].description + "</p><br><button id= comment-btn data-id="
        + data[i]._id + ">Comment</button><hr>");
    }
  });