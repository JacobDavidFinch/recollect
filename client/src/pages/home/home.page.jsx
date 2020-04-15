import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect, createStructuredSelector, selectAllUser  } from '../../redux/redux-imports';
import {Container, Paper, Grid, Card, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import './home.page.scss';

import {Add, Edit} from '@material-ui/icons';

const useStyles = makeStyles({
    card: {
      padding: '10px',
      height: '100%'
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
                {list.map((item, i) => {
                    const textDisplay = typeof item !== "string" ? item.join(" | ") : item;
                    return <Link key={item} className="tests__test-btn" to={`/test/?test=${i}`} onClick={() => getTest(item)}>
                                <Button variant="contained" color="primary">{textDisplay}</Button>
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

const LastTestDisplay = ({test}) => {
    console.log(test);
    if(!test) return (<div>Couldn't find a previous test</div>)
    return (
        <div>Last Test Was: 
            <div>
                <Link to='/test'>
                    <Button variant="contained" color="primary">{test.join(' | ')}</Button>
                </Link>
            </div>
        </div>)
}

const HomePage = ({user = {}}) => {
    const { tests = [], userName, userStatus } = user;
    const classes = useStyles();

    return (
        <Paper>
            <Grid container style={{padding: '5px', height: '100%'}} spacing={1}>
                <Grid item sm={6} xs={12} >
                    <Card className={classes.card}>
                        <h2>Pick Up Where You Left Off</h2>
                        <LastTestDisplay status='resolved' test={tests[tests.length - 1]} />
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
                        <RecentListDisplay status='resolved' list={tests} />
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}


const mapStateToProps = createStructuredSelector({
    user: selectAllUser,
  });
  
  export default connect(
    mapStateToProps,
    null
  )(HomePage);

