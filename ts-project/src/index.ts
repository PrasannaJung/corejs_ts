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
    const selected = document.querySelector(
      `input[name="q${qsnIdx}"]:checked`
    ) as HTMLInputElement | null;

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

document.addEventListener("DOMContentLoaded", async function () {
  await generateQuestions();
  showQuiz();
});
