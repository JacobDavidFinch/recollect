import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {Container, Paper, Grid, Card, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import {Add, Edit} from '@material-ui/icons';

const useStyles = makeStyles({
    card: {
      padding: '5px',
      margin: '5px'
    },
  });

  const divStyle={display: 'flex', flexDirection: 'row'}

const RecentListDisplay = ({status, list}) => {
    const getTest = (item) => {
        console.log(item);
    }

    const isList = (list) => {
        if(list && list.length){
            return (<div style={divStyle}>
                {list.map(item => {
                    return <Link key={item} to="/test" onClick={() => getTest(item)}>
                             <Button variant="contained" color="primary">{item}</Button>
                            </Link>
                })}
            </div>)
        }
    }

    const displayByStatus = ({status, fn, fnArg}) => {
       return {
        'idle': <div>Isn't loading</div>,
        'pending': <div>Pending</div>,
        'rejected': <div>Error loading</div>,
        'resolved': fn(fnArg)
       }[status]
    }

    return displayByStatus({status, fn: isList, fnArg: list})
}

const LastTestDisplay = ({list}) => {
    if(!list || !list.length) return (<div>Couldn't find a previous test</div>)
    return (<div>Last Test Was: <Link to='/test'>
         <Button variant="contained" color="primary">{list[0]}</Button>
         </Link></div>)
}

const HomePage = ({recentLists}) => {
    const classes = useStyles();

    return (
        <Paper>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12} >
                    <Card className={classes.card}>
                        <h2>Pick Up Where You Left Off</h2>
                        <LastTestDisplay status='resolved' list={['React']} />
                    </Card>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Card className={classes.card}>
                        <h2>Create New Test</h2>
                        <Link to='/testSetup'><Add/></Link>
                    </Card>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Card className={classes.card}>
                        <h2>
                            Create New Cards
                        </h2>
                        <Link to='/create'><Add/></Link>

                    </Card>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Card className={classes.card}>
                        <h2>Edit Existing Cards</h2>
                        <Link to="/edit"><Edit/></Link>
                    </Card>
                </Grid>
                <Grid item xs={12} >
                    <Card className={classes.card}>
                        <h2>All your recent tests</h2>
                        <div>Recent tests:</div>
                        <RecentListDisplay status='resolved' list={['React']} />
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default HomePage;

