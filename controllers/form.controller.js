const Form = require("../models/form");
const Field = require("../models/field");
const Value = require("../models/value");
const Response = require("../models/response");
const FieldOption = require("../models/fieldOption");

Form.Field = Form.hasMany(Field, { as: "fields" });
Form.Response = Form.hasMany(Response, { as: "responses" });
Response.Value = Response.hasMany(Value, { as: "values" });
Field.FieldOption = Field.hasMany(FieldOption, { as: "fieldOptions" });
Field.Value = Field.hasMany(Value);
Value.Field = Value.belongsTo(Field, { as: "field" });

exports.createForm = (req, res, next) => {
  const name = req.body.name;
  const fields = req.body.fields;
  console.log(fields);
  Form.create(
    {
      name: name,
      fields: fields,
    },
    {
      include: [
        {
          association: Form.Field,
          include: [Field.FieldOption],
        },
      ],
    }
  )
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .json({ message: "Form Created Successfully", formId: result.id });
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
  Form.findByPk(formId, {
    include: [
      {
        association: Form.Field,
        attributes: { exclude: ["formId"] },
        include: {
          association: Field.FieldOption,
          attributes: { exclude: ["fieldId"] },
        },
      },
    ],
  })
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

  Form.findByPk(formId)
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message:
            "Response cannot be saved , Unkown Form " + req.params.formId,
        });
      }
      return form.createResponse(
        {
          from: from,
          values: values,
        },
        {
          include: [
            {
              association: Response.Value,
            },
          ],
        }
      );
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
            association: Response.Value,
            include: [
              {
                association: Value.Field,
                attributes: { exclude: ["formId"] },
              },
            ],
            attributes: { exclude: ["responseId", "fieldId"] },
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
      return Response.findByPk(responseId, {
        include: [
          {
            association: Response.Value,
            include: [
              {
                association: Value.Field,
                attributes: { exclude: ["formId"] },
              },
            ],
            attributes: { exclude: ["responseId", "fieldId"] },
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
          err.message || "Some error occurred while Retriving Response  ",
      });
    });
};
