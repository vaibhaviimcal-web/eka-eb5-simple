// Calculator State
let currentQuestion = 1;
let totalScore = 0;
let answers = {};

// Select Option
function selectOption(questionId, answer, score) {
    // Store answer and score
    answers[questionId] = {
        answer: answer,
        score: score
    };
    
    totalScore += score;
    
    // Hide current question
    document.getElementById(questionId).classList.remove('active');
    
    // Move to next question or show results
    if (currentQuestion < 4) {
        currentQuestion++;
        document.getElementById('q' + currentQuestion).classList.add('active');
        updateProgress();
    } else {
        showResults();
    }
}

// Update Progress Bar
function updateProgress() {
    const progress = (currentQuestion / 4) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = 'Question ' + currentQuestion;
}

// Show Results
function showResults() {
    // Hide progress bar
    document.querySelector('.progress-container').style.display = 'none';
    
    // Show results card
    document.getElementById('results').style.display = 'block';
    
    // Animate score
    animateScore(totalScore);
    
    // Set result message based on score
    let title, message;
    
    if (totalScore >= 80) {
        title = 'Excellent! You\'re Highly Eligible';
        message = 'Based on your answers, you appear to be an excellent candidate for the EB-5 visa program. We recommend scheduling a consultation to discuss your specific situation and begin the application process.';
    } else if (totalScore >= 60) {
        title = 'Good! You\'re Likely Eligible';
        message = 'You have a good chance of qualifying for the EB-5 program. Some aspects of your application may need additional attention. Let\'s discuss your options in a free consultation.';
    } else if (totalScore >= 40) {
        title = 'Possible, But Needs Review';
        message = 'You may qualify for the EB-5 program, but there are some concerns that need to be addressed. We recommend a detailed consultation to evaluate your specific circumstances.';
    } else {
        title = 'Challenging, But Not Impossible';
        message = 'Based on your current situation, the EB-5 program may be challenging. However, there may be alternative pathways or ways to strengthen your application. Let\'s explore your options together.';
    }
    
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = message;
    
    // Display answers
    displayAnswers();
}

// Animate Score
function animateScore(targetScore) {
    const scoreElement = document.getElementById('scoreValue');
    let current = 0;
    const increment = targetScore / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
            current = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.round(current);
    }, 20);
}

// Display Answers
function displayAnswers() {
    const answersList = document.getElementById('answersList');
    const questions = {
        'q1': 'Investment Capacity',
        'q2': 'Source of Funds Documentation',
        'q3': 'Criminal Record',
        'q4': 'Timeline'
    };
    
    let html = '';
    for (let qId in answers) {
        html += `
            <li>
                <strong>${questions[qId]}:</strong>
                ${answers[qId].answer}
            </li>
        `;
    }
    
    answersList.innerHTML = html;
}

// Restart Calculator
function restartCalculator() {
    currentQuestion = 1;
    totalScore = 0;
    answers = {};
    
    // Hide results
    document.getElementById('results').style.display = 'none';
    
    // Show first question
    document.getElementById('q1').classList.add('active');
    
    // Show and reset progress bar
    document.querySelector('.progress-container').style.display = 'block';
    updateProgress();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize
updateProgress();