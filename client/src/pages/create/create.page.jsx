import React, {useState,useEffect, useReducer, memo} from 'react';
import {Container, Paper, Grid, TextField, Button, Checkbox } from '@material-ui/core';
import {getUser, useQuery} from '../../utils/reactQuery'
import { useGlobalState } from '../../Context/globalContext'
import {postCard, putCard} from '../../utils/API'
import { makeStyles } from '@material-ui/core/styles';
import {AddInputs, AddTags, InputComponent, FormButton} from "./create.components"
import "./create.page.css"

const useStyles = makeStyles(theme => ({
        paper : {
            padding: 10
        },
        container: {
            margin: theme.spacing(1),
            width: '99%',
            height: '99%'
        },
  }));

const CreatePage = () => {
    
    const {state, dispatch} = useGlobalState();
    const { editCardMode, editCardIndex, tags, userName } = state;
    console.log(editCardMode, editCardIndex);

    const initialFormValues = {
        name: "",
        summary: ""
    }

    const valuesReducer = (state, action) => {
        console.log(action);
        if(action.type === "change"){
            return {
                ...state,
                ...action.payload
            }
        } else if(action.type === "reset"){
            return Object.keys(state).reduce((acc, curr) => ({...acc, [curr]: ""}), {});
        }
    }
    
    const { status, data = {}, error, isFetching } = useQuery("user", () => getUser(userName), {staleTime: Infinity});
    
    const [apiStatus, setApiStatus] = useState('idle');
    const [tagsValue, setTagsValue] = useState([])
    const [formValues, dispatchForm] = useReducer(valuesReducer, initialFormValues)
    const classes = useStyles();
    
    useEffect(() => {;
        setTagsValue([]);
        dispatchForm({type: 'reset'})
    }, [apiStatus])

    const card = data.cards ? data.cards[editCardIndex] : undefined;
    const apiCall = async ({api, args}) => await api(...args) === "error" ? setApiStatus('rejected') : setApiStatus('resolved');

    const onSubmit = async (e) => {
        console.log(e);
        const submitVals = {...formValues, tags: tagsValue}
        console.log(submitVals)
        setApiStatus('pending');
        return await apiCall( card ? {api: putCard , args: [userName, submitVals, state.editCardIndex]} : {api: postCard, args: [userName, submitVals]} );
    }

    return (
        <Paper className={classes.paper}>
                <form noValidate autoComplete="off" onSumbit={e => e.stopPropagation()}>
                    <Grid container spacing={3} alignItems="center" className={classes.container}>
                        <InputComponent value={formValues.name} onChange={(e) => dispatchForm({type: "change", payload: {name: e.target.value}})}label={"Name"} xl={4} sm={4} name="Name"/>
                        <AddTags setTagsValue={setTagsValue} tags={tags} />
                        <InputComponent value={formValues.summary} onChange={(e) => dispatchForm({type: "change", payload: {summary: e.target.value}})} rows="4" label={"Summary"} md={12} lg={12} xl={12} sm={12} multiline name="Summary" />
                    </Grid>
                    <Grid container spacing={3} alignItems="center" className={classes.container}>
                        <AddInputs  valueObj={formValues} dispatch={dispatchForm} />
                    </Grid>
                    <Grid container spacing={3} direction="row" justify="flex-end" className={classes.container}>
                        <FormButton variant="contained" color="primary" onClick={onSubmit} onEnter={onSubmit} apiStatus={apiStatus}>Submit</FormButton>
                    </Grid>
                </form>
        </Paper>
    );
}
  
  export default memo(CreatePage);

