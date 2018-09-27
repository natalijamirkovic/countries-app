import React from 'react';
import "./QuestionItem.css";
import Answer from './Answer';


const QuestionItem = (props) => {

    const { id, question, correctAnswer, incorrectAnswers, handleClickedAnswer } = props.q;
    // console.log(props);
    

    let displayWrong = incorrectAnswers.map((a, i) => {
        // console.log(a);

        return <Answer wrong={a} answer={correctAnswer} id={id} key={i} handleClickedAnswer={props.handleClickedAnswer} />
    })

    return (
        <li>
            <h4> {question} </h4>
            {displayWrong}
            <Answer correct={correctAnswer} id={id} handleClickedAnswer={props.handleClickedAnswer} />
        </li>
    )
}

export default QuestionItem;



{/* <li>
    <h4> {question} </h4>                                   pitanje
    {displayWrong}                                          var u koju smo smjestili tri netacna odgovora koja smo mapirali i kroz propse proslijedili netacan odg. kroz props (wrong=a) kao i tacan (answer = {correctAnswer})
    <Answer correct={correctAnswer} id={id} />  proslijedili tacan odg (correct={correctAnswer})
</li> */}