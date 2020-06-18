import React, {useEffect, useState, useReducer} from 'react';
import {putCardStats} from '../../utils/API'
import {Container, Paper, TextField, Card, Button} from '@material-ui/core';
import "./test.components.scss"

export const BtnContainer = ({testStatus, card, setTestStatus, userName, count, setCount }) => {

    const handleAnswer = (correct) => {
        putCardStats(userName, card, correct);
        setCount(count + 1);
    }

    return (
        <div>
            {testStatus === "guess" ? (
                <Button onClick={() => setTestStatus("answer")}>Final Answer</Button>
            ) : (
                <>
                    <Button onClick={() => handleAnswer(true)}>Correct</Button>
                    <Button onClikc={() => handleAnswer(false)}>Wrong</Button>
                </>
            )}
        </div>
    )
}

export const Attributes = ({name, hints, attempted, correct, lastAttempted }) => (
    <div>
        <h2>Card: {name}</h2>
        {hints && hints.length && (
            <ul>
            {hints.map((hint, i) => (
                <li key={hint + i}>{hint}</li>
            ))}
            </ul>
        )}
        <div>{lastAttempted}</div>
        <div>{attempted ? `${correct/attempted}%` : 'Never Attempted'}</div>
    </div>
)

export const CardGuess = ({card = {}, count, setCount}) => {
    const [testStatus, setTestStatus] = useState("guess");

    useEffect(() => {
        setTestStatus('guess')
    }, [])

    const objFactory = (answer) => ({
        answer,
        guess: ""
    })

    const cardInputReducer = (state, action) => {
        if(action.type === "comments"){
            return {
                ...state,
                attributes: {
                    ...state.attributes,
                    comments: [action.payload]
                }
            }
        }
        return {
            ...state,
            inputs: {
                ...state.inputs,
                [action.type]: action.payload
            }
        }
    }

    const cardInitialObjReducer = (acc, keyName) => {
        const dontInclude = ["tags"];
        if(dontInclude.includes(keyName))return acc; 
        return ({
            ...acc,
            ...!cardListAttributes.includes(keyName) ? 
            {inputs: {
                    ...acc.inputs, 
                    [keyName]: {...objFactory(card[keyName])}
            }}
            :
             {
                attributes: {
                    ...acc.attributes, 
                    [keyName]: card[keyName] 
                }
            }
        })
    }

    const cardListAttributes = ['name', 'hints ', 'attempted', 'correct', 'lastAttempted', 'comments'];
    
    console.log(card);
    const cardInputObj = Object.keys(card).reduce(cardInitialObjReducer, {});
    const [cardObj, dispatchCardObj] = useReducer(cardInputReducer, cardInputObj);
    console.log(cardObj);

    return (
        <Paper className="test-container">
            <Attributes {...cardObj.attributes}/>
            {testStatus === "guess" ? (
                <form className="guess-form">
                    {Object.keys(cardObj.inputs).map((keyName) => (<TextField id="outlined-basic" label={keyName} rows={3} multiline value={cardInputObj.inputs[keyName].guess} onChange={(e) => dispatchCardObj({type: [keyName], payload: e.target.value})} variant="outlined" />))}
                </form>
            ) : (
                <div>
                    <form>
                    {Object.keys(cardObj.inputs).map(keyName => (
                        <div>
                            <p>Guess: {cardObj.inputs[keyName].guess}</p>
                            <br></br>
                            <p>Answer: {cardObj.inputs[keyName].answer}</p>
                        </div>
                    ))}
                    <TextField id="outlined-basic" label={"comments"} value={cardInputObj.attributes.comments} onChange={(e) => dispatchCardObj({type: "comments", payload: e.target.value})} variant="outlined" />
                    </form>
                </div>
            )}
            <BtnContainer testStatus={testStatus} setTestStatus={setTestStatus} count={count} setCount={setCount} />
        </Paper>
    );
}