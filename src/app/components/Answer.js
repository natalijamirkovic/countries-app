import React from 'react';

const Answer = (props) => {
    // console.log(props);

    const { correct, wrong, answer, id, handleClickedAnswer } = props;
    let rightAnswer = correct || answer;
    const displayAnswers = () => {                  //funkcija koja provjerava sta nam je proslijedjeno kroz propse(tacan ili netacan odg) 

        if (correct) {
            // console.log("ispisujem tacan odg" + correct);
            return correct;
        }
        // console.log("netacan odg:" + wrong);

        return wrong;
    }

    return (
        <div>
            <input type="radio" name={props.id} value={displayAnswers()} onClick={(e) => handleClickedAnswer(e, rightAnswer, id)}/>
            {displayAnswers()}
        </div>

    );
};

export default Answer;