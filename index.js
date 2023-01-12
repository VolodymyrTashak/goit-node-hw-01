const { listContacts, getContactById, removeContact, addContact, } = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contacts = await listContacts();
        console.log("invoke list");
        console.table(contacts);
      break;

    case "get":
        const currentContact = await getContactById(id);
        console.log(currentContact);
      break;

    case "add":
        await addContact(name, email, phone);
        const newContacts = await listContacts();
        console.log(`${name}, ${email}, ${phone}`);
        console.table(newContacts);
      break;

    case "remove":
        await removeContact(id);
        const contactsList = await listContacts();
        console.log(`${id} was removed`);
        console.table(contactsList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
