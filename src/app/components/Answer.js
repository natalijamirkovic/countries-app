import React from 'react';
import "./Answer.css";

const Answer = (props) => {

    const { correct, wrong, answer, id, handleClickedAnswer, finish } = props;
    let rightAnswer = correct || answer;

    const displayAnswers = () => {                  //funkcija koja provjerava sta nam je proslijedjeno kroz propse(tacan ili netacan odg) 
        if (correct) {
            return correct;
        }
        return wrong;
    }

    const colorAnswers = () => {
        let color;
        const { answers } = props;

        answers.map((givenAnswer) => {
            if (givenAnswer.id === id) {
                if (givenAnswer.answer === false) {
                    if (givenAnswer.clickedResponse === wrong) {
                        return color = "red";
                    }
                    return;
                }
                if (givenAnswer.answer === true) {
                    if (givenAnswer.clickedResponse === correct) {
                        return color = "green";
                    }
                }
            }
        });

        return color;
    }

    return (
        <div className={finish === true ? colorAnswers() : ""} >
            <input type="radio" name={props.id} value={displayAnswers()} onClick={(e) => handleClickedAnswer(e, rightAnswer, id)} className="bla" />
            {displayAnswers()}
        </div>
    );
};

export default Answer;