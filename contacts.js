const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json.json");

async function listContacts() {
    const contactsRaw = await fs.readFile(contactsPath);
    const db = JSON.parse(contactsRaw);
    return db;
  }
  
  async function getContactById(contactId) {
    const db = await listContacts();
    const currentContact = db.find((contact) => contact.id === contactId);
    return currentContact;
  }
  
  async function removeContact(contactId) {
    const db = await listContacts();
    const updateContacts = db.filter((contact) => contact.id !== contactId.toString());
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  }
  
  async function addContact(name, email, phone) {
    const id = nanoid();
    const contacts = { id, name, email, phone };
    const db = await listContacts();
    db.push(contacts);
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }