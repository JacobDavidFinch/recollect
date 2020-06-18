import React, {useState, useMemo} from 'react';
import { useGlobalState } from '../../Context/globalContext';
import {getCards, useQuery} from '../../utils/reactQuery';
import { Button } from '@material-ui/core';
import {includedInTag, getTestCards} from './test.helpers'
import {CardGuess} from './test.components'

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


export default TestPage;

/*

left/right corner card switch
bottom right submit test
comments input
bottom right correct/wrong

*/