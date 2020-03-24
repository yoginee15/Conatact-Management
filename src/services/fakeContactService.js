const contacts = [
  {
    _id: "1",
    firstname: "Leanne",
    lastname: "Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "7707368031",
    status: "active"
  },
  {
    _id: "2",
    firstname: "Ervin",
    lastname: "Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "9265930912",
    status: "active"
  },
  {
    _id: "3",
    firstname: "Clementine",
    lastname: "Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "8463123447",
    status: "active"
  },
  {
    _id: "4",
    firstname: "Patricia",
    lastname: "Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    phone: "9317096231",
    status: "inactive"
  },
  {
    _id: "5",
    firstname: "Chelsey",
    lastname: "Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    phone: "9541289254",
    status: "inactive"
  },
  {
    _id: "6",
    firstname: "Dennis",
    lastname: "Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    phone: "9358478630",
    status: "active"
  },
  {
    _id: "7",
    firstname: "Kurtis",
    lastname: "Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    phone: "9210067613",
    status: "active"
  },
  {
    _id: "8",
    firstname: "Nicholas",
    lastname: "Runolfsdottir",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    phone: "8693694314",
    status: "inactive"
  },
  {
    _id: "9",
    firstname: "Glenna",
    lastname: "Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    phone: "9766794412",
    status: "active"
  },
  {
    _id: "10",
    firstname: "Clementina",
    lastname: "DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    phone: "9246483804",
    status: "inactive"
  }
];

const status = [
  {_id:1, name:"Active"},
  {id_:2, name:"Inactive"}
]

export function getContacts() {
  return contacts;
}

export function getContact(id) {
  return contacts.find(c => c._id === id);
}

export function saveContact(contact) {
  let contactInDb = contacts.find(c => c._id === contact._id) || {};
  contactInDb.firstname = contact.firstname;
  contactInDb.lastname = contact.lastname;
  contactInDb.phone = contact.phone;
  contactInDb.email = contact.email;
  contactInDb.status = contact.status;
  if (!contactInDb._id) {
    contactInDb._id = Date.now();
    contacts.push(contactInDb);
  }

  return contactInDb;
}

export function deleteContact(id) {
  let contactInDb = contacts.find(c => c._id === id);
  contacts.splice(contacts.indexOf(contactInDb), 1);
  return contactInDb;
}