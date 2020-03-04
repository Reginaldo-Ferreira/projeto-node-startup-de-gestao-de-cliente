var express = require("express");
var router = express.Router();
var PlansController = require("../controllers/PlansController");

router.get("/admin/plans", PlansController.index);
router.get("/admin/plans/create",PlansController.create);
router.get("/admin/plans/edit/:id",PlansController.edit);
        //"/plans/update"
router.post("/plans/update",PlansController.update);

router.post("/plans/store",PlansController.store);
module.exports = router;
