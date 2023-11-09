
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