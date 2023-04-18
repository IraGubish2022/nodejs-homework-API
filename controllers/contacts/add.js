// const contactsOperations = require('../../models/contacts');

// const add = async (req, res, next) => {
//   try {
//     const result = await contactsOperations.addContact(req.body);
//     res.status(201).json({
//       status: 'succes',
//       code: 201,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = add;

const { Contact } = require('../../models');

const add = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: 'succes',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
