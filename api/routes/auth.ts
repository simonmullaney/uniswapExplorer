import express from 'express';
const router = express.Router();
const authController =  require('../controllers/auth');


router.get('/auth/nonce/:ethAddress', authController.getNonce);
router.post('/auth/token/', authController.getToken);


module.exports = router;
