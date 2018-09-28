import React, { Component } from 'react';
import { questionService } from '../../services/questionService';
import QuestionItem from '../components/QuestionItem';
import "./Quiz.css";

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            answers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
            errorMessage: "",
            finish: false,
            answerCounter: 0,
            required: false,
        }

        this.loadQuestions = this.loadQuestions.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.handleQuizSubmission = this.handleQuizSubmission.bind(this);
        this.handleClickedAnswer = this.handleClickedAnswer.bind(this);
        this.handleReload = this.handleReload.bind(this);
    }

    componentDidMount() {
        this.loadQuestions();
    }

    loadQuestions() {
        questionService.fetchEasyQuiz()
            .then(res => {
                this.setState({
                    questions: res
                });
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error
                });
            });
    }

    renderQuestions() {
        const { questions, finish, answers } = this.state;
        if (!questions) {
            return <div>Loading Quiz</div>
        }
        return questions.map((q, i) => {
            return <QuestionItem key={i} q={q} finish={finish} handleClickedAnswer={this.handleClickedAnswer} answers={answers} />
        })
    }

    handleClickedAnswer(e, correct, id) {
        let myAnswer = {};
        let { answers } = this.state;

        if (e.target.value === correct) {
            myAnswer = {
                id,
                answer: true,
                clickedResponse: e.target.value
            };

            answers.splice(id, 1, myAnswer);
            this.setState({
                answers,
            });
        }

        if (e.target.value !== correct) {
            myAnswer = {
                id,
                answer: false,
                clickedResponse: e.target.value
            }
            answers.splice(id, 1, myAnswer);
            this.setState({
                answers,
            });
        }
    }

    handleQuizSubmission(e) {
        e.preventDefault();

        const { answers } = this.state;
        let correctCounter = 0;
        let results = answers.map(r => typeof r);

        if (results.includes("string")) {
            return this.setState({
                required: true
            });
        }

        return answers.map((a) => {
            if (a.answer === false) {
                return;
            }
            correctCounter += 1;
            return this.setState({
                finish: true,
                finalScore: correctCounter,
                required: false,
            });
        });
    }

    handleReload() {
        window.location.reload();
        this.loadQuestions()
    }

    render() {
        return (
            <div id="quiz-container">
                <div>
                    {this.state.errorMessage !== "" ? "Couldn't load countries" : ""}
                </div>
                <ol id="questions-list">
                    {this.renderQuestions()}
                </ol>
                <input type="button" value="Submit answers" onClick={this.handleQuizSubmission}/>
                <input type="button" value="Reload questions" onClick={this.handleReload} />
                <p>{this.state.required === true ? "You must answer all questions" : ""} </p>
                <p>{this.state.finish === true ? this.state.finalScore + "/20" : ""} </p>
            </div>
        );
    }
}

export default Quiz;