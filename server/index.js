
//imported packages and env variables
const express = require('express');
const dotenv = require('dotenv');
const { spawn } = require('child_process');
const cors = require('cors');
dotenv.config();
const app = express();
const portno = process.env.PORTNO;


//middlewares
app.use((req, res, next) => {
    console.log(`Endpoint : ${req.url} method: ${req.method}`);
    next();
});
app.use(cors({
    origin: 'http://localhost:5173',
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//methods
const executePythonScript = async (script, args) => {
    const arguments = args.map(arg => arg.toString());

    const pythonChildProcess = spawn("python", [script, ...arguments]);

    const result = await new Promise((resolve, reject) => {
        let output;

        pythonChildProcess.stdout.on('data', (data) => {
            output = JSON.parse(data);
        })

        pythonChildProcess.stderr.on('data', (err) => {
            console.error(`[python] Error occured in script: ${err}`);
            reject(`Error occured!`);
        })

        pythonChildProcess.on('exit', (code) => {
            console.log(`Process  exited with code ${code}`);
            resolve(output);
        })
    });

    return result;
}


//endpoints
app.get('/', (req, res) => {
    res.json('Hello');
})

app.post('/factorial', async (req, res, next) => {
    try {
        const { value } = req.body;
        console.log(value);
        if (!value) {
            res.locals.errorCode = 400;
            throw new Error("Value not defined!");
        }
        const result = await executePythonScript("./python_scripts/prog.py", [value])

        if(!result){
            res.locals.errorCode = 500;
            throw new Error("We encountered some problem while calculating!");
        }

        res.status(200).json({ message: "Success", result: result });
    } catch (err) {
        next(err);
    }
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(res.locals.errorCode).json({ errorMessage: err.message })
})


app.listen(portno, () => {
    console.log(`Server running at ${portno}`);
})