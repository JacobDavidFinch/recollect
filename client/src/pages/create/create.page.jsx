import React, {useState} from 'react';
import {Container, Paper, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import "./create.page.css"

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },

  }));

const InputComponent = ({name, label, control}) => {
    return (
        <Grid item xs={12} sm={6} xl={4}>
            <Controller as={TextField} fullWidth variant="outlined" label={name} name={name} control={control} defaultValue="" />
        </Grid>
    )
}

const CreatePage = () => {
    const { handleSubmit, control, register, errors } = useForm();
    const onSubmit = values => {
      console.log(values);
    };
    const classes = useStyles();

    return (
        <Paper>
            <Grid container spacing={3}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="createLinkForm__inputContainer">
                <InputComponent control={control} name="name"/>
                <InputComponent control={control} name="summary" />
                <InputComponent control={control} name="whatItConnectsTo" />
                <InputComponent control={control} name="bigIdea" />
                <InputComponent control={control} name="whatINeedItFor" />
                <InputComponent control={control} name="simpleExplanation" />
                <InputComponent control={control} name="whenIWouldUse" />
                <InputComponent control={control} name="furtherQuestions" />
                <InputComponent control={control} name="example" />
                <InputComponent control={control} name="howToRecall" />
                <InputComponent control={control} name="itsLike" />
                </div>
                <button type="submit">Submit</button>
                </form>
            </Grid>
        </Paper>
    );
}

export default CreatePage;
