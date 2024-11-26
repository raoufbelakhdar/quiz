import { quizzes } from './quizData.js'; // Import quiz data

// Global variables
let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

// Function to start a selected quiz
function startQuiz(quizId) {
    currentQuiz = quizzes[quizId]; // Load the selected quiz
    currentQuestionIndex = 0;
    score = 0;

    // Hide quiz selection screen and show the quiz container
    document.getElementById("quiz-selection").style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";

    loadQuestion(); // Load the first question
}

// Function to load a question
function loadQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    document.getElementById("question-title").textContent = question.question;
    document.getElementById("sentence").textContent = question.sentence;

    const options = document.querySelectorAll(".option-btn");
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.classList.remove("selected", "correct", "incorrect");
        option.onclick = () => selectOption(option, index);
    });

    // Clear any previous feedback
    document.getElementById("feedback").textContent = "";

    updateProgressBar();
}

// Function to handle option selection
function selectOption(selectedOption, selectedIndex) {
    const options = document.querySelectorAll(".option-btn");
    options.forEach(option => option.classList.remove("selected"));
    selectedOption.classList.add("selected");

    const correctAnswerIndex = currentQuiz[currentQuestionIndex].correct;
    if (selectedIndex === correctAnswerIndex) {
        selectedOption.classList.add("correct");
        score++;
    } else {
        selectedOption.classList.add("incorrect");
        const correctOption = options[correctAnswerIndex];
        correctOption.classList.add("correct");
    }

    document.getElementById("feedback").textContent = currentQuiz[currentQuestionIndex].explanation;
}

// Function to go to the next question or show results
function nextQuestion() {
    const selectedOption = document.querySelector(".option-btn.selected");
    if (!selectedOption) return;

    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        setTimeout(loadQuestion, 1000);
    } else {
        showResults();
    }
}

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.querySelector(".progress");
    progressBar.style.width = `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%`;
}

// Function to display the results
function showResults() {
    document.querySelector(".quiz-content").style.display = "none";
    document.querySelector(".quiz-footer").style.display = "none";
    const scoreText = document.getElementById("score-text");
    scoreText.textContent = `لقد أكملت الاختبار. نتيجتك: ${score} من ${currentQuiz.length}`;
    document.querySelector(".results").style.display = "block";
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    document.querySelector(".results").style.display = "none";
    document.querySelector(".quiz-content").style.display = "block";
    document.querySelector(".quiz-footer").style.display = "block";

    loadQuestion();
}

// Function to go back to the quiz selection screen
function goToHome() {
    currentQuestionIndex = 0;
    score = 0;

    document.querySelector(".quiz-container").style.display = "none";
    document.getElementById("quiz-selection").style.display = "flex";

    document.querySelector(".progress").style.width = "0%";
    document.getElementById("feedback").textContent = "";
}

// Export functions for global use
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;
window.goToHome = goToHome;
