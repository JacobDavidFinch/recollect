import React, {useState, useEffect, memo} from 'react';
import { Paper, Grid, Fab, Button} from '@material-ui/core';
import {Add, Remove} from '@material-ui/icons';
import { useGlobalState } from '../../Context/globalContext';
import {postTest} from '../../utils/API'
import { Dropdown } from '../../components';
import {equals} from 'ramda';
import './testSetup.css';

const SelectTests = () => {
  const {state = {}} = useGlobalState();
  const {tags, userName} = state;
  console.log(tags);
  
  const [value, setValue] = useState('')
  const [postStatus, setPostStatus] = useState('idle')
  const [list, setList] = useState([]);

  useEffect(() => {
    if(postStatus === 'rejected' || postStatus === 'resolved')setTimeout(() => {
        setPostStatus('idle')
        setValue('')
        setList([])
    }, 1500);
  }, [postStatus])

  const BtnDisplay = ({postStatus, list, tags}) => {
    const btn = (text, styleObj, props) => <Button {...props} color="primary" style={{marginTop: '15px', ...styleObj}} variant="contained" onClick={() => createTest(userName, list)}>{text}</Button>
    const testExists = (list, tags) => tags.reduce((acc, test) => acc ? acc : equals(test, list), false) 
    if(testExists(list, tags)){
      return btn('Test Exists', {}, {disabled: true})
    }
    return ({
    idle: btn("Create Test"),
    pending:btn("Creating Test..."),
    resolved: btn("Test Created!", {backgroundColor: 'green'}),
    rejected: btn("Failed Creating Test", {backgroundColor: 'red'})
  }[postStatus])
}

  const addToList = (list, value) => setList([...list, value]);
  const removeFromList = (list, value) => {
    const index = list.indexOf(value);
    console.log(index);
    setList([...list.slice(0, index), ...list.slice(index + 1)]);
  }
  const isTagInList = (list, tag) => list.reduce((acc, curr) => {
    if(acc)return true;
    return curr === tag;
  }, false) 
  console.log(value);
  console.log(isTagInList(tags, value));
  console.log(list);

  const createTest = async(userName, list) => {
    setPostStatus('pending');
    const result = await postTest(userName, list);
    return result === 'error' ? setPostStatus('rejected') : setPostStatus('resolved')
  }

  const tagType = isTagInList(list, value);
  const updateList = item => setList(list.indexOf(item) >= 0 ? [...list.slice(0, list.indexOf(item)), ...list.slice(list.indexOf(item) + 1)] : [...list, item]);

  return (
    <Paper>
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
            <BtnDisplay postStatus={postStatus} list={list} tags={tags} />
        
      </Grid>
    </Paper>
  );
};

// const mapStateToProps = createStructuredSelector({
//   tags: selectTags,
//   user: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({
//   createTest: (userName, tags) => dispatch(createTest(userName, tags))
// });

// const SelectContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SelectTests);

export default memo(SelectTests);
