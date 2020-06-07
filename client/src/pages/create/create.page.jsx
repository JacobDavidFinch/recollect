import React, {useState,useEffect, useReducer, memo} from 'react';
import {Container, Paper, Grid, TextField, Button, Checkbox } from '@material-ui/core';
import {getUser, useQuery} from '../../utils/reactQuery'
import { useGlobalState } from '../../Context/globalContext'
import {postCard, putCard} from '../../utils/API'
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import "./create.page.css"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const InputComponent = ({name, value, onChange, label, register, xs = 12, sm = 6, xl = 4, lg = 6, ...props}) => {
 
    return (
        <Grid item xs={xs} sm={sm} lg={lg} xl={xl}>
            <TextField {...props} value={value} onChange={onChange} inputRef={register} fullWidth variant="outlined" label={label} name={name} defaultValue="" />
        </Grid>
    )
}

const recomendedInputs = [
    "Summary", "What It Connects To", "Big Idea", "What I Need It For", "Simple Explanation", "When I Would Use", "Further Questions", "Example", "How To Recall", "It's Like", "Web Links"
]

const AddInputs = ({valueObj, dispatch, name, label, register, xs = 12, sm = 6, xl = 4, lg = 6, ...props}) => {
    const [inputIterator, setInputIterator] = useState([]);
    const [value, setValue] = useState('');
    console.log([value, inputIterator]);

    const createInput = () => {
        setInputIterator([...inputIterator, value]);
        setValue('');
    }

    const inputMap = () => inputIterator.map((input, i) => (  <InputComponent value={valueObj[input]} onChange={e => dispatch({type: "change", payload: {[input]: e.target.value}})} rows="3" multiline name={input} key={input + i} label={input} xs={12} lg={6} />));

    return (
        <>
            {inputMap()}
            {inputIterator.length % 2 !== 0 && (
                           <Grid item  xs={12} sm={6} xl={4} lg={6}/>
            )}
            <Grid item  xs={12} sm={6} xl={4} lg={6} >
                <Autocomplete {...props}
                    id="free-solo-demo"
                    onChange={(e) => setValue(e.target.textContent)}
                    
                    // onInputChange={(e) => setValue(e.target.value)}
                    freeSolo
                    options={recomendedInputs.map((input) => input)}
                    renderInput={(params) => (
                        <TextField {...params} fullWidth variant="outlined" value={value} inputProps={{form: "inputEntry", type: "text" }} onKeyDown={e => console.log(e)} onChange={(e) => setValue(e.target.value)} label={"Input Key"} />
                        )}
                        />
            </Grid>
            <Button variant="contained" color="secondary"  OnEnter={e => {
                            createInput(e);
                            console.log('here');
                            e.stopPropagation();
                        }} onClick={createInput}>Create Input</Button>
        </>
    )
}

const AddTags = ({ setTagsValue, tags = []}) => {
    return (
            <Grid item item  xs={12}>
                <Autocomplete name="Tags" multiple
                    id="checkboxes-tags-demo"
                    options={tags}
                    name="Tags"
                    onChange={(e, value) => setTagsValue(value)}
                    freeSolo
                    disableCloseOnSelect
                    getOptionLabel={(tags) => tags}
                    renderOption={(tags, { selected }) => (
                        <>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {tags}
                        </>
                    )}
                    
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Tags" placeholder="Favorites" />
                    )} />
            </Grid>
    )
}

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

const FormButton = (props) => {
    const {apiStatus} = props;
    const btnContent = {
        idle: "Submit",
        pending: "Submiting",
        resolved: "Success",
        rejected: "Error",
    }[apiStatus]

    return (
        <Button {...props}>
            {btnContent}
        </Button>
    )

}