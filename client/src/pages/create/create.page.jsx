import React, {useState} from 'react';
import {Container, Paper, Grid, Card} from '@material-ui/core';
import { useForm } from "react-hook-form";

const CreatePage = () => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
      console.log(values);
    };

    return (
        <Paper>
            <Grid container spacing={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" />
                <input name="links" />
                <input name="summary" type="number" />
                <input name="whatItConnectsTo" />
                <input name="bigIdea" />
                <input name="whatINeedItFor" />
                <input name="simpleExplanation" />
                <input name="whenIWouldUse" />
                <input name="furtherQuestions" />
                <input name="example" />
                <input name="howToRecall" />
                <input name="itsLike" type="submit" />
                
                    <button type="submit">Submit</button>
                </form>
            </Grid>
        </Paper>
    );
}

export default CreatePage;
