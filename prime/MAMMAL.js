var questions = { // overall
  "text": "What is the fur color?",
  "choices": [{ //within what type of animal
      "label": "dark brown",
      "path": 1,
      "href": '../secondary/nutria.html'
          }, // end of choice 1
      { //within what type of animal
      "label": "gray brown",
      "path": 2,
      "href": '../secondary/vole.html'
      },
    { 
      "label": "light brown, gray",
      "path": 3,
      "question": {
        "text": "Which description fits more?", //1 a
        "choices": [{ 
            "label": "large ears, about 4 in",
            "path": 31,
	    "href": '../secondary/mouse.html'
              }, 
          { //start choice 2
            "label": "5 to 7 in, bushy tail",
            "path": 32,
            "href": '../secondary/squirrel.html'
            },  
        ] 
      }
    }
  ]
 };

var quizComplete = false,
  answers = [],
  currentObj = questions;

$(document).ready(function() {

  updateQuestion();

  if (!quizComplete) {

    $('.choices').on('click', '.choice', function() {

      value = $(this).attr('value');
      answers.push($(this).html());
      //currentQuestion++;

      var choice = currentObj.choices[value];

      if (choice.question) {
        currentObj = choice.question;
      } 
      else {
          quizComplete = true;
	  window.location.href = choice.href;
          return;
        answers = [];
        currentObj = questions;
      }
      updateQuestion();

    });

  }
});

function updateQuestion() {

  var question = currentObj.text;
  var questionText = $(document).find(".container > .question");
  var choiceList = $(document).find(".container > .choices");
  var numChoices = currentObj.choices.length;

  // Set question text
  $(questionText).text(question);

  // Clear current choices and update with new ones
  $(".choice").remove();

  var choice, path;
  for (i = 0; i < numChoices; i++) {
    choice = currentObj.choices[i].label;
    path = currentObj.choices[i].path;
    $('<div class="choice" value=' + i + '>' + choice + '</div>').appendTo(choiceList);
  }
}