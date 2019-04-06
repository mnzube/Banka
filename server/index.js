import express from 'express';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Banka');
})


const port = process.env.PORT  || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`) );
