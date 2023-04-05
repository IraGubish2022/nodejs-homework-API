const fs = require("fs/promises");
const path = require("path");
const uniqid = require('uniqid');
const contactsPath = path.join(__dirname, 'contacts.json');

// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const result = contacts.find((item) => item.id === contactId);
//     return result || null;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((item) => item.id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const addContact = async ({ name, email, phone }) => {
//   try {
//     const contacts = await listContacts();
//     const newContact = {
//       id: nanoid(),
//       name,
//       email,
//       phone,
//     };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((item) => item.id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     contacts[index] = { contactId, ...body };
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);

  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const findedIndex = contacts.findIndex(contact => contact.id === contactId);
  if (findedIndex === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(findedIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removedContact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = {
    id: uniqid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const findedIndex = contacts.findIndex(contact => contact.id === contactId);
  if (findedIndex === -1) {
    return null;
  }
  contacts[findedIndex] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[findedIndex];
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
