const express = require("express");
const router = express.Router();
const { createProject, getAllProjetcs, getUserAllProjects } = require('../controllers/ProjectController')
const { verifyToken, checkRole } = require('../middlewares/authMiddleware')

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// router.get("/", checkRole('admin'), geta);
router.post("/addProject", createProject)
// router.get("/checkOut", checkOut)
router.get("/getAllProjetcs", getAllProjetcs)
router.post("/getUserAllProjects", getUserAllProjects)
// // router.get("/deleteUser", deleteUser)
// router.post("/updateUser", updateUser)
// router.post("/loginUser", loginUser)

module.exports = router;