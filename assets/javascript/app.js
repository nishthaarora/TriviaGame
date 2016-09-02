$(document).ready(function() {

    var values = "";
    var testAnswer;
    var correctAnswerCount = 0;
    var incorrectAnswerCount = 0;
    var unansweredCount = 0;
    var interval = 15;
    var counters = [];
    var counter;

    var gameArray = [{
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

    var answerArray = ['Caption', 'Onclick()', 'Int.Parse', 'Local Variable', 'toLocaleString()', 'lastIndexOf()', 'link()', 'map()', 'if (i != 5)', 'Math.round(7.25)'];



    function initialise() {
        $('#startAgain').prop('disabled', 'true');
        i = 0;
        start();
        createQuestions()
        correctAnswerCount = 0;
        incorrectAnswerCount = 0;
        unansweredCount = 0;
        decrement();



    }

    function decrement() {

        $('.timeInterval').html("Time Remaining: " + interval)

        interval--;

        if (interval === -1) {
            clearInterval(counter);
            unansweredCount++;

            $('#compareUserAnswer').append('<div class= "reveal" id= "revealAnswer" >' +
                "Time is Up!" + '<br>' + '<p class="correctAnswer" >' +
                "Time Remaining: " + 0 + "<br>" + "The Correct Answer Was: " +
                '<br>' + answerArray[i] + '</p></div>');

            $('#start').hide();
            hide();
            nextQuestion();
        }
    };



    i = 0;

    function createQuestions() {

        var currentQuestion = gameArray[i];

        $('#container').html('<div class= "quizQuestions" id=' + currentQuestion.id + '>' +
            '<p class="question">' + currentQuestion.question + '</p>' +
            '<p class="answer">' + currentQuestion.choice1 + '</p>' +
            '<p class="answer">' + currentQuestion.choice2 + '</p>' +
            '<p class="answer">' + currentQuestion.choice3 + '</p>' +
            '<p class="answer">' + currentQuestion.choice4 + '</p></div>');

        $('#finalOutput').hide();

    };


    function compareAnswers() {

        values = $(this).text();

        testAnswer = answerArray.indexOf(values);
        clearInterval(counter);
        console.log(counter);
        hide();


        if (testAnswer === -1) {

            incorrectAnswerCount++;

            $('#compareUserAnswer').html('<div class= "reveal" id= "revealAnswer" >' +
                "Nope!" + '<br>' + '<p class="correctAnswer" >' + "Time Remaining: " +
                interval + '<br>' + "The Correct Answer Was: " + answerArray[i] +
                '</p></div>');


        } else {

            correctAnswerCount++;

            $('#compareUserAnswer').html('<div class= "reveal" id= "revealAnswer" >' +
                '<p class="correctAnswer" >' + "Time Remaining: " + interval + '<br>' +
                "Your answer is Correct!" + '</p></div>');


            // var winImages = ['win1.gif', 'win2.gif', 'win3.gif', 'win4.gif']

            // var randomWinImages = Math.floor(Math.random() * winImages.length);
            // var imgStr = '<img class ="gify" src="assets/images" + randomWinImages />'
            // var imgStr = '<img class ="gify" src="assets/images/win1.gif" />'

            $('#revealAnswer').append('<img class ="gify" src="assets/images/win1.gif" />');
            $('.gify').css({
                'width': '300px',
                'margin-left': '251px'
            })


        }
        nextQuestion();
    };


    function nextQuestion() {

        if (i === gameArray.length - 1) {
            gameEnd();


        } else {
            i++;

            setTimeout(start, 1000);

        }
    }


    function hide() {
        $('#container').addClass('hidden');
        $('.timeInterval').hide();


    }


    function start() {
        $('.timeInterval').html("Time Remaining: " + 15)
        $('#container').removeClass('hidden');
        $("#compareUserAnswer").html('');
        $('.timeInterval').css('display', '');
        $('#start').remove();
        createQuestions();
        interval = 14;
        counter = setInterval(decrement, 1000);


    };

    function gameEnd() {
        $('#finalScore').html('<div class= "endGame" id= "finalOutput" >' +
            '<p class="correctAnswerCount" >' + "All Done, heres how you did!" + '</p>' + '<br>' +
            '<p class="correctAnswerCount" >' + "Number of Correct Answers: " + correctAnswerCount + '</p>' + '<br>' +
            '<p class="incorrectAnswerCount" >' + "Number of Incorrect Answers: " + incorrectAnswerCount + '</p>' + '<br>' +
            '<p class="unansweredCount" >' + "Number of questions not answered: " + unansweredCount + '</p></div>');
        $('.reveal').hide();
        hide();
        $('#startAgain').removeClass('hidden').on('click', function() {
            initialise();
        });

    }


    $('#start').on('click', start);
    $(document).on('click', '.answer', compareAnswers);

});