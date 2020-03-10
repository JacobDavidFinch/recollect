import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@material-ui/core';

export const Dropdown = ({ setListSelected, listSelected, list }) => {
  const handleChange = () => {
    console.log('change');
  };

  return (
    <div className="dropdown-container">
     <FormControl>
     <InputLabel id="demo-customized-select-label">Topic</InputLabel>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={listSelected}
        onChange={handleChange}
        style={{width: '400px'}}
      >
        <RenderList list={list} />
      </Select>
     </FormControl>
    </div>
  );
};

function RenderList({list}) {
  return list.map((item, key) => (
    <MenuItem key={createKey(item, key)}>{item}</MenuItem>
  ));
}

function createKey(item, key) {
  return `${item}-${key}`;
}
