$(document).ready(function() {

    var correctAnswerCount;
    var incorrectAnswerCount;
    var unansweredCount;
    var defaultInterval = 15;
    var currentInterval = defaultInterval;
    var counter;

    var winImages = ['win1.gif', 'win2.gif', 'win3.gif', 'win4.gif'];
    var loseImages = ['lose1.gif', 'lose2.gif', 'lose3.gif'];
    var timesUp = ['tu1.gif', 'tu2.gif', 'tu3.gif'];

    var questions = [{
        id: 'questionOne',
        question: "The Tag is used To Give Heading To The Table",
        choice1: 'Head',
        choice2: 'Td',
        choice3: 'Th',
        choice4: 'Caption'
    }, {
        id: 'questionTwo',
        question: 'If Button is clicked .......Event Handler is invoked',
        choice1: 'OnSubmit()',
        choice2: 'OnLoad()',
        choice3: 'IsPostBack()',
        choice4: 'Onclick()'

    }, {
        id: 'questionThree',
        question: 'Function is Used To Parse a String To Int',
        choice1: 'Integer.Parse',
        choice2: 'Int.Parse',
        choice3: 'Parse.Int',
        choice4: 'None'
    }, {
        id: 'questionFour',
        question: 'Which of the following type of variable is visible only within a function where it is defined?',
        choice1: 'Global Variable',
        choice2: 'Local Variable',
        choice3: 'Both of the above',
        choice4: 'None of the above'
    }, {
        id: 'questionFive',
        question: 'Which of the following function of Number object returns a string value version of the current number in a format that may vary according to a browser\'s locale settings?',
        choice1: 'toExponential',
        choice2: 'toFixed',
        choice3: 'toLocaleString',
        choice4: 'toString'
    }, {
        id: 'questionSix',
        question: 'Which of the following function of String object returns the index within the calling String object of the last occurrence of the specified value?',
        choice1: 'lastIndexOf()',
        choice2: 'search()',
        choice3: 'substr()',
        choice4: 'indexOf()'
    }, {
        id: 'questionSeven',
        question: 'Which of the following function of String object creates an HTML hypertext link that requests another URL?',
        choice1: 'link()',
        choice2: 'sub()',
        choice3: 'sup()',
        choice4: 'small()'
    }, {
        id: 'questionEight',
        question: 'Which of the following function of Array object creates a new array with the results of calling a provided function on every element in this array?',
        choice1: 'push()',
        choice2: 'join()',
        choice3: 'pop()',
        choice4: 'map()'
    }, {
        id: 'questionNine',
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        choice1: 'if (i <> 5)',
        choice2: 'if i =! 5 then',
        choice3: 'if i <> 5',
        choice4: 'if (i != 5)'
    }, {
        id: 'questionTen',
        question: 'How do you round the number 7.25, to the nearest integer?',
        choice1: 'Math.rnd(7.25)',
        choice2: 'round(7.25)',
        choice3: 'Math.round(7.25)',
        choice4: 'rnd(7.25)'
    }];

    var answers = [
        'Caption',
        'Onclick()',
        'Int.Parse',
        'Local Variable',
        'toLocaleString()',
        'lastIndexOf()',
        'link()',
        'map()',
        'if (i != 5)',
        'Math.round(7.25)'
    ];

    // Initialise function to initialise everything  
    function initialise() {
        // $('#startAgain').prop('disabled', 'true');
        i = 0;
        start();
        createQuestion()
        correctAnswerCount = 0;
        incorrectAnswerCount = 0;
        unansweredCount = 0;

        $('#startAgain').addClass('hidden');
    }

    /**
        This function is decrementing the time interval of given seconds for each question.
        It also takes care of moving to next screen when given time is over.
    */
    function decrement() {

        currentInterval--;

        $('.timeInterval').html("Time Remaining: " + currentInterval);

        if (currentInterval === 0) {
            clearInterval(counter);
            unansweredCount++;

            $('#compareUserAnswer').append('<div class= "reveal" id= "revealAnswer" >' +
                "Time is Up!" + '<br>' + '<p class="correctAnswer" >' +
                "Time Remaining: " + 0 + "<br>" + "The Correct Answer Was: " +
                '<br>' + answers[i] + '</p></div>');

            addRandomImage(timesUp);

            $('#start').hide();
            hide();
            moveToNextQuestion();
        }
    };

    /**
    This function is creating a question and giving choices to the user.  
    */

    function createQuestion() {

        var currentQuestion = questions[i];

        $('#container').html('<div class= "quizQuestions" id=' + currentQuestion.id + '>' +
            '<p class="question">' + currentQuestion.question + '</p>' +
            '<p class="answer">' + currentQuestion.choice1 + '</p>' +
            '<p class="answer">' + currentQuestion.choice2 + '</p>' +
            '<p class="answer">' + currentQuestion.choice3 + '</p>' +
            '<p class="answer">' + currentQuestion.choice4 + '</p></div>');

        // below line is hiding the the result page at the time of showing questions. 
        $('#finalOutput').hide();
    };

    /**
    This function is comparing the answer which the user selects with the answer array and shows the user if 
    the answer is correct or not. if the user selects a wrong answer then through this function he will see the
    right answer.
    */

    function compareAnswer() {
        var userAns = $(this).text();
        var isAnswerCorrect = answers[i] === userAns;
        // clear interval clears the interval set in function start()
        clearInterval(counter);
        hide();

        if (!isAnswerCorrect) {
            incorrectAnswerCount++;

            $('#compareUserAnswer').html('<div class= "reveal" id= "revealAnswer" >' +
                "Nope!" + '<br>' + '<p class="correctAnswer" >' + "Time Remaining: " +
                currentInterval + '<br>' + "The Correct Answer Was: " + answers[i] +
                '</p></div>');
            addRandomImage(loseImages);
        } else {
            correctAnswerCount++;

            $('#compareUserAnswer').html('<div class= "reveal" id= "revealAnswer" >' +
                '<p class="correctAnswer" >' + "Time Remaining: " + currentInterval + '<br>' +
                "Your answer is Correct!" + '</p></div>');

            addRandomImage(winImages);
        }
        moveToNextQuestion();
    };

    /**
    Function to choose random gif images when the user chooses correct answer, wrong answer or when 
    the time is up.
    */

    function addRandomImage(images) {
        var randomNumber = Math.floor(Math.random() * images.length);
        var randomImage = "assets/images/" + images[randomNumber];

        $('#revealAnswer').append('<img class ="gify" src="' + randomImage + '" />');
        $('.gify').css({
            'width': '300px',
            'margin-left': '80px'
        });
    };

    /**
    This function moves to next question once the user has answered a question or if time is 
    up or if all the questions has been answered.
    */
    function moveToNextQuestion() {

        if (i === questions.length - 1) {
            setTimeout(gameEnd, 2000);
        } else {
            i++;
            setTimeout(start, 2000);

        }
    }

    /**
    Hiding the container and time interval and displaying it on click event
    */
    function hide() {
        $('#container').addClass('hidden');
        $('.timeInterval').hide();
    }


    function start() {
        // reset interval to default
        currentInterval = defaultInterval;
        $('.timeInterval').html("Time Remaining: " + currentInterval);
        $('#container').removeClass('hidden');
        $("#compareUserAnswer").html('');
        $('.timeInterval').css('display', '');
        $('#start').remove();
        createQuestion();
        counter = setInterval(decrement, 1000);
    };


    /**
    This function is called when all questions had been answered. This shows the stats of correct ans,
    incorrect ans and questions not answered.
    */

    function gameEnd() {
        $('#finalScore').html('<div class= "endGame" id= "finalOutput" >' +
            '<p class="correctAnswerCount" >' + "All Done, heres how you did!" + '</p>' + '<br>' +
            '<p class="correctAnswerCount" >' + "Number of Correct Answers: " + correctAnswerCount + '</p>' + '<br>' +
            '<p class="incorrectAnswerCount" >' + "Number of Incorrect Answers: " + incorrectAnswerCount + '</p>' + '<br>' +
            '<p class="unansweredCount" >' + "Number of questions not answered: " + unansweredCount + '</p></div>');
        $('.reveal').hide();
        hide();
        $('#startAgain').removeClass('hidden').on('click', initialise);
    }


    //calling the functions declared above 
    $("#start").on('click', initialise);
    $(document).on('click', '.answer', compareAnswer);

});