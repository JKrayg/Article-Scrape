$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<a id= title href=" + data[i].url + " data-id='" + data[i]._id + "'>" + data[i].title + "</a><br><br><p id= description>" + data[i].description + "</p><hr>");
    }
  });