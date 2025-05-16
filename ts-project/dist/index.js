"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";
class Question {
    constructor(question, correctAnswerIndex, answers) {
        this.score = 2;
        this.question = question;
        this.correctAnswerIndex = correctAnswerIndex;
        this.answers = answers;
    }
}
class User {
    constructor() {
        this.correctScore = 0;
        this.incorrectScore = 0;
        this.userScore = 0;
        this.correctAnswers = [];
    }
    increaseCorrectScore() {
        this.correctScore = this.correctScore + 2;
    }
    decreaseCorrectScore() {
        this.incorrectScore = this.incorrectScore + 2;
    }
    addToCorrectAnswers(answerIndex) {
        this.correctAnswers.push(answerIndex);
    }
}
const questions = [];
function generateQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_URL);
            const data = yield response.json();
            const quizQuestions = data.results;
            console.log("THE RETRIEVED DATA IS ", quizQuestions);
            quizQuestions.forEach((qsn) => {
                const answers = [...qsn.incorrect_answers];
                const correctAnswerIndex = Math.floor(Math.random() * answers.length + 1);
                answers.splice(correctAnswerIndex, 0, qsn.correct_answer);
                const individualQuestion = new Question(qsn.question, correctAnswerIndex, answers);
                questions.push(individualQuestion);
            });
            console.log("THE QUESTIONS ARE ", questions);
        }
        catch (e) {
            console.log(e);
        }
    });
}
const answers = [];
function showQuiz() {
    const mainBox = document.querySelector("main");
    questions.forEach((question, qsnIdx) => {
        const questionTemplate = `
        <div class="quiz-question">
            <h4> ${question.question} </h4>
            ${Array.from(question.answers)
            .map((ans, ansIdx) => {
            return `
                    <p>
                        <input type="radio" id="q${qsnIdx}-${ansIdx}" name="q${qsnIdx}" value="${ansIdx}" />
                        <label for="q${qsnIdx}-${ansIdx}">${ans}</label>
                    </p>
                `;
        })
            .join("")}
        </div>
    `;
        mainBox.insertAdjacentHTML("beforeend", questionTemplate);
    });
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    mainBox.insertAdjacentElement("afterend", submitBtn);
    submitBtn.addEventListener("click", handleSubmit);
}
function handleSubmit() {
    answers.length = 0; // clear previous answers
    questions.forEach((question, qsnIdx) => {
        const selected = document.querySelector(`input[name="q${qsnIdx}"]:checked`);
        if (selected) {
            const userAnswerIndex = Number(selected.value);
            const isCorrect = userAnswerIndex === question.correctAnswerIndex;
            answers.push({
                questionIndex: qsnIdx,
                answerIndex: userAnswerIndex,
                status: isCorrect,
            });
        }
    });
    console.log(answers);
}
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield generateQuestions();
        showQuiz();
    });
});
