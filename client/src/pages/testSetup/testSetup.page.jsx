import React, {useState} from 'react';
import { Paper, Grid, Fab, Button} from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Add, Remove} from '@material-ui/icons';

import { selectTags, selectCurrentUser } from '../../redux/user/user.selectors';
import { createTest } from '../../redux/user/user.actions';

import { Dropdown } from '../../components';
import './testSetup.css';

const SelectTests = ({tags = [], user: {userName}, createTest}) => {
  console.log(tags);
  const [value, setValue] = useState('')
  const [list, setList] = useState([]);

  const addToList = (list, value) => setList([...list, value]);
  const removeFromList = (list, value) => {
    const index = list.indexOf(value);
    console.log(index);
    setList([...list.slice(0, index), ...list.slice(index + 1)]);
  }
  const isTagInList = (list, tag) => list.reduce((acc, curr) => {
    if(acc)return true;
    debugger;
    return curr === tag;
  }, false) 
  console.log(value);
  console.log(isTagInList(tags, value));
  console.log(list);

  function handleClick() {
    //TODO: Create API to fetch items specified
    console.log('sending out api for list');
  }

  const tagType = isTagInList(list, value);
  const updateList = item => setList(list.indexOf(item) >= 0 ? [...list.slice(0, list.indexOf(item)), ...list.slice(list.indexOf(item) + 1)] : [...list, item]);

  return (
    <Grid className="test-select">
        <h3>Select topics that you would like to be in this study set</h3>
        <div className="test-select__container">
          <Dropdown
              list={tags}
              value={value}
              setValue={setValue}
              />
          <Fab color="primary" onClick={() => tagType ? removeFromList(list, value) : addToList(list, value) } aria-label={tagType ? 'plus' : 'minus'}>
            {tagType ? <Remove /> : <Add />}
          </Fab>
        </div>
          <h4>Tags Featured In New Test:   </h4>
           {
            list && list.length ? list.map(item => <li key={item}>{item}</li>) : <li>No Tags Selected</li>
          }
          <Button color="primary" style={{marginTop: '15px'}} variant="contained" onClick={() => createTest(userName, list)}>Create Test</Button>
       
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  tags: selectTags,
  user: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  createTest: (userName, tags) => dispatch(createTest(userName, tags))
});

const SelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTests);

export { SelectContainer };

const TestSetupPage = () => (
    <Paper>
         <SelectContainer/>
    </Paper>
);

export default TestSetupPage;