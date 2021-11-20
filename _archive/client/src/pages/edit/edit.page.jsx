import React, {useState, memo} from 'react';
import cuid from 'cuid';
import {getCards, useQuery} from '../../utils/reactQuery'
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../../Context/globalContext';
import CreatePage from "../create/create.page.jsx"
import {Container, Paper, Grid, Card, Button} from '@material-ui/core'

const useStyles = makeStyles({
    container: {
      marginTop: '10px',
      padding: '25px 25px'
    },
    root: {
      position: 'relative',
      padding: '5px 10px',
      margin: '5px 15px',
      minWidth: 350,
      minHeight: 250,
      maxHeight: 250,
      overflow: 'auto'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const EditPage = () => {
    const {state, dispatch} = useGlobalState();
    const classes = useStyles();
    const { tags, editCardMode, editCardIndex, userName } = state;
    const { status, data = {}, error, isFetching } = useQuery("cards", () => getCards(userName), {staleTime: 120000});
    console.log(status);
    console.log(data);
    const cards = data || [];
    // have search input 
    // cards description with edit and scroll

    const handleEditCard = (e) => {
        console.log(e.target["data-index"])
        // handle updating the actually db
        // pull updated db 
    }

    if(editCardIndex){
        return (<CreatePage />)
    }
    return (
    <Paper className={classes.container}>
            <Grid container spacing={3}>
                {cards.length ? cards.map((card, i) => {
                    return (
                    <Card item xs={12} md={6} lg={4} xl={3} className={classes.root} key={cuid()} data-index={i} variant="outlined">
                        <CardContent key={i} i={i} card={card} dispatch={dispatch}/>
                    </Card>
                )
                }) : "No Cards Found"}
            </Grid>
        </Paper>
    )   
  };

  const CardContent = ({card = {}, i, dispatch}) => Object.keys(card).map(keyName => (
        <>
          <Button variant="contained" style={{position: 'absolute', top: '5px', right: '15px'}} onClick={() => dispatch({type: "edit", payload: i})} >Edit</Button>
          <h4>{keyName}</h4>
          <p>{card[keyName]}</p>
        </>
    ))

    //HANDLE attempted, correct, lastAttempted

// const mapStateToProps = createStructuredSelector({
//     cards: selectCards,
//   });
  
//   const mapDispatchToProps = dispatch => ({
//     editCard: (user, values, index) => dispatch(updateCard(user, values, index))
//   });
  
  export default memo(EditPage);
