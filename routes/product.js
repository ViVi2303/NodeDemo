const express = require('express');
const product = require('../schema/product');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await product.find({ isDeleted: false }).sort({ order: 1 });
  res.json({
    status: true,
    message: 'Fetched products successfully',
    data: products,
  });
});
router.post('/', async (req, res) => {
  //create product
  const newProduct = await product.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Create product successfully',
    data: newProduct,
  });
});
router.put('/:id', async (req, res) => {
  const productUpdate = await product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: 'Update product successfully',
    data: productUpdate,
  });
});
//delete soft detele
router.put('/:id', async (req, res) => {
  const productDelete = await product.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: 'Delete product successfully',
    data: productDelete,
  });
});
module.exports = router;
