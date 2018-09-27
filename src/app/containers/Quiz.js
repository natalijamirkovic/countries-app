import React, { Component } from 'react';
import { questionService } from '../../services/questionService';
import QuestionItem from '../components/QuestionItem';
import "./Quiz.css";

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            answers: [],
            errorMessage: "",
            finish: false,
            answerCounter: 0
        }
        this.renderQuestions = this.renderQuestions.bind(this);
        this.handleQuizSubmission = this.handleQuizSubmission.bind(this);
        this.handleClickedAnswer = this.handleClickedAnswer.bind(this);
    }



    componentDidMount() {
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
        const { questions, finish } = this.state;
        if (!questions) {
            return <div>Loading Quiz</div>
        }
        return questions.map((q, i) => {
            return <QuestionItem key={i} q={q} finish={finish} handleClickedAnswer={this.handleClickedAnswer}/>
        })
    }

    handleQuizSubmission(e) {
        console.log(e);

        e.preventDefault();
        this.setState({
            finish: true
        })
    }

    handleClickedAnswer(e, correct, id) {
        let myAnswer = {}
        console.log(e.target.value);
        console.log(correct);
        let {answers} = this.state;
        
        if(e.target.value == correct) {
            myAnswer = {
                id,
                answer: true
            }
            answers.push(myAnswer) ;
            this.setState({
                answers
            });
           
        }

        if(e.target.value !== correct) {
            myAnswer = {
                id,
                answer: false
            }
            answers.push(myAnswer) ;
            this.setState({
                answers
            });
           
        }
    }



    render() {
        return (
            <div id="quiz-container">
                <div>
                    {this.state.errorMessage !== "" ? "Couldn't load countries" : ""}
                </div>
                <ol>
                    {this.renderQuestions()}
                </ol>
                <input type="button" value="Submit answers" onClick={this.handleQuizSubmission} required />
            </div>
        );
    }
}

export default Quiz;