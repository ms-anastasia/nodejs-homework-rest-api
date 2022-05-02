const fs = require("fs/promises");
const path = require("path");

const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const ID = id.toString();
  const result = contacts.find(item => item.id === ID);
  if (!result) {
    return null;
  }
  return result;
}

const updateById = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...body };
  await updateContacts(contacts);
  return contacts[idx];
}

async function removeContact(id) {
  const contacts = await listContacts();
  const ID = id.toString();
  const idx = contacts.findIndex((item) => item.id === ID);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name: name, email: email, phone: phone, id: v4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContacts (contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById
};