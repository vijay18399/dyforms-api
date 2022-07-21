const Form = require("../models/form");
const Field = require("../models/field");
const Value = require("../models/value");
const Response = require("../models/response");

exports.createForm = (req, res, next) => {
  const name = req.body.name;
  const user_id = req.body.user_id;
  const fields = req.body.fields;
  let form;
  Form.create({
    name: name,
    user_id: user_id,
  })
    .then((data) => {
      form = data;
      return Field.bulkCreate(fields);
    })
    .then((fields) => {
      return form.addFields(fields);
    })
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .json({ message: "Form Created Successfully", formId: form.id });
    })
    .catch((err) => {
      return res.status(500).send({
        error: err,
        message: err.message || "Some error occurred while Creating Form  ",
      });
    });
};
exports.getForm = (req, res, next) => {
  const formId = req.params.formId;
  Form.findByPk(formId, { include: ["fields"] })
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message: "Form not found with id " + req.params.formId,
        });
      }
      res.status(201).json({ form: form });
    })
    .catch((err) => {
      return res.status(500).send({
        error: err,
        message: err.message || "Some error occurred while Retriving Form  ",
      });
    });
};
exports.sendResponse = (req, res, next) => {
  const formId = req.params.formId;
  const from = req.body.from;
  const values = req.body.values;
  let response;
  Form.findByPk(formId)
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message:
            "Response cannot be saved , Unkown Form " + req.params.formId,
        });
      }
      return form.createResponse({
        from: from,
      });
    })
    .then((data) => {
      response = data;
      return Value.bulkCreate(values);
    })
    .then((values) => {
      return response.addValues(values);
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "Response Submitted Successfully" });
    })
    .catch((err) => {
      return res.status(500).send({
        error: err,
        message:
          err.message ||
          "Some error occurred while Submitting Response for Form ",
      });
    });
};
exports.getResponses = (req, res, next) => {
  const formId = req.params.formId;
  Form.findByPk(formId)
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message: "Form not found with id " + req.params.formId,
        });
      }
      return form.getResponses({
        include: [
          {
            model: Value,
            as: "values",
            attributes: { exclude: ["responseId", "fieldId"] },
            include: {
              model: Field,
              as: "field",
              attributes: { exclude: ["formId"] },
            },
          },
        ],
        attributes: { exclude: ["formId"] },
      });
    })
    .then((responses) => {
      res.status(201).json({ responses: responses });
    })
    .catch((err) => {
      return res.status(500).send({
        error: err,
        message:
          err.message ||
          "Some error occurred while retrieving Responses for Form ",
      });
    });
};

exports.getResponse = (req, res, next) => {
  const responseId = req.params.responseId;
  Response.findByPk(responseId)
    .then((response) => {
      if (!response) {
        return res.status(404).send({
          message: "Response not found with id " + req.params.responseId,
        });
      }
      return response.getValues({
        include: {
          model: Field,
          as: "field",
          attributes: {
            exclude: ["formId"],
          },
        },
        attributes: {
          exclude: ["responseId", "fieldId"],
        },
      });
    })
    .then((responses) => {
      res.status(201).json({ responses: responses });
    })
    .catch((err) => {
      return res.status(500).send({
        error: err,
        message:
          err.message || "Some error occurred while Retriving Response  ",
      });
    });
};
