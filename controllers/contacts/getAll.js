// const contactsOperations = require('../../models/contacts');

// const getAll = async (req, res, next) => {
//   try {
//     const contacts = await contactsOperations.listContacts();
//     res.json({
//       status: 'succes',
//       code: 200,
//       data: {
//         result: contacts,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = getAll;

const { Contact } = require('../../models');
const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: 'succes',
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;