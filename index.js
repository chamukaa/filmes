let express = require("express")
let cors = require("cors")
let mysql = require("serverless-mysql")


let porta = 3000
let app = express()
app.use(cors())
app.use(express.json())

let bd = mysql({
    config:{
        host: "127.0.0.1",
        database:"iftm_filmes",
        user:"root",
        password:""
    }
})

app.get("/", async(req,res)=>{
    res.send("Rota inicial")
})

app.listen(porta,() => {
    console.log(`Servidor rodando em http://127.0.0.1:${porta}`)
})

app.get("/filmes/:id", async (req, res)=>{
    let id = req.params.id
    let atores = await bd.query(`SELECT atores.titulo, filmes.titulo
    FROM((atores_filmes INNER JOIN atores ON atores.id = atores_filmes.ator_id)
    INNER JOIN filmes ON filmes.id = atores_filmes.filme_id)
    WHERE atores.id = ?`, [id])
    res.send(atores)
})