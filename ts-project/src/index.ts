const API_URL =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

class Question {
  question: string;
  correctAnswerIndex: number;
  answers: string[];
  score: number = 2;

  constructor(question: string, correctAnswerIndex: number, answers: string[]) {
    this.question = question;
    this.correctAnswerIndex = correctAnswerIndex;
    this.answers = answers;
  }
}

class User {
  correctScore = 0;
  incorrectScore = 0;
  userScore = 0;
  correctAnswers: number[] = [];

  increaseCorrectScore() {
    this.correctScore = this.correctScore + 2;
  }

  decreaseCorrectScore() {
    this.incorrectScore = this.incorrectScore + 2;
  }

  addToCorrectAnswers(answerIndex: number) {
    this.correctAnswers.push(answerIndex);
  }
}

type QuestionType = {
  question: string;
  correctAnswerIndex: number;
  answers: string[];
};
type Questions = QuestionType[];

const questions: Questions = [];

async function generateQuestions() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const quizQuestions = data.results;
    console.log("THE RETRIEVED DATA IS ", quizQuestions);

    quizQuestions.forEach(
      (qsn: {
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
      }) => {
        const answers = [...qsn.incorrect_answers];
        const correctAnswerIndex = Math.floor(
          Math.random() * answers.length + 1
        );
        answers.splice(correctAnswerIndex, 0, qsn.correct_answer);
        const individualQuestion = new Question(
          qsn.question,
          correctAnswerIndex,
          answers
        );
        questions.push(individualQuestion);
      }
    );
    console.log("THE QUESTIONS ARE ", questions);
  } catch (e) {
    console.log(e);
  }
}

type Answer = {
  questionIndex: number;
  answerIndex: number;
  status: boolean;
};

const answers: Answer[] = [];

function showQuiz() {
  const mainBox = document.querySelector("main")!;
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

document.addEventListener("DOMContentLoaded", async function () {
  await generateQuestions();
  showQuiz();
});
