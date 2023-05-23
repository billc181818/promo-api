const express = require('express')
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./config/swagger.json')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.timeout = 30000

app.use('/api', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
