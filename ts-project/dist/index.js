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
            ${question.answers.map((ans) => {
            return `
                    <p>
                        <input type="radio" name="${qsnIdx}" value="${ans}" />
                        <label for="${ans}"> ${ans} </label>
                    </p>
                `;
        })}
        </div>
    `;
        mainBox.insertAdjacentHTML("beforeend", questionTemplate);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield generateQuestions();
        showQuiz();
    });
});
