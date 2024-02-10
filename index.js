const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log("Contact list:");
      return console.table(allContacts);

    case "get":
      const contact = await getContactById(id);
      return console.table(contact);

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.log("Contact added!");
      return console.table(addedContact);

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(`Contact with id ${id} is removed!`);
      return console.table(deletedContact);

    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
