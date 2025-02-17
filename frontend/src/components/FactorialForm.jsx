import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from 'axios';

const FactorialForm = () => {
  const [inputVal, setInputVal] = useState('');
  const [result, setResult] = useState('');

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log(result, inputVal);
    if (inputVal < 1) {
      setResult('0');
      return false;
    }

    axios.post("http://localhost:3000/factorial", { value: inputVal }).then((res) => {
      console.log(res.data);
      setResult(Number(res.data.result).toString());
    }).catch((err) => {
      console.log(err.response.data.errorMessage);
    })
  }

  return (
    <section className="w-[90vw] h-[90vh] flex justify-center items-center bg-amber-50 rounded-2xl">
      <Box className='w-4/5 h-1/2 flex flex-col justify-evenly items-center'>
        <Typography variant="h1" className="font-extrabold">Finding the factorial</Typography>
        <TextField type="text" required placeholder="Enter a sentence" value={inputVal} onChange={(e) => { e.preventDefault(); setInputVal(e.target.value); }} />
        <Button variant="contained" onClick={handleOnClick}>Find Factorial</Button>
        <Box>
          <Typography variant="h4" className="w-full break-all h-fit">Result: {result}</Typography>
        </Box>
      </Box>
    </section>
  )
}

export default FactorialForm