const { NotFound } = require('http-errors');
// const contactsOperations = require('../../models/contacts');

// const getById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsOperations.getContactById(contactId);

//     if (!result) {
//       throw new NotFound(`Contact with id=${contactId} not found`);
//     }

//     res.json({
//       status: 'succes',
//       code: 200,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = getById;

const { Contact } = require('../../models');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: 'succes',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;