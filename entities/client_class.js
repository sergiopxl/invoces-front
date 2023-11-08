/* dependencias
  contact_class.js
*/
class Client {
  container = document.createElement("div");
  id;
  brand;
  name;
  cif;
  phone;
  address;
  contacts;

  constructor(client) {
    this.container.classList.add("client-row");

    this.id = client.id;
    this.brand = client.alias;
    this.name = client.name;
    this.cif = client.cif;
    this.phone = client.phone;
    this.address = client.address;
    this.contacts = client.contactos;
  }
  // método que inicializa los botones de acción de cada cliente
  setButtons() {
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("client-row-buttons");

    let buttonNewFactura = document.createElement("button");
    buttonNewFactura.classList.add("action-button");
    buttonNewFactura.textContent = "Nueva factura";
    buttonNewFactura.addEventListener("click", (e) => {
      console.log("nueva factura");
    });
    let buttonNewPresupuesto = document.createElement("button");
    buttonNewPresupuesto.classList.add("action-button");
    buttonNewPresupuesto.textContent = "Nuevo presupuesto";
    buttonNewPresupuesto.addEventListener("click", (e) => {
      console.log("nuevo presupuesto");
    });
    let buttonEdit = document.createElement("button");
    buttonEdit.classList.add("action-button");
    buttonEdit.textContent = "Editar cliente";
    buttonEdit.addEventListener("click", (e) => {
      clientEdit(this.id);
    });

    buttonContainer.append(buttonNewFactura, buttonNewPresupuesto, buttonEdit);
    this.container.append(buttonContainer);
  }
  // Método que monta la vista con los datos de cada cliente
  setClientData() {
    const clientData = document.createElement("div");
    clientData.classList.add("client-data");

    const clientId = document.createElement("small");
    clientId.classList.add("client-id");
    clientId.textContent = "id cliente: " + this.id;

    const clientBrand = document.createElement("p");
    clientBrand.classList.add("client-brand");
    if (this.brand != undefined && this.brand != "") {
      clientBrand.textContent = this.brand;
      clientBrand.addEventListener("click", () => {
        clientEdit(this.id);
      });
    } else {
      clientBrand.classList.add("empty");
      clientBrand.textContent = "Cliente sin nombre comercial";
    }

    const clientName = document.createElement("p");
    clientName.classList.add("client-name");
    if (this.name != undefined && this.name != "") {
      clientName.textContent = this.name;
    } else {
      clientName.classList.add("empty");
      clientName.textContent = "Cliente sin nombre para facturación";
    }
    const clientCif = document.createElement("p");

    clientCif.classList.add("client-cif");
    if (this.cif != undefined && this.cif != "") {
      clientCif.textContent = this.cif;
    } else {
      clientCif.classList.add("empty");
      clientCif.textContent = "Cliente sin CIF";
    }

    const clientPhone = document.createElement("p");
    clientPhone.classList.add("client-phone");
    if (this.phone != undefined && this.phone != "") {
      clientPhone.textContent = this.phone;
    } else {
      clientPhone.classList.add("empty");
      clientPhone.textContent = "Cliente sin teléfono";
    }

    const clientAddress = document.createElement("p");
    clientAddress.classList.add("client-address");
    if (this.address != undefined && this.address != "") {
      clientAddress.textContent = this.address;
    } else {
      clientAddress.classList.add("empty");
      clientAddress.textContent = "Cliente sin dirección";
    }

    clientData.append(clientId, clientBrand, clientName, clientCif, clientPhone, clientAddress);
    this.container.append(clientData);
  }
  // Método que crea una instacia del objeto contacto por cada contacto del cliente y los muestra en la vista
  setContacts() {
    const clientContacts = document.createElement("div");
    clientContacts.classList.add("client-contacts");
    if (this.contacts.length > 0) {
      this.contacts.forEach((contact) => {
        const newContact = new Contact(contact);
        clientContacts.append(newContact.container);
      });
    } else {
      clientContacts.innerHTML += "<p class = 'empty'>No hay contactos para este cliente</p>";
    }
    this.container.append(clientContacts);
  }
}

class Contact {
  id;
  name;
  apell1;
  apell2;
  phone2;
  phone2;
  mail1;
  cargo;
  estado;
  container = document.createElement("div");

  constructor(contact) {
    this.container.classList.add("client-contact-block");
    this.id = contact.id;

    let contactName = document.createElement("p");
    this.container.append(contactName);
    if (contact.name != undefined) {
      this.name = contact.name;
      contactName.classList.add("client-contact-name");
      contactName.textContent = contact.name;
      if (contact.apell1 != undefined) {
        this.apell1 = contact.apell1;
        contactName.textContent += " " + contact.apell1;
      }
      if (contact.apell2 != undefined) {
        this.apell2 = contact.apell2;
        contactName.textContent += " " + contact.apell2;
      }
    } else {
      contactName.classList.add("empty");
      contactName.textContent = "Contacto sin nombre";
    }
    let contactPhone = document.createElement("p");
    this.container.append(contactPhone);
    if (contact.phone1 != "") {
      contactPhone.classList.add("client-contact-phone");
      contactPhone.textContent = contact.phone1;
    } else {
      contactPhone.classList.add("empty");
      contactPhone.textContent = "No tenemos telefono principal";
    }

    if (contact.phone2 != undefined) {
      let contactPhone2 = document.createElement("p");
      this.container.append(contactPhone2);
      contactPhone2.classList.add("client-contact-phone2");
      contactPhone2.textContent = contact.phone2;
    }

    if (contact.mail1 != "") {
      let contactMail = document.createElement("a");
      contactMail.classList.add("client-contact-mail");
      contactMail.setAttribute("href", "mailto:" + contact.mail1);
      contactMail.textContent = contact.mail1;
      this.container.append(contactMail);
    } else {
      let contactMail = document.createElement("p");
      contactMail.classList.add("empty");
      contactMail.textContent = "No tenemos el email del contacto";
      this.container.append(contactMail);
    }

    if (contact.cargo != undefined) {
      let contactCargo = document.createElement("p");
      contactCargo.classList.add("client-contact-cargo");
      contactCargo.textContent = contact.cargo;
      this.container.append(contactCargo);
    }
  }
}