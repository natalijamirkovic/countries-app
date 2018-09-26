import React, { Component } from 'react';
import "./QuestionItem.css"


class QuestionItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            correctAnswer: false,
            incorrectAnswer: false
        }

        this.mapIncorrectAnswers = this.mapIncorrectAnswers.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer(e) {
        if (e.target.value === "incorrectAnswer") {
            this.setState({
                [e.target.value]: true,
                correctAnswer: false
            });
        };

        if (e.target.value === "correctAnswer") {
            this.setState({
                [e.target.value]: true,
                incorrectAnswer: false
            });
        };

    }

    mapIncorrectAnswers(answers) {
        return answers.map((a) => {
            return <li key={a} className={this.props.finish ? "red" : ""}>
                <input type="radio" name="question" value="incorrectAnswer" onClick={this.handleAnswer}  />{a}
            </li>
        })
    }

    render() {
        const { question, correctAnswer, incorrectAnswers } = this.props.q;
        return (
            <li>
                <h2>{question}</h2>
                <form>
                    <div className={this.props.finish ? "green" : ""} >
                    <input type="radio" name="question" value="correctAnswer" onClick={this.handleAnswer} required/> {correctAnswer} 
                    </div>
                    <ul>
                        {this.mapIncorrectAnswers(incorrectAnswers)}
                    </ul>
                </form>
                <div>
                    {/* {this.props.finish ? "Correct answer is:" + correctAnswer : ""} */}
                </div>
            </li>
        );
    }
};

export default QuestionItem;