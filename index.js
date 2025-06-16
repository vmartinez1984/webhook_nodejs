const express = require('express')
const { agregarAsync, obtenerTodosAsync } = require('./webhook.repository')

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (req, res) => {
    const data = {
        mensaje: "hola mundo, webhook"
    }
    res.status(200).json(data)
})

app.post("/api/webhooks", async (req, res) => {
    console.log(req.body)
    const webhook = {
        fechaDeRegistro: new Date(),
        body: req.body,
        headers: req.headers,
        params: req.params,
        query: req.query
    }
    console.log(webhook)
    await agregarAsync(webhook)

    res.status(201).json(webhook)
})

app.get("/api/webhooks", async (req, res) => {
    const webhooks = await obtenerTodosAsync()
    res.status(200).json(webhooks)
})

app.listen(port, () => {
    console.log("Iniciando")
    console.log("http://localhost:" + port)
})