var questions = { // overall
  "text": "What type is this animal?",
  "choices": [{ //within what type of animal
      "label": "snake",
      "path": 1,
      "question": { //snake
        "text": "Which of these traits does it have?", //1 a
        "choices": [{ //choice 1 for snake
            "label": "rings of red, black, white",
            "path": 11,
            "href": '../secondary/kingsnake.html'
          }, // end of choice 1
          { //choice 2
            "label": "brown with lenghwise stripe",
            "path": 12,
	    "href": '../secondary/gartersnake.html'
          }, // end of choice 2
          { //choice 3
            "label": "brown blotches",
            "path": 13,
            "question": { //within choice 3
              "text": "Which description fits better?", 
              "choices": [{ // choice 3.1
                  "label": "long (48-90 in), powerfully built, long nose scale",
                  "path": 131,
		  "href": '../secondary/pinesnake.html'
                }, //end of choice 3.1
                { // choice 3.2
                  "label": "normal nose, thinner, shorter",
                  "path": 132,
		  "href": '../secondary/gophersnake.html'
                }, //end of choice 3.2
               ] //end of choices within 3
            } //end of within choice 3
          }, //end of choice 3
        ] // end of choices for snake
      } //end of snake
    }, //end of container of snake
    { //within what type of animal
      "label": "frog",
      "path": 2,
      "question": { //within frog
        "text": "What color?", //1 b
        "choices": [{ //within choices, start choice 1
            "label": "bright colors",
            "path": 21,
	    "href": '../secondary/poisondartfrog.html'
                       },//end choice 1
          { //start choice 2
            "label": "green with a yellow belly",
            "path": 22,
	    "href": '../secondary/americanbullfrog.html'
           }, //end choice 2
          { //start choice 3
            "label": "brown or reddish with warts",
            "path": 23,
            "question": { //withing choice 3
              "text": "How large?", //1 c
              "choices": [{ //start choice 3.1
                  "label": "4-6 in",
                  "path": 231,
		  "href": '../secondary/canetoad.html'
            }, //end choice 3.1
                { //start choice 3.2
                  "label": "about 2 in",
                  "path": 232,
		  "href": '../secondary/americantoad.html'
                }, //end choice 3.2
              ] //end choice within 3
            } //end question within 3
          }, //end choice 3
        ] //end choices
      } //end frog question
    },//end frog
    { //start lizard
      "label": "lizard",
      "path": 3,
      "question": { //start lizard questions
        "text": "What patterns are visible?", //1 a
        "choices": [{ //start choices + choice 1
            "label": "spots or blotches",
            "path": 31,
	    "href": '../secondary/sidelizard.html'
                    }, //end choice 1
          { //start choice 2
            "label": "stripes or without patterns",
            "path": 32,
            "question": { //start question within choice 2
              "text": "Which noticable characteristic does it have?", //1 a
              "choices": [{ //start choices + choice 2.1
                  "label": "small legs",
                  "path": 321,
		  "href": '../secondary/alligatorlizard.html'
                }, //end 2.1
                { //start 2.2
                  "label": "blue belly, or spiky scales",
                  "path": 322,
		  "href": '../secondary/fencelizard.html'
                }, //end 2.2
              ]// end choices
            }, //end questions
          }, //end choices 2
        ] //end choices within lizard
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