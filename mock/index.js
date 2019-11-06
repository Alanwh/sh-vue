const express = require('express')
const baseUrl = `/${process.env.NODE_ENV.split(':')[1]}`
const path = `.${baseUrl}/list.json`
const json = require(path)

const apiRoutes = express.Router()

apiRoutes.get("/face/queryOrderFaceDownFailList", (req, res) => res.send(json))
apiRoutes.post("/face/resetOrderFaceDownCount", (req, res) => res.send({"data": 1, "flag": "S"}))

module.exports = apiRoutes
