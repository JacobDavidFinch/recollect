import React, {useState,useEffect, useReducer, memo} from 'react';
import { Grid, TextField, Button, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {recomendedInputs} from './create.helpers';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const InputComponent = ({name, value, onChange, label, register, xs = 12, sm = 6, xl = 4, lg = 6, ...props}) => {
 
    return (
        <Grid item xs={xs} sm={sm} lg={lg} xl={xl}>
            <TextField {...props} value={value} onChange={onChange} inputRef={register} fullWidth variant="outlined" label={label} name={name} defaultValue="" />
        </Grid>
    )
}

export const FormButton = (props) => {
    const {apiStatus} = props;
    const btnContent = {
        idle: "Submit",
        pending: "Submiting",
        resolved: "Success",
        rejected: "Error",
    }[apiStatus]

    return (
        <Button {...props}>
            {btnContent}
        </Button>
    )

}

export const AddInputs = ({valueObj, dispatch, name, label, register, xs = 12, sm = 6, xl = 4, lg = 6, ...props}) => {
    const [inputIterator, setInputIterator] = useState([]);
    const [value, setValue] = useState('');
    console.log([value, inputIterator]);

    const createInput = () => {
        setInputIterator([...inputIterator, value]);
        setValue('');
    }

    const inputMap = () => inputIterator.map((input, i) => (  <InputComponent value={valueObj[input]} onChange={e => dispatch({type: "change", payload: {[input]: e.target.value}})} rows="3" multiline name={input} key={input + i} label={input} xs={12} lg={6} />));

    return (
        <>
            {inputMap()}
            {inputIterator.length % 2 !== 0 && (
                           <Grid item  xs={12} sm={6} xl={4} lg={6}/>
            )}
            <Grid item  xs={12} sm={6} xl={4} lg={6} >
                <Autocomplete {...props}
                    id="free-solo-demo"
                    onChange={(e) => setValue(e.target.textContent)}
                    
                    // onInputChange={(e) => setValue(e.target.value)}
                    freeSolo
                    options={recomendedInputs.map((input) => input)}
                    renderInput={(params) => (
                        <TextField {...params} fullWidth variant="outlined" value={value} inputProps={{form: "inputEntry", type: "text" }} onKeyDown={e => console.log(e)} onChange={(e) => setValue(e.target.value)} label={"Input Key"} />
                        )}
                        />
            </Grid>
            <Button variant="contained" color="secondary"  OnEnter={e => {
                            createInput(e);
                            console.log('here');
                            e.stopPropagation();
                        }} onClick={createInput}>Create Input</Button>
        </>
    )
}

export const AddTags = ({ setTagsValue, tags = []}) => {
    return (
            <Grid item item  xs={12}>
                <Autocomplete name="Tags" multiple
                    id="checkboxes-tags-demo"
                    options={tags}
                    name="Tags"
                    onChange={(e, value) => setTagsValue(value)}
                    freeSolo
                    disableCloseOnSelect
                    getOptionLabel={(tags) => tags}
                    renderOption={(tags, { selected }) => (
                        <>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {tags}
                        </>
                    )}
                    
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Tags" placeholder="Favorites" />
                    )} />
            </Grid>
    )
}