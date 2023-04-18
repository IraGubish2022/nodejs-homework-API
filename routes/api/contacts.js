const express = require("express");

// const contacts = require("../../models/contacts");
// const { HttpError } = require("../../helpers");
// const Joi = require("joi");

// const router = express.Router();

// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, `Contact with id:${contactId} not found`);
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     console.log(error);
//     if (error) {
//       throw HttpError(400, "missing required name field");
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, `Contact with id:${contactId} not found`);
//     }
//     res.status(200).json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     console.log(error);
//     if (error) {
//       throw HttpError(400, "missing fields");
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

const { contacts: controllers } = require('../../controllers');
// const { contactSchema } = require('../../schemas');
const { contactJoiSchema, statusJoiSchema } = require('../../models/contact');
const { validation } = require('../../middlewares');

//const validationMiddlevare = validation(contactSchema);

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:contactId', controllers.getById);

router.post('/', validation(contactJoiSchema), controllers.add);
// router.post('/', validationMiddlevare, controllers.add);

router.put('/:contactId', validation(contactJoiSchema), controllers.updateById);

router.patch('/:contactId/favorite', validation(statusJoiSchema), controllers.updateStatusContact);

router.delete('/:contactId', controllers.removeById);

//router.put('/:contactId', validationMiddlevare, controllers.updateById);

module.exports = router;