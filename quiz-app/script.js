const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("results-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const homeButton = document.getElementById("home-button");

const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("question-number");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const totalScoreSpan = document.getElementById("total-score");

const finalScoreSpan = document.getElementById("final-score");
const totalQuestionsFinalSpan = document.getElementById("total-questions-final");

const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which keyword is used to create a class in Java?",
    answers: [
      { text: "class", correct: true },
      { text: "Class", correct: false },
      { text: "new", correct: false },
      { text: "object", correct: false },
    ],
  },

  {
    question: "Which method is the entry point of a Java program?",
    answers: [
      { text: "start()", correct: false },
      { text: "main()", correct: true },
      { text: "run()", correct: false },
      { text: "execute()", correct: false },
    ],
  },

  {
    question: "Which data type is used to store a whole number in Java?",
    answers: [
      { text: "float", correct: false },
      { text: "double", correct: false },
      { text: "int", correct: true },
      { text: "String", correct: false },
    ],
  },

  {
    question: "Which keyword is used to inherit a class in Java?",
    answers: [
      { text: "implements", correct: false },
      { text: "extends", correct: true },
      { text: "inherits", correct: false },
      { text: "super", correct: false },
    ],
  },

  {
    question: "Which of the following is NOT a Java primitive data type?",
    answers: [
      { text: "int", correct: false },
      { text: "boolean", correct: false },
      { text: "char", correct: false },
      { text: "String", correct: true },
    ],
  },
];


let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
totalScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
homeButton.addEventListener("click", showHomeScreen);


function startQuiz() {

  console.log("Quiz started");

    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();

}

function showQuestion() {
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent =(currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width  = progressPercent + "%";

  answersContainer.innerHTML = "";

  questionText.textContent = currentQuestion.question;


currentQuestion.answers.forEach(answer => {

    const button = document.createElement("button");

    button.textContent = answer.text;

    button.classList.add("answer-button");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);

});

}

function selectAnswer(e) {
  if(answerDisabled) return;

  answerDisabled = true;

  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if(button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if(isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if(currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);

}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  totalQuestionsFinalSpan.textContent = quizQuestions.length;
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  
  startQuiz();
}

function showHomeScreen() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}