const express = require('express');
const router = express.Router();
const category = require('../schema/category');
const productSchema = require('../schema/product');

router.get('/', async (req, res) => {
  const categories = await category
    .find({ isDeleted: false })
    .sort({ order: 1 });
  if (!categories) {
    return res.status(404).json({
      status: false,
      message: 'No category found',
    });
  }
  res.json({
    status: true,
    message: 'Fetched categories successfully',
    data: categories,
  });
});

router.post('/', async (req, res) => {
  //create category
  console.log(req.body);
  const productIds = req.body.products;
  for (let id of productIds) {
    const product = await productSchema.findById(id);
    if (!product) {
      return res.status(400).json({
        status: false,
        message: `Product with id ${id} does not exist`,
      });
    }
  }
  const newCategory = await category.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Create category successfully',
    data: newCategory,
  });
});

router.put('/:id', async (req, res) => {
  const categoryUpdate = await category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: 'Update category successfully',
    data: categoryUpdate,
  });
});
router.put('/:id', async (req, res) => {
  const categoryDelete = await category.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: 'Delete category successfully',
  });
});
module.exports = router;
