let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
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

function selectOption(selectedOption, selectedIndex) {
    const options = document.querySelectorAll(".option-btn");
    options.forEach(option => option.classList.remove("selected"));
    selectedOption.classList.add("selected");

    const correctAnswerIndex = quizData[currentQuestionIndex].correct;
    if (selectedIndex === correctAnswerIndex) {
        selectedOption.classList.add("correct");
        score++;
    } else {
        selectedOption.classList.add("incorrect");
        // Show correct answer if selected answer is wrong
        const correctOption = options[correctAnswerIndex];
        correctOption.classList.add("correct");
    }

    // Display the explanation for the selected answer
    document.getElementById("feedback").textContent = quizData[currentQuestionIndex].explanation;
}

function nextQuestion() {
    const selectedOption = document.querySelector(".option-btn.selected");
    if (!selectedOption) return;  // Ensure an option is selected

    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        setTimeout(loadQuestion, 1000);  // Delay to load the next question
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progressBar = document.querySelector(".progress");
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
}

function showResults() {
    document.querySelector(".quiz-content").style.display = "none";
    document.querySelector(".quiz-footer").style.display = "none";
    const scoreText = document.getElementById("score-text");
    scoreText.textContent = `لقد أكملت الاختبار. نتيجتك: ${score} من ${quizData.length}`;
    document.querySelector(".results").style.display = "block";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector(".results").style.display = "none";
    document.querySelector(".quiz-content").style.display = "block";
    document.querySelector(".quiz-footer").style.display = "block";
    loadQuestion();
}

// Initial call to load the first question
loadQuestion();
