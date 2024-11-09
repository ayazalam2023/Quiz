let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0; // Variable to keep track of the score
let timer; // Declare a variable to store the countdown interval
let timeLeft = 20 * 60; // 20 minutes in seconds

const questions = [
    { question: "What does HTML stand for?", options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlink Tool Markup Language"], correctAnswer: 2 },
    { question: "Which of the following is used to define styles for a webpage?", options: ["HTML", "CSS", "JavaScript", "PHP"], correctAnswer: 2 },
    { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctAnswer: 2 },
    { question: "Which HTML tag is used to display images?", options: ["<img>", "<image>", "<src>", "<pic>"], correctAnswer: 1 },
    { question: "Which tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correctAnswer: 2 },
    { question: "Which attribute is used to define the background color in HTML?", options: ["color", "background-color", "bgcolor", "bgcolorcolor"], correctAnswer: 2 },
    { question: "Which programming language is primarily used for web development?", options: ["Python", "JavaScript", "C", "C#"], correctAnswer: 2 },
    { question: "Which tag is used to define an ordered list in HTML?", options: ["<ol>", "<ul>", "<li>", "<dl>"], correctAnswer: 1 },
    { question: "Which of the following is a server-side scripting language?", options: ["JavaScript", "PHP", "CSS", "HTML"], correctAnswer: 2 },
    { question: "Which HTML element is used to specify a footer for a document?", options: ["<footer>", "<bottom>", "<end>", "<foot>"], correctAnswer: 1 },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Digital Ordinance Model", "Document Oriented Model", "Display Object Management"], correctAnswer: 1 },
    { question: "Which is used to make text bold in HTML?", options: ["<bold>", "<b>", "<strong>", "<text>"], correctAnswer: 2 },
    { question: "What does JSON stand for?", options: ["JavaScript Object Notation", "JavaScript Online Network", "Java System Object Notation", "Java String Object Notation"], correctAnswer: 1 },
    { question: "Which is the correct syntax for a JavaScript function?", options: ["function = myFunction()", "function myFunction()", "myFunction = function()", "myFunction function()"], correctAnswer: 2 },
    { question: "How do you add a comment in HTML?", options: ["<!-- Comment -->", "// Comment", "# Comment", "/* Comment */"], correctAnswer: 1 },
    { question: "What does SQL stand for?", options: ["Structured Query Language", "Stylish Query Language", "Simple Query Language", "Statement Query Language"], correctAnswer: 1 },
    { question: "What does API stand for?", options: ["Application Programming Interface", "Application Personal Interface", "Application Public Interface", "Application Prototype Interface"], correctAnswer: 1 },
    { question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], correctAnswer: 3 },
    { question: "What does XML stand for?", options: ["eXtensible Markup Language", "eXtra Modern Language", "eXtra Multi Language", "eXamine Multiple Language"], correctAnswer: 1 },
    { question: "Which HTML tag is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<header>"], correctAnswer: 3 }
];

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = `Q${currentQuestionIndex + 1}. ${question.question}`;

    const choiceContainers = document.querySelectorAll(".choice-container");
    choiceContainers.forEach((container, index) => {
        container.querySelector(".choice-text").textContent = question.options[index];
        container.classList.remove("selected");
    });
}

function selectAnswer(optionIndex) {
    if (selectedAnswer !== null) {
        document.querySelectorAll(".choice-container")[selectedAnswer].classList.remove("selected");
    }
    selectedAnswer = optionIndex - 1; // Store the index of the selected option
    document.querySelectorAll(".choice-container")[selectedAnswer].classList.add("selected");
}

function nextQuestion() {
    if (selectedAnswer === null) {
        alert("Please select an option before proceeding.");
        return;
    }

    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        score++; // Increment the score for a correct answer
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        selectedAnswer = null; // Reset the selection for the next question
    } else {
        alert("Quiz completed!");
        clearInterval(timer); // Stop the timer when the quiz ends
        endQuiz(); // Save score and go to the result page
    }
}

// Function to update the timer on the screen
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time's up!");
        // Optionally, end the quiz automatically
        endQuiz();
    } else {
        timeLeft--;
    }
}

// Helper function to format time as MM:SS
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function startTimer() {
    timer = setInterval(updateTimer, 1000); // Update the timer every second
}

function endQuiz() {
    localStorage.setItem("score", score); // Save the score to localStorage
    window.location.href = "final-result.html"; // Redirect to result page
}

startTimer(); // Start the countdown timer
loadQuestion(); // Initial load of the first question
