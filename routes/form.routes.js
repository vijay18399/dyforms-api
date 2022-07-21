var express = require("express");
var router = express.Router();
const formController = require("../controllers/form.controller");
router.post("/form", formController.createForm);
router.get("/form/:formId", formController.getForm);
router.post("/response/:formId", formController.sendResponse);
router.get("/responses/:formId", formController.getResponses);
router.get("/response/:responseId", formController.getResponse);
module.exports = router;
