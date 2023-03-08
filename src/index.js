import express from 'express'
import productsRouter from "./controllers/products.js"
import cors from 'cors'

// import notFound from './middleware/notFound.js'
// import handdleErrors from './middleware/handdleErrors.js'

const app = express()
app.use(cors());

app.use(express.json())

// app.get('/ping', async(req, res) => {
//   const result = await pool.query('SELECT 1 + 1 AS result')
//   res.json(result)
// })

app.use('/api/products/', productsRouter)

// app.use(notFound)
// app.use(handdleErrors)

const PORT = 8000
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})