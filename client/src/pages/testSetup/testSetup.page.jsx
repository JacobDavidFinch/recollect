import React, {useState} from 'react';
import {  InputLabel, MenuItem, Select, FormControl, Paper, Grid, Button, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import { Dropdown } from '../../components';
import './testSetup.css';

const SelectContainer = ({possibleCategories}) => {
  const [listSelected, setListSelected] = useState(null);

  function handleClick() {
    //TODO: Create API to fetch items specified
    console.log('sending out api for list');
  }

  const list = ['React', 'JavaScript', 'Jest', 'TypeScript', 'Study Methods']

  return (
    <Grid>
        <h3>Select topics that you would like to be in this study set</h3>
        <Dropdown
            list={list}
            setListsSelected={setListSelected}
            listSelected={listSelected}
        />
      <Fab color="primary" onClick={handleClick} aria-label="add">
        <AddIcon />
      </Fab>
    </Grid>
  );
};

export { SelectContainer };

const TestSetupPage = () => (
    <Paper>
         <SelectContainer/>
    </Paper>
);

export default TestSetupPage;