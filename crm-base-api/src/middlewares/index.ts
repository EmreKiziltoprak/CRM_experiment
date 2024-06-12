import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(bodyParser.json())

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
