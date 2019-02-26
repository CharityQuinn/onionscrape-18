$(document).ready(function() {
  function getArticles() {
    $.ajax({
      method: 'GET',
      url: '/scrape'
    }).then(function(dbArticles) {
      dbArticles.forEach(article => {
 
        $('<li>')
          .addClass('list-group-item article')
          .append(`<h2>${article.title}</h2><a href="${article.link}" target="_blank">$link</a>`)
          .attr('data-id', article._id)
          .appendTo($('#articles'));
          console.log(article.link);
      });
    });
  }

  $('#articles').on('click', '.article', function() {

    const articleId = $(this).attr('data-id');
    $('#note-title').val($(this).text());
    $('#note-body').val('');
    
    $.ajax({
      url: `/articles/${articleId}`,
      method: 'GET'
    }).then(function(articleData) {
      console.log(articleData);
      //$('#submit-note').attr('data-id', articleData._id).attr("data-note-id", articleData.note._id);
      $('#article-link')
        .attr('href', articleData.link)
        .text(articleData.title);
        console.log("These are the links " + articleData.link);
        
      $('#note-body').val(articleData.note.body);
      $('#note-title').val(articleData.note.title);
      
    });
  });

  $('#submit-note').on('click', function(e) {
    e.preventDefault();

    const articleId = $(this).attr('data-id');
    if (!articleId) {
      return false;
    }

    const noteData = {
      title: $('#note-title')
        .val()
        .trim(),
      body: $('#note-body')
        .val()
        .trim()
    };

    $.ajax({
      url: `/articles/${articleId}`,
      method: 'POST',
      data: noteData
    }).then(function(data) {
      console.log(data);
      $('#note-title').val('');
      $('#note-body').val('');
    });
  });

  getArticles();
});
