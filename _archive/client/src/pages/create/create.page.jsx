import React, {useState, memo} from 'react';
import {Container, Paper, Grid, TextField, Button, Checkbox } from '@material-ui/core';
import {getUser, useQuery} from '../../utils/reactQuery'
import { useGlobalState } from '../../Context/globalContext'
import {postCard, putCard} from '../../utils/API'
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
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

const InputComponent = ({name, label, register, xs = 12, sm = 6, xl = 4, lg = 6, ...props}) => {
 
    return (
        <Grid item xs={xs} sm={sm} lg={lg} xl={xl}>
            <TextField {...props} inputRef={register} fullWidth variant="outlined" label={label} name={name} defaultValue="" />
        </Grid>
    )
}

const recomendedInputs = [
    "Summary", "What It Connects To", "Big Idea", "What I Need It For", "Simple Explanation", "When I Would Use", "Further Questions", "Example", "How To Recall", "It's Like", "Web Links"
]

const AddInputs = ({name, label, register, xs = 12, sm = 6, xl = 4, lg = 6, ...props}) => {
    const [inputIterator, setInputIterator] = useState([]);
    const [value, setValue] = useState('');
    console.log([value, inputIterator]);

    const createInput = () => {
        setInputIterator([...inputIterator, value]);
        setValue('');
    }

    const inputMap = () => inputIterator.map((input, i) => (  <InputComponent register={register} name={input} key={input + i} label={input} xs={12} lg={6} />));

    return (
        <>
            {inputMap()}
            <Grid item  xs={12} sm={6} xl={4} lg={6}>
                <Autocomplete {...props}
                    id="free-solo-demo"
                    onChange={(e) => setValue(e.target.textContent)}
                    // onInputChange={(e) => setValue(e.target.value)}
                    freeSolo
                    options={recomendedInputs.map((input) => input)}
                    renderInput={(params) => (
                    <TextField {...params} fullWidth variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} label={"Input Key"} />
                    )}
                  />
            </Grid>
            <Button variant="contained" color="secondary" onClick={createInput}>Create Input</Button>
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
    
    const { status, data = {}, error, isFetching } = useQuery("user", () => getUser(userName), {staleTime: 120000});
    
    const [apiStatus, setApiStatus] = useState('idle');
    const [tagsValue, setTagsValue] = useState([])
    const classes = useStyles();

    const card = data.cards ? data.cards[editCardIndex] : undefined;
    const apiCall = async ({api, args}) => await api(...args) === "error" ? setApiStatus('rejected') : setApiStatus('resolved');

    const { handleSubmit, control, register, errors } = useForm();

    const onSubmit = async values => {
        const submitVals = {...values, Tags: tagsValue}
        console.log(submitVals)
        setApiStatus('pending');
        // return await apiCall( card ? {api: putCard , args: [userName, submitVals, state.editCardIndex]} : {api: postCard, args: [userName, submitVals]} );
    }

    return (
        <Paper className={classes.paper}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} alignItems="center" className={classes.container}>
                        <InputComponent register={register} label={"Name"} xl={4} sm={4} name="Name"/>
                        <AddTags setTagsValue={setTagsValue} tags={tags} />
                        <InputComponent register={register} rows="4" label={"Summary"} md={12} lg={12} xl={12} sm={12} multiline name="Summary" />
                    </Grid>
                    <Grid container spacing={3} alignItems="center" className={classes.container}>
                        <AddInputs register={register}/>
                    </Grid>
                    <Grid container spacing={3} direction="row" justify="flex-end" className={classes.container}>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </Grid>
                </form>
        </Paper>
    );
}
  
  export default memo(CreatePage);
