import express from 'express';
import users from "./routes/users"
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Banka');
})

app.use("/api/v1",users)
const port = process.env.PORT  || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`) );
