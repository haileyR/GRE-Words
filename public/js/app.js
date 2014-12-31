$(document).ready(function(){
  var DELAY = 700
  $('#startButton').on('click', function(){
    $.ajax({
      url: '/'
    }).done(function(response){
      meanings = response[1];
      console.log(response);
      response[0].forEach(function(word){
        var wordElement =
          "<div class='word' value='" + word.id +"' "+"style='top:" + (Math.floor(Math.random() * 80)+5)
          +"%; left:" + (Math.floor(Math.random() * 80)+5)
          +"%; font-size: "+((Math.random() * 2)+0.8)+"em'>" + word.spelling
          +"<br><p class=\'meaning\' id=\'w"+ word.id +"\' style=\'display: none\'>"+word.meaning+"</p></div>"
        $('#container').append(wordElement);
      })

    });
  });

  $('#container').on('dblclick', '.word', function(event){
    $target = $(event.target);
    $('#w'+$target.attr('value')).replaceWith('<div class=\'answers\'></div>');
    randomAnswers(meanings).forEach(function(answer){
      var answerElement =
        '<ul><input type=\'radio\' name=\'response'+ ($target.attr('value')) +'\'>' + answer + '</ul>'
      $('.answers').append(answerElement);

    });
    $('.answers').append('<button>Submit</button>');
    $("#container").children().bind('click dblclick', function(){ return false; });

  });

  $('#container').on('click', '.word', function(event){
    setTimeout(function(){
      $target = $(event.target);
      $("#container").children().bind('click', function(){ return false; });
      $('#w'+$target.attr('value')).css('display', 'inline-block');
    }, 500);


    setTimeout(function(){
      $('#w'+$target.attr('value')).css('display', 'none');
      $("#container").children().unbind('click');
    }, 2500);
  });





});

function randomAnswers(array){
  a = []
  for(i=0; i<4; i++){
    rand = Math.floor(Math.random() * array.length)
    a.push(meanings[rand]);
  };
  return a;
};