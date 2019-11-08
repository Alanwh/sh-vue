const express = require('express')
const faceJson = require('./aps/list.json')
const ocrJson = require('./ocr/list.json')

const apiRoutes = express.Router()

apiRoutes.post('/face/queryOrderFaceDownFailList', (req, res) => res.send(faceJson))
apiRoutes.post('/face/resetOrderFaceDownCount', (req, res) => res.send({ 'data': 1, 'flag': 'S' }))

apiRoutes.post('/ocr/queryOrderOcrDownFailList', (req, res) => res.send(ocrJson))
apiRoutes.post('/ocr/resetOrderOcrDownCount', (req, res) => res.send({ 'data': 1, 'flag': 'S' }))

module.exports = apiRoutes
