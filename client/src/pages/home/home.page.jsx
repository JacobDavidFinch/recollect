import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {getUser, useQuery} from '../../utils/reactQuery'
import cuid from 'cuid';
import { useGlobalState } from '../../Context/globalContext';
import {EditModal} from '../../components/modal/modal.edit'
import {Container, Paper, Grid, Card, Button, InputLabel, Select, MenuItem} from '@material-ui/core'
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

const RecentListDisplay = ({status, list, globalDispatch}) => {
    console.log(status);
    console.log(list);
    const getTest = (item) => {
        console.log(item);
    }

    const isList = (list) => {
        if(list && list.length){
            return (<div style={divStyle}>
                {list.map((item, i) => {
                    const textDisplay = typeof item !== "string" ? item.join(" | ") : item;
                    return <Link key={item} className="tests__test-btn" to={`/test/?test=${i}`} onClick={() => getTest(item)}>
                                <Button onClick={() => globalDispatch({type: "test", payload: list})} variant="contained" color="primary">{textDisplay}</Button>
                            </Link>
                })}
            </div>)
        }
    }

    const displayByStatus = ({status, fn, fnArg}) => {
       const display = {
        'idle': <div>Isn't loading</div>,
        'pending': <div>Pending</div>,
        'rejected': <div>Error loading</div>,
        'resolved': fn(fnArg)
       }[status];
       return display ? display : (<div>loading</div>)
    }
    return displayByStatus({status, fn: isList, fnArg: list})
}

const LastTestDisplay = ({test, globalDispatch}) => {
    console.log(test);
    if(!test) return (<div>Couldn't find a previous test</div>)
    return (
        <div>Last Test Was: 
            <div>
                <Link to='/test'>
                    <Button variant="contained" onClick={() => globalDispatch({type: "test", payload: test})} color="primary">{test.join(' | ')}</Button>
                </Link>
            </div>
        </div>)
}

const SelectTest = ({tests, globalDispatch}) => {
    const [value, setValue] = useState('');

    const handleDropdown = (test) => {
        setValue(test);
        return globalDispatch({type: "test", payload: test})
    }

    return (
        <>
            <InputLabel id="demo-simple-select-label">Select Test</InputLabel>
            <Select
            onChange={handleDropdown}
            >
                {tests.map((test, i) => (
                <MenuItem key={cuid()} value={value}>
                    <Link key={test} className="tests__test-btn" to={`/test/?test=${i}`} >
                        {tests.join(' | ')}
                    </Link>
                </MenuItem>))}
            </Select>
        </>
    )
}

export const HomePage = () => {
    const {state, dispatch} = useGlobalState();
    const { tags, userName, editCardMode, editCardIndex } = state;
    const { status, data: user = {}, error, isFetching } = useQuery("user", () => getUser(userName), {staleTime: 120000});
    console.log(user);
    const {tests = []} = user;
    const classes = useStyles();


    return (
        <Paper>
            <Grid container style={{padding: '5px', height: '100%'}} spacing={1}>
                <Grid item sm={6} xs={12} >
                    <Card className={classes.card}>
                        <h2>Pick Up Where You Left Off</h2>
                        <LastTestDisplay status='resolved' globalDispatch={dispatch} test={tests[tests.length - 1]} />
                    </Card>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Card className={classes.card}>
                        <h2>Create New Test</h2>
                        <Link to='/create-test'><Add/></Link>
                    </Card>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Card className={classes.card}>
                        <h2>
                            Create New Cards
                        </h2>
                        <Link to='/create-card'><Add/></Link>

                    </Card>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Card className={classes.card}>
                        <h2>Edit Existing Cards</h2>
                        <Link to="/edit-cards"><Edit/></Link>
                    </Card>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Card className={classes.card}>
                        <h2>Start Test</h2>
                        <SelectTest tests={tests} globalDispatch={dispatch} />
                    </Card>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Card className={classes.card}>
                        <h2>All your recent tests</h2>
                        <div>Recent tests:</div>
                        <RecentListDisplay status='resolved' globalDispatch={dispatch} list={tests} />
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}


// const mapStateToProps = createStructuredSelector({
//     user: selectAllUser,
//   });

export default HomePage;
