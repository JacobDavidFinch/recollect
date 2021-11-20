import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@material-ui/core';

export const Dropdown = ({ setValue, value, list }) => {
  const handleChange = (e) => setValue(e.target.value);
 
  return (
    <div className="dropdown-container">
     <FormControl>
        <InputLabel id="demo-customized-select-label">Topic</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={value}
          onChange={(e) => handleChange(e)}
          style={{width: '400px'}}
        >
          {list.map((item, key) => (
              <MenuItem value={item} key={createKey(item, key)}>{item}</MenuItem>
            ))}
        </Select>
     </FormControl>
    </div>
  );
};

function createKey(item, key) {
  return `${item}-${key}`;
}
