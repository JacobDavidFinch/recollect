import React, {useState, memo} from 'react';
import {Container, Paper, Grid, TextField, Button } from '@material-ui/core';
import { useGlobalState } from '../../Context/globalContext'
import {postCard, putCard} from '../../utils/API'
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import "./create.page.css"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
        container: {
            margin: theme.spacing(1),
            width: '100%'
        },
  }));

const InputComponent = ({name, label, control, xs = 12, sm = 6, xl = 4, lg = 6, ...props}) => {
 
    return (
        <Grid item xs={xs} sm={sm} lg={lg} xl={xl}>
            <Controller as={TextField} {...props} fullWidth variant="outlined" label={label} name={name} control={control} defaultValue="" />
        </Grid>
    )
}

const AutoCompleteComponent = ({name, label, control, xs = 12, sm = 6, xl = 4, lg = 6, ...props}) => {
 
    return (
        <Grid item xs={xs} sm={sm} lg={lg} xl={xl}>
            <Controller as={Autocomplete} {...props}  multiple
                id="checkboxes-tags-demo"
                options={top100Films}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                    </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
                )} />
        </Grid>
    )
}

const AddInputs = ({control}) => {
    const [inputIterator, setInputIterator] = useState([]);
    const [value, setValue] = useState('');

    const createInput = () => {
        setInputIterator([...inputIterator, value]);
        setValue('');
    }

    const inputMap = () => inputIterator.map((input, i) => <InputComponent control={control} label={input} md={4} xs={4} lg={4} xl={4} name={"input" + i} />);

    return (
        <>
            {inputMap()}
            <Grid item  xs={12} sm={6} xl={4} lg={6}>
                <TextField fullWidth variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} label={"Input Key"} defaultValue="Input" />
            </Grid>
            <Button variant="contained" color="primary" onClick={createInput}>Create Input</Button>
        </>
    )
}

const AddTags = ({control}) => {
    const [tagIterator, setTagIterator] = useState(0);

    const tagsMap = () => {
        const tagInput = [];
        for(let i = 0; i <= tagIterator; i++){
            tagInput.push(<InputComponent control={control} label={"Tag"} name={"tag" + i} />);
        }
        return tagInput;
    }

    return (
        <>
            {tagsMap()}
            <Button variant="contained" color="primary" onClick={() => setTagIterator(tagIterator + 1)}>Add Tag</Button>
        </>
    )
}

const CreatePage = ({tags, tests, userName, status, card, editCardIndex}) => {
    const [apiStatus, setApiStatus] = useState('idle');
    const {state, dispatch} = useGlobalState();

    const apiCall = async ({api, args}) => await api(...args) === "error" ? setApiStatus('rejected') : setApiStatus('resolved');

    const { handleSubmit, control, register, errors } = useForm();

    const onSubmit = async values => {
        console.log(values)
        setApiStatus('pending');
        return await apiCall( card ? {api: putCard , args: [userName, values, state.editCardIndex]} : {api: postCard, args: [userName, values]} );
    }
    const classes = useStyles();

    return (
        <Paper>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} alignItems="center" className={classes.container}>
                        <InputComponent control={control} label={"Name"} xl={4} sm={4} name="name"/>
                        <InputComponent control={control} rows="4" label={"Summary"} md={12} lg={12} xl={12} sm={12} multiline name="Summary" />
                        <InputComponent control={control} label={"What It Connects To"} rows="4"  xl={6} sm={12} multiline name="What It Connects To" />
                        <InputComponent control={control} label={"Big Idea"} rows="4" xl={6} sm={12} lg={6} multiline name="Big Idea" />
                        <InputComponent control={control} rows="4" label={"What I Need It For"} xl={6} sm={12} multiline name="What I Need It For" />
                        <InputComponent control={control} rows="4" label={"Simple Explanation"} xl={6} sm={12} multiline name="Simple Explanation" />
                        <InputComponent control={control} rows="4" label={"What I Would Use"} xl={6} sm={12} multiline name="When I Would Use" />
                        <InputComponent control={control} rows="4" label={"Further Questions"} xl={6} sm={12} multiline name="Further Questions" />
                        <InputComponent control={control} rows="4" label={"Example"} xl={6} sm={12} multiline name="Example" />
                        <InputComponent control={control} rows="4" label={"How To Recall"} xl={6} sm={12} multiline name="How To Recall" />
                        <InputComponent control={control} rows="4" label={"It's Like"} xl={6} sm={12} multiline name="It's Like" />
                        <InputComponent control={control} rows="4" label={"Web Links"} xl={6} sm={12} multiline name="Web Links" />
                    </Grid>
                    <Grid container spacing={3} alignItems="center" className={classes.container}>
                        <AddInputs control={control}/>
                    </Grid>
                    <Grid container spacing={3} alignItems="center" className={classes.container}>
                        <AddTags control={control}/>
                    </Grid>
                    <Grid container spacing={3} direction="row" justify="flex-end" className={classes.container}>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </Grid>
                </form>
        </Paper>
    );
}
  
  export default memo(CreatePage);
