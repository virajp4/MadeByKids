import React from 'react'
import { useState } from 'react';
import './talentDetails.css'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function TalentDetails() {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [std, setStd] = useState('')
  const [school, setSchool] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState(null)
  const [sponschoice, setSponschoice] = useState('no')
  return (
    <div >
        <h1><strong>Add talent details</strong></h1>
        <form className='details'>
        <TextField id="standard-basic" value={name} onChange={(e)=>setName(e.target.value)} className='text_fields' label="Name" variant="standard" required sx={{my:2}}/>
        
        <FormControl variant="standard" sx={{  my:2,minWidth: 120 }} >
        <InputLabel id="demo-simple-select-standard-label" required>Gender</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={gender}
          label="Gender"
          onChange={(e)=>setGender(e.target.value)}
        >
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"nota"}>Prefer not to say</MenuItem>
        </Select>
      </FormControl>
        <FormControl variant="standard" sx={{ my:2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label" required>Class</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={std}
          label="Class"
          onChange={(e)=>setStd(e.target.value)}
        >
          <MenuItem value={"prep"}>Pre-Primary(Nursery)</MenuItem>
          <MenuItem value={"kg"}>Kindergarten(KG)</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>
      <TextField id="standard-basic" className='text_fields' value={school} onChange={(e)=>setSchool(e.target.value)} label="School" variant="standard" required sx={{my:2}}/>
      <TextField id="standard-basic" className='text_fields' value={city} onChange={(e)=>setCity(e.target.value)} label="City" variant="standard" required sx={{my:2}}/>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DatePicker']} sx={{my:2}}>
        <DatePicker label="Date of Birth *" required className='datepicker' value={date} onChange={(e)=>setDate(e.target.value)}/>
      </DemoContainer>
    </LocalizationProvider>
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" sx={{mt:3,mb:1}}>Are you looking for sponsorship ?</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="no"
        name="radio-buttons-group"
        row={true}
        sx={{mb:4}}
        value={sponschoice}
        onChange={(e)=>setSponschoice(e.target.value)}
        >
        <FormControlLabel value="no" control={<Radio />} label="No" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        
      </RadioGroup>
    </FormControl>
    
        </form>
    </div>
  )
}

export default TalentDetails