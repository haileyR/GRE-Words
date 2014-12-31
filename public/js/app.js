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
          +"%; font-size: "+((Math.random() * 2)+0.8)+"em'><p class=\'spelling\'>" + word.spelling + "</p>"
          +"<p class=\'meaning\' id=\'w"+ word.id +"\' style=\'display: none\'>"+word.meaning+"</p></div>"
        $('#container').append(wordElement);
      })

    });
  });

  $('#container').on('dblclick', '.spelling', function(event){
    $target = $(event.target);
    var answer = $target.siblings().text();
    var question = randomChoices(meanings, answer)
    $('#w'+$target.closest('.word').attr('value')).replaceWith('<form id=\'question\'></form>');
    question[0].forEach(function(choice, index){
      var choiceElement =
        '<ul><input type=\'radio\' name=\'response\' value=\''+index+'\'>' + choice + '</ul>'
      $('#question').append(choiceElement);

    });
    $('#question').append('<button type="submit" form="question" id=\'ansCheck\'>Submit</button>');
    $(".spelling").bind('dblclick', function(){ return false; });
    $(".spelling").bind('click', function(){ return false; });

    $('#question').on('submit', function(event){
      event.preventDefault();
      $target = $(event.target);
      if(question[1] === parseInt($('input[name="response"]:checked').val())){
        console.log('correct');
      }else{
        console.log('wrong');
      };
      // $(".spelling").unbind('click');
    });



  });

  $('#container').on('click', '.spelling', function(event){
    setTimeout(function(){
      $target = $(event.target);
      $(".spelling").bind('dblclick', function(){ return false; });
    $(".spelling").bind('click', function(){ return false; });
      $('#w'+$target.closest('.word').attr('value')).css('display', 'inline-block');
      setTimeout(function(){
        $('#w'+$target.closest('.word').attr('value')).css('display', 'none');
        $(".spelling").unbind('click');
        $(".spelling").unbind('dblclick');
      }, 2500);
    }, 500);

  });






});

function randomChoices(array, answer){
  a = []
  for(i=0; i<3; i++){
    rand = Math.floor(Math.random() * array.length)
    a.push(meanings[rand]);
  };

  a.splice(Math.floor(Math.random() * a.length), 0, answer);
  return [a, a.indexOf(answer)];
};