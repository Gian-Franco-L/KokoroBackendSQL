import { Router } from 'express'
const productsRouter = Router()
import { pool } from '../db.js'


productsRouter.get('/', async (req, res) =>{
  const [products] = await pool.query('SELECT * FROM products')
  res.json(products)
})

productsRouter.get('/:id', async (req, res) =>{
  const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])

  if(products.length <= 0){
    res.status(404).json({
      message: 'Product not found'
    })
  }else{
    res.json(products[0])
  }
})

productsRouter.delete('/:id', async (req, res) =>{
  const { id } = req.params

  const [products] = await pool.query('DELETE FROM products WHERE id = ?', [id])

  if(products.affectedRows <= 0){ 
    res.status(404).json({
      message: 'Product not found'
    })
  }else{
    res.sendStatus(204)
  }
})

productsRouter.post('/', async (req, res, next) =>{
  const {Name, Price, Date, Size, Material, Stuffing, Img} = req.body

  const [products] = await pool.query('INSERT INTO products (Name, Price, Date, Size, Material, Stuffing, Img) Values (?, ?, ?, ? ,?, ?, ?)', [Name, Price, Date, Size, Material, Stuffing, Img])

  res.json({ products })
})

productsRouter.put('/:id', async (req, res) =>{
  const { id } = req.params
  const {Name, Price, Date, Size, Material, Stuffing, Img} = req.body

  const [result] = await pool.query('UPDATE products SET Name = IFNULL(?, Name), Price = IFNULL(?, Price), Date = IFNULL(?, Date), Size = IFNULL(?, Size), Material = IFNULL(?, Material), Stuffing = IFNULL(?, Stuffing), Img = IFNULL(?, Img) WHERE id = ?', [Name, Price, Date, Size, Material, Stuffing, Img, id])

  if(result.affectedRows === 0){
    res.status(404).json({
      message: 'Product not found'
    })
  }else{
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
    res.json(rows[0])
  }
})

export default productsRouter
// module.exports = productsRouter