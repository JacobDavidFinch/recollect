import React, {useState} from 'react';
import cuid from 'cuid';
import { connect, createStructuredSelector, selectCards, updateCard  } from '../../redux/redux-imports';
import { makeStyles } from '@material-ui/core/styles';
import CreatePage from "../create/create.page.jsx"
import {Container, Paper, Grid, Card} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
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

const EditPage = ({ cards, editCard }) => {
    const classes = useStyles();
    const [editCardIndex, setEditCardIndex] = useState(null);

    // have search input 
    // cards description with edit and scroll

    const handleEditCard = (e) => {
        console.log(e.target["data-index"])
        // handle updating the actually db
        // pull updated db 
    }

    if(editCardIndex){
        return (<CreatePage card={cards[editCardIndex]} isEditCard={{index: editCardIndex, editCard, card:cards[editCardIndex]}} />)
    }
    return (
    <Paper>
            <Grid container spacing={3}>
                {cards.map((card, i) => {
                    return (
                    <Card className={classes.root} key={cuid()} data-index={i} variant="outlined">
                        {card ? card.name : null}
                    </Card>
                )
                })}
            </Grid>
        </Paper>
    )   
  };

const mapStateToProps = createStructuredSelector({
    cards: selectCards,
  });
  
  const mapDispatchToProps = dispatch => ({
    editCard: (user, values, index) => dispatch(updateCard(user, values, index))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditPage);
