const express = require('express');
const { check } = require('express-validator');
const feedControllers = require('../controllers/feed');
const checkAuth=require('../middleware/check-auth')
const router = express.Router();
router.get('/:fid', feedControllers.getFeedById);
router.get('/user/:uid', feedControllers.getFeedsByUserId);
router.use(checkAuth);
router.post(
  '/',
  [
    check('description').isLength({ min: 5 }),
    check('name')
      .not()
      .isEmpty()
  ],
  feedControllers.createFeed
);
router.patch(
  '/:fid',
  [
    
    check('description').isLength({ min: 5 })
  ],
  feedControllers.updateFeed
);
router.delete('/:fid', feedControllers.deleteFeed);
router.get('/',feedControllers.getAllFeed);
module.exports = router;