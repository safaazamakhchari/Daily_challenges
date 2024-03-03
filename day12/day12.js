const readline = require('readline');

let contacts = [
    { name: 'safaa', number: 858032 },
    { name: 'kalj', number: 120309 },
    { name: 'kazaalj', number: 12223 },
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function AddContact() {
    rl.question('Enter the name of contact: ', (name) => {
        rl.question('Enter the phone number: ', (number) => {
            contacts.push({ name: name, number: parseInt(number) });
            console.log('Contact added successfully');
            ChoiceOperation();
        });
    });
}

function AllContacts() {
    console.log('All Contacts:');
    contacts.forEach(contact => {
        console.log(`Name: ${contact.name}, Phone Number: ${contact.number}`);
    });
    ChoiceOperation();
}

function SearchContact() {
    rl.question('Enter the name of contact: ', (name) => {
        const foundContact = contacts.find(contact => contact.name === name);
        if (foundContact) {
            console.log(`Name: ${foundContact.name}, Phone Number: ${foundContact.number}`);
        } else {
            console.log('Contact not found.');
        }
        ChoiceOperation();

    });
}

function ExitApp() {
    console.log('Exiting application...');
    rl.close();
}
function ChoiceOperation (){
    rl.question ('Choose one operation : 1 : Add contact . 2 : View all contacts . 3 : Search for a contact  . 4 : Exit ' , (choice)=>{
        switch(choice){
            case '1':
                AddContact();
                break;
            case '2':
                AllContacts();
                break;
            case '3':
                SearchContact();
                break;
            case '4':
                ExitApp();
                break;
            default:
                console.log('Invalid choice. Please select again.');
                ChoiceOperation(); 
                return;
        }
    })
}


ChoiceOperation()