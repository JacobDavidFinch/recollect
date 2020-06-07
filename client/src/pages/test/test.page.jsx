import React, {useState, useReducer, useEffect, useMemo} from 'react';
import { useGlobalState } from '../../Context/globalContext';
import {getCards, useQuery} from '../../utils/reactQuery';
import {Container, Paper, TextField, Card, Button} from '@material-ui/core';
import {putCardStats} from '../../utils/API'
import * as R from 'ramda';

export const includedInTag = test => (tags = []) => {
    // if any of the tests are in the card tags, it won't return the same length
    return R.difference(test, tags).length !== test.length;
}
export const getTestCards = (cards = [], fn) => cards.reduce((acc, curr) => fn(curr.tags ? curr.tags : curr.Tags) ? [...acc, curr] : acc, [])

const TestPage = ({}) => {
    const [count, setCount] = useState(0);
    const {state, dispatch} = useGlobalState();
    console.log([state, dispatch])
    const {test = [], userName} = state;
    
    const { status, data: cards = [], error, isFetching } = useQuery("cards", () => getCards(userName), {staleTime: 120000});

    const isCardIncludedInTest = includedInTag(test);
    const cardList = useMemo(() => getTestCards(cards, isCardIncludedInTest), [cards]);
    
    if(!test || !test.length){
        return <div>No Test Selected</div>
    } else if (isFetching){
        return <div>Loading ...</div>
    }

    console.log([cards, test, cardList]);

    // cardGuess
    // compareCards
    // comments, send whether correct, diff check, pull next card  
    
    return (
        <div>
            <CardGuess card={cardList[count]} count={count} setCount={setCount} />
            <div>
                <Button disable={count === cardList.length - 1} onClick={() => setCount(count + 1)}>Next</Button>
                <Button disable={count === 0} onClick={() => setCount(count - 1)}>Previous</Button>
            </div>
        </div>
        )
}

const CardGuess = ({card = {}, count, setCount}) => {
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
        const dontInclude = ["Tags", "tags"]
        if(dontInclude.includes(keyName))return acc; 
        return ({
            ...acc,
            ...!cardListAttributes.includes(keyName) ? 
            {inputs: {
                    ...acc.inputs, 
                    ...objFactory(card[keyName])
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
    
    const cardInputObj = Object.keys(card).reduce(cardInitialObjReducer, {});
    const [cardObj, dispatchCardObj] = useReducer(cardInputReducer, cardInputObj);

    return (
        <Paper>
            <Attributes {...cardObj.attributes}/>
            {testStatus === "guess" ? (
                <form>
                    {Object.keys(cardObj.inputs).map((keyName) => (<TextField id="outlined-basic" label={keyName} value={cardInputObj.inputs[keyName].guess} onChange={(e) => dispatchCardObj({type: [keyName], payload: e.target.value})} variant="outlined" />))}
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

const BtnContainer = ({testStatus, card, setTestStatus, userName, count, setCount }) => {

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

const Attributes = ({name, hints, attempted, correct, lastAttempted }) => (
    <div>
        <h2>{name}</h2>
        {hints && hints.length && (
            <ul>
            {hints.map((hint, i) => (
                <li key={hint + i}>{hint}</li>
            ))}
            </ul>
        )}
        <div>{lastAttempted}</div>
        <div>{correct/attempted}%</div>
    </div>
)

export default TestPage;

/*

left/right corner card switch
bottom right submit test
comments input
bottom right correct/wrong

*/