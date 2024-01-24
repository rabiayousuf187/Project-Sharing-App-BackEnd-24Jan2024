const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getUser, addUser, getUserByEmail, deleteUser, updateUser, loginUser } = require("../controllers/users");
const { verifyToken, checkRole } = require('../middlewares/authMiddleware')

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage: storage });

router.post('/addUser', addUser)
router.post("/loginUser", loginUser)
// router.post('/addUser', upload.single('profileImg'), addUser)
router.get("/", checkRole('admin'), getUser);
router.get("/getUser", verifyToken, getUserByEmail)
router.delete("/deleteUser", deleteUser)
router.get("/deleteUser", deleteUser)
router.post("/updateUser", updateUser)

module.exports = router;