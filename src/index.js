import express  from "express";
import cors from "cors";
import route from "./routes/routes.js";

const app = express();
const port = 3000;

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', route);

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API Rodando',
        versao: '1.0.0'
    })
})

app.use((req, res) => {
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})