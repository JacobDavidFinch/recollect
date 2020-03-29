import React, {useState} from 'react';
import {  InputLabel, MenuItem, Select, FormControl, Paper, Grid, Button, Fab } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add';

import { selectTags } from './redux/user/user.selectors';
import { createTest } from './redux/user/user.actions';

import { Dropdown } from '../../components';
import './testSetup.css';

const SelectContainer = ({tagsList = []}) => {
  const [list, setList] = useState([]);

  function getTest() {
    //TODO: Create API to fetch items specified
    console.log('sending out api for list');
  }

  const editList = item => setList(list.indexOf(item) >= 0 ? [...list.slice(0, list.indexOf(item)), ...list.slice(list.indexOf(item) + 1)] : [...list, item]);

  // const list = ['React', 'JavaScript', 'Jest', 'TypeScript', 'Study Methods']

  return (
    <Grid>
        <h3>Select topics that you would like to be in this study set</h3>
        <Dropdown
            list={tagsList}
            setListsSelected={setListSelected}
            listSelected={listSelected}
        />
      <Fab color="primary" onClick={handleClick} aria-label="add">
        <AddIcon />
      </Fab>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  tagsList: selectTags
});

const mapDispatchToProps = dispatch => ({
  createTest: createTest
});

connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectContainer);

export { SelectContainer };

const TestSetupPage = () => (
    <Paper>
         <SelectContainer/>
    </Paper>
);

export default TestSetupPage;