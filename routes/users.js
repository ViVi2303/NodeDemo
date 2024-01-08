const express = require('express');
const router = express.Router();
const responseData = require('../helper/responseData');
const modelUser = require('../models/user');
const validate = require('../validates/user');
const { validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  const usersAll = await modelUser.getall(req.query);
  responseData.responseReturn(res, 200, true, usersAll);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params.id;
    const user = await modelUser.getOne(id);
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, 'Do not find user');
  }
});
router.post('/add', validate.validator(), async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    responseData.responseReturn(
      res,
      400,
      false,
      errors.array().map((error) => error.msg)
    );
    return;
  }
  const user = await modelUser.getByName(req.body.userName);
  if (user) {
    responseData.responseReturn(res, 404, false, 'user da ton tai');
  } else {
    const newUser = await modelUser.createUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    responseData.responseReturn(res, 200, true, newUser);
  }
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    const user = await modelUser.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    });
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, 'khong tim thay user');
  }
});
router.delete('/delete/:id', function (req, res, next) {
  //delete by Id
  try {
    const user = modelUser.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, 'xoa thanh cong');
  } catch (error) {
    responseData.responseReturn(res, 404, false, 'khong tim thay user');
  }
});

module.exports = router;
