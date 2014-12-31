$(document).ready(function(){
  var DELAY = 700
  var qCount = 0;
  $('#startButton').on('click', function(){
    $.ajax({
      url: '/'
    }).done(function(response){
      meanings = response[1];
      initalWords = response[0].slice(0, 19);
      initalWords.forEach(function(word){
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
    if(!(($('#question').is(':visible')) || ($('.meaning').is(':visible')))){
      $target = $(event.target);
      console.log($target.siblings());
      var meaningP = $target.siblings();
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
        $target= $(event.target);
        if(question[1] === parseInt($('input[name="response"]:checked').val())){
          alert('Correct!! :)');
          $target.closest('.word').remove();
          // qCount += 1;
          // var newWord = response[0][20 + qCount]
          // var wordElement =
          //   "<div class='word' value='" + newWord.id +"' "+"style='top:" + (Math.floor(Math.random() * 80)+5)
          //   +"%; left:" + (Math.floor(Math.random() * 80)+5)
          //   +"%; font-size: "+((Math.random() * 2)+0.8)+"em'><p class=\'spelling\'>" + newWord.spelling + "</p>"
          //   +"<p class=\'meaning\' id=\'w"+ newWord.id +"\' style=\'display: none\'>"+newWord.meaning+"</p></div>"
          // $('#container').append(wordElement);
        }else{
          alert('Wrong!! :(');
          $($target).replaceWith(meaningP);
        };

        $(".spelling").unbind('click');
        $(".spelling").unbind('dblclick');
      });

    };

  });

  $('#container').on('click', '.spelling', function(event){
    setTimeout(function(){
      if(!(($('#question').is(':visible')) || ($('.meaning').is(':visible')))){
        $target = $(event.target);
        $(".spelling").bind('dblclick', function(){ return false; });
        $(".spelling").bind('click', function(){ return false; });
        $('#w'+$target.closest('.word').attr('value')).css('display', 'inline-block');
        setTimeout(function(){
          // debugger
          $('#w'+$target.closest('.word').attr('value')).css('display', 'none');
          $(".spelling").unbind('click');
          $(".spelling").unbind('dblclick');
        }, 2500);
      }
    }, 300);

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