
const questions = [
    {
        question: "which is the longest river in India?",
        answers: [
            { text: "Yamuna", correct: false },
            { text: "Saraswati", correct: false },
            { text: "kaveri", correct: false },
            { text: "Ganga", correct: True },
        ]
    },
    {
        question: "which is the smallest state in India?",
        answers: [
            { text: "Goa", correct: True },
            { text: "Sikkim", correct: false },
            { text: "Mizoram", correct: false },
            { text: "Nagaland", correct: false },
        ]
    },
    {
        question: "which is the national fruit of India?",
        answers: [
            { text: "Apple", correct: false },
            { text: "Gwava", correct: false },
            { text: "Grapes", correct: false },
            { text: "Mango", correct: True },
        ]
    },
    {
        question: "which is the longest river bridge in India?",
        answers: [
            { text: "JP setu", correct: false },
            { text: "Gandhi setu", correct: false },
            { text: "Bogibeel", correct: True },
            { text: "kosi mahasetu", correct: false },
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });

}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();

    } else {
        startQuiz();
    }
});



