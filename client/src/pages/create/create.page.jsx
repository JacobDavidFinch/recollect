import React, {useState} from 'react';
import {Container, Paper, Grid, Card} from '@material-ui/core'


const CreatePage = () => (
        <Paper>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12} >
                    <Card>Pick Up Where You Left Off</Card>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Card>Start a new topic selection</Card>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Card>Create New Cards</Card>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Card>Edit Existing Cards</Card>
                </Grid>
            </Grid>
        </Paper>
);

export default CreatePage;
