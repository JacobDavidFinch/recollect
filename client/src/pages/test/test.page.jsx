import React, {useState} from 'react';
import { useGlobalState } from '../../Context/globalContext';
import {Container, Paper, TextField, Card} from '@material-ui/core';
import * as R from 'ramda';

const TestPage = ({cards}) => {

    const {state, dispatch} = useGlobalState();
    console.log([state, dispatch])

    const {test} = state;
    const includedInTag = (test) => tags => {
        return R.difference(test, tags).length !== test.length;
    }
    const testIncludedInTag = includedInTag(test);
    const getCards = (cards) => cards.reduce((acc, curr) => testIncludedInTag(curr.tags) ? {...acc, ...curr} : {...acc}, {})
    const testCards = getCards(cards);

 

    // cardGuess
    // compareCards
        // comments, send whether correct, diff check, pull next card  

    return (
        <div>
            
        </div>
    )
}

const CardGuess = ({card}) => {

    const objFactory = (answer) => ({
        answer,
        guess: ""
    })

    const cardInputObj = Object.keys(card).reduce((acc, keyName) =>  ({...acc, keyName: objFactory(card[keyName])}), {})
    const [cardObj, setCardObj] = useState(cardInputObj)

    return (
        <Paper>
            <form>
                {Object.keys(card).map((keyName) => (<TextField id="outlined-basic" label={keyName} onChange={(e) => setCardObj({...cardObj, keyName: {...cardObj[keyName], guess: e.target.value}})} variant="outlined" />))}
            </form>
        </Paper>
    );
}

export default TestPage;
