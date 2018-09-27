import axios from "axios";
import { easyQuizEndpoint } from "../shared/constants";
import { Question } from "../entities/Question";

class QuestionService {

    fetchEasyQuiz() {
        return axios.get(easyQuizEndpoint)
        .then((res) => {
            const {results} = res.data;
            return results.map((res, i) => {
                const correctAnswer = res.correct_answer;
                const question = res.question;
                const incorrectAnswers = res.incorrect_answers;

                const myQuestion = new Question(question, correctAnswer, incorrectAnswers, i);
                return myQuestion;
            });
        });
    }
}

export const questionService = new QuestionService();