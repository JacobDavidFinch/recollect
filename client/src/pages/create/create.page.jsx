import React, {useState} from 'react';
import {Container, Paper, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect, createStructuredSelector, selectAllUser, createCard  } from '../../redux/redux-imports';
import { useForm, Controller } from "react-hook-form";
import "./create.page.css"

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

const CreatePage = ({user, createCard, isEditCard = {}}) => {
    console.log(user);
    const {index, editCard, card} = isEditCard;
    const {tags, tests, userName, userStatus} = user;
    const { handleSubmit, control, register, errors } = useForm();
    const onSubmit = values => {
      console.log(values);
      return card ? editCard(userName, values, index) : createCard(userName, values);
    };
    const classes = useStyles();

    return (
        <Paper>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} alignItems="center" className={classes.container}>
                        <InputComponent control={control} label={"Name"} xl={4} sm={4} name="name"/>
                        <InputComponent control={control} rows="4" label={"Summary"} md={12} lg={12} xl={12} sm={12} multiline name="summary" />
                        <InputComponent control={control} label={"What It Connects To"} rows="4"  xl={6} sm={12} multiline name="whatItConnectsTo" />
                        <InputComponent control={control} label={"Big Idea"} rows="4" xl={6} sm={12} lg={6} multiline name="bigIdea" />
                        <InputComponent control={control} rows="4" label={"What I Need It For"} xl={6} sm={12} multiline name="whatINeedItFor" />
                        <InputComponent control={control} rows="4" label={"Simple Explanation"} xl={6} sm={12} multiline name="simpleExplanation" />
                        <InputComponent control={control} rows="4" label={"What I Would Use"} xl={6} sm={12} multiline name="whenIWouldUse" />
                        <InputComponent control={control} rows="4" label={"Further Questions"} xl={6} sm={12} multiline name="furtherQuestions" />
                        <InputComponent control={control} rows="4" label={"Example"} xl={6} sm={12} multiline name="example" />
                        <InputComponent control={control} rows="4" label={"How To Recall"} xl={6} sm={12} multiline name="howToRecall" />
                        <InputComponent control={control} rows="4" label={"It's Like"} xl={6} sm={12} multiline name="itsLike" />
                        <InputComponent control={control} rows="4" label={"Web Links"} xl={6} sm={12} multiline name="webLinks" />
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

const mapStateToProps = createStructuredSelector({
    user: selectAllUser,
  });
  
  const mapDispatchToProps = dispatch => ({
    createCard: (user, values) => dispatch(createCard(user, values))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreatePage);
