import React, { Component } from 'react';
import { questionService } from '../../services/questionService';
import QuestionItem from '../components/QuestionItem';

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            errorMessage: "",
            finish: false,
            answerCounter: 0
        }
        this.renderQuestions = this.renderQuestions.bind(this);
        this.handleQuizSubmission = this.handleQuizSubmission.bind(this);
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
            return <QuestionItem key={i} q={q} finish={finish} handleQuizSubmission={this.handleQuizSubmission} />
        })
    }

    // incrementAnswerCounter() {
    //     this.setState(prevState => ({
    //         answerCounter: prevState.answerCounter + 1
    //     }))
    // }

    handleQuizSubmission(e) {
        console.log(e);

        e.preventDefault();
        this.setState({
            finish: true
        })

    }
    render() {
        return (
            <div>
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