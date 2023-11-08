"use strict";
console.log("clients.js 1.1");
/* dependencias
  client_class.js
  form_field_class.js
*/

let allClients;
let sessionData;
const dashBoard = document.querySelector("#dashboard");
const pageTitle = document.querySelector("#page-title-h1");

const clientList = () => {
  pageTitle.textContent = "Listado de clientes";
  sessionData = getSession();
  //console.log("sessionData: ",sessionData)
  let maxResultsByPage = 50;
  let pages;
  let actualPage = 0;

  //NOTE: Contenedores

  dashBoard.innerHTML = "";
  const loader = new Loader("Esperando al servidor");
  dashBoard.append(loader.container);

  const clientsListTools = document.createElement("div");
  clientsListTools.classList.add("list-tools");

  const pagination = document.createElement("div");
  pagination.classList.add("pagination");

  const clientListContainer = document.createElement("div");
  clientListContainer.classList.add("clients-list-container");

  //FIXME: analizar todo el código del buscador y encontrar una solución mejor
  const searcherContainer = document.createElement("div");
  searcherContainer.classList.add("searcher-container");

  const searcherInput = document.createElement("input");
  searcherInput.setAttribute("type", "search");
  searcherInput.setAttribute("placeholder", "Buscar cliente");

  const searcherButton = document.createElement("button");
  searcherButton.classList.add("action-button");
  searcherButton.textContent = "Buscar";
  searcherButton.addEventListener("click", () => {
    buscarCliente(searcherInput.value);
  });

  const newClientButton = document.createElement("button");
  newClientButton.classList.add("save-button");
  newClientButton.textContent = "Nuevo Cliente";
  newClientButton.addEventListener("click", () => {
    //console.log("Formulario nuevo cliente");
    setFormNewClient();
  });

  searcherContainer.append(searcherInput, searcherButton);
  // fin buscador

  clientsListTools.append(newClientButton, pagination, searcherContainer);
  dashBoard.append(clientsListTools, clientListContainer);

  getResults();

  function getResults() {
    const headers = setHeadersAuthSesion(); // Este método esta en el archivo de session.js
    fetch(globalClientsGet, {
      method: "GET",
      headers: headers,
    }).then((response) => {
      response.json().then((data) => {
        //console.log("data: ", data);
        if (data[0] == 404) {
          alert("Usuario no logado");
          window.location = "index.html";
        }
        if (data[0] == 401) {
          alert("Tiempo de sesion expirado");
          window.location = "../index.html";
        }
        //console.log('Headers: ', headers)
        if (data.length > maxResultsByPage) {
          doPagination(data.length);
        }
        allClients = [...data];
        printResults(allClients);
        loader.destroy();
      });
    });
  }

  function buscarCliente(cliente) {
    let finds = allClients.filter((finded) => {
      return finded.name.toUpperCase().includes(cliente.toUpperCase()) || finded.cif.toUpperCase().includes(cliente.toUpperCase());
    });
    printResults(finds);
    actualPage = 0;
    doPagination(finds.length);
  }

  function doPagination(resultados) {
    pagination.innerHTML = "";
    pages = parseInt(resultados / maxResultsByPage);

    resultados % maxResultsByPage != 0 ? (pages += 1) : pages;

    let totales = document.createElement("div");
    totales.classList.add("pagination-totals");
    totales.innerHTML = "Resultados: <strong>" + resultados + "</strong>";
    totales.innerHTML += " Paginas: <strong>" + pages + "</strong>";

    pagination.append(totales);

    for (let i = 0; i < pages; ++i) {
      let paginationButton = document.createElement("div");
      paginationButton.classList.add("pagination-button");
      if (actualPage == i) {
        paginationButton.classList.add("actual-page");
      }
      paginationButton.textContent = i + 1;
      paginationButton.addEventListener("click", (e) => {
        actualPage = i;
        let selectedButton = document.querySelector(".pagination-button.actual-page");
        selectedButton.classList.remove("actual-page");
        paginationButton.classList.add("actual-page");
        printResults(allClients);
      });
      pagination.append(paginationButton);
    }
  }

  function printResults(resultados) {
    clientListContainer.innerHTML = "";
    //console.log("actualPage: "+actualPage);
    for (let i = actualPage * maxResultsByPage; i < (actualPage + 1) * maxResultsByPage; ++i) {
      let client = resultados[i];
      if (client != undefined) {
        let clientRow = new Client(client);
        clientRow.setButtons();
        clientRow.setClientData();
        clientRow.setContacts();
        clientListContainer.append(clientRow.container);
      }
    }
  }
};

const clientEdit = (idCliente) => {
  let finded = allClients.find((client) => client.id == idCliente);

  if (finded != undefined) {
    pageTitle.textContent = "Editando cliente: " + finded.name;
    setFormUpadateClient(finded);
    //console.log("encontrado: ", finded)
  }
};

function setFormUpadateClient(client) {
  dashBoard.innerHTML = "";
  console.log("setFormUpadateClient: ", client);

  /*const clientFormEdit = document.createElement("form");
  clientFormEdit.id = "client-form";*/
  const clientFormEditFields = new Array();
  const fieldId = {
    label: "id:",
    name: "id",
    type: "hidden",
    data: client.id,
    cssClass: "hidden",
  };
  const fieldActive = {
    label: "Cliente activo: ",
    name: "active",
    type: "checkbox",
    data: client.activo,
    cssClass: "client-form-fieldset",
  };
  const fieldName = {
    label: "Nombre facturación: ",
    name: "facturation-name",
    type: "text",
    data: client.name,
    cssClass: "client-form-fieldset",
  };

  const fieldAlias = {
    label: "Nombre comercial: ",
    name: "alias",
    type: "text",
    data: client.alias,
    cssClass: "client-form-fieldset",
  };
  const fieldCif = {
    label: "C.I.F.: ",
    name: "cif",
    type: "text",
    data: client.cif,
    cssClass: "client-form-fieldset",
  };
  const fieldPhone = {
    label: "Teléfono: ",
    name: "phone",
    type: "text",
    data: client.phone,
    cssClass: "client-form-fieldset",
  };
  const fieldAddress = {
    label: "Dirección: ",
    name: "address",
    type: "text",
    data: client.address,
    cssClass: "client-form-fieldset",
  };
  const fieldCP = {
    label: "C.P.: ",
    name: "cp",
    type: "text",
    data: client.cp,
    cssClass: "client-form-fieldset",
  };
  const fieldProvince = {
    label: "Provincia: ",
    name: "province",
    type: "text",
    data: client.province,
    cssClass: "client-form-fieldset",
  };
  const fieldPopulation = {
    label: "Población: ",
    name: "population",
    type: "text",
    data: client.population,
    cssClass: "client-form-fieldset",
  };

  clientFormEditFields.push(fieldId,fieldActive,fieldName,fieldAlias,fieldCif,fieldPhone,fieldAddress,fieldCP,fieldProvince,fieldPopulation);

  const clientFormEdit = new Form("id: " + client.id,"client-form", "UPDATE", clientFormEditFields, updateClient);
  
  /*function saluda() {
    alert("hola");
  }*/

  const clientFormData = document.createElement("div");
  clientFormData.classList.add("client-form-data-block");
  //clientFormEdit.append(clientFormData);
  dashBoard.append(clientFormEdit.container);

  //setClientData(client);
  //clientFormEdit.append(setClientContacts(client));

  function setClientData(client) {
    const checkActive = new FormField("Cliente activo: ", "active", "checkbox", "", "client-form-fieldset");
    if (client.activo == 1) {
      checkActive.container.querySelector("input").setAttribute("checked", "checked");
      checkActive.container.querySelector("input").value = 1;
    } else {
      checkActive.container.querySelector("input").value = 1;
    }
    checkActive.container.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        e.target.value = 1;
      } else {
        e.target.value = 0;
      }
    });
    const clientId = document.createElement("small");
    clientId.classList.add("client-form-id");
    clientId.textContent = "id: " + client.id;

    const inputId = new FormField("id:", "id", "hidden", client.id, "hidden");
    const inputFacturacionName = new FormField("Nombre facturación: ", "facturation-name", "text", client.name, "client-form-fieldset");
    const inputAlias = new FormField("Nombre comercial: ", "alias", "text", client.alias, "client-form-fieldset");
    const inputCif = new FormField("C.I.F.: ", "cif", "text", client.cif, "client-form-fieldset");
    const inputPhone = new FormField("Teléfono: ", "phone", "text", client.phone, "client-form-fieldset");
    const inputAddress = new FormField("Dirección: ", "address", "text", client.address, "client-form-fieldset");
    const inputCP = new FormField("C.P.: ", "cp", "text", client.cp, "client-form-fieldset");
    const inputProvince = new FormField("Provincia: ", "province", "text", client.province, "client-form-fieldset");
    const inputPopulation = new FormField("Población: ", "population", "text", client.population, "client-form-fieldset");
    //const inputCountry = new FormField("Pais: ", "country", "text", client.pais, "client-form-fieldset");

    const saveButton = document.createElement("button");
    saveButton.classList.add("save-button");
    saveButton.textContent = "Guardar cambios";
    saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      updateClient();
    });
    clientFormData.append(
      clientId,
      inputId.container,
      checkActive.container,
      inputFacturacionName.container,
      inputAlias.container,
      inputCif.container,
      inputPhone.container,
      inputAddress.container,
      inputCP.container,
      inputPopulation.container,
      inputProvince.container,
      //inputCountry.container,
      saveButton
    );
  }
}
/////////////////

function setFormNewClient() {
  dashBoard.innerHTML = "";
  pageTitle.textContent = "Nuevo Cliente";

  const clientFormEdit = document.createElement("form");
  clientFormEdit.id = "client-form";

  const clientFormData = document.createElement("div");
  clientFormData.classList.add("client-form-data-block");

  clientFormEdit.append(clientFormData);
  dashBoard.append(clientFormEdit);

  setClientData();

  setClientContacts();

  function setClientData() {
    const checkActive = new FormField("Cliente activo: ", "active", "checkbox", "", "client-form-fieldset");

    checkActive.container.querySelector("input").value = 1;

    checkActive.container.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        e.target.value = 1;
      } else {
        e.target.value = 0;
      }
    });

    const inputId = new FormField("id:", "id", "hidden", "", "hidden");
    const inputFacturacionName = new FormField("Nombre facturación: ", "facturation-name", "text", "", "client-form-fieldset");
    const inputAlias = new FormField("Nombre comercial: ", "alias", "text", "", "client-form-fieldset");
    const inputCif = new FormField("C.I.F.: ", "cif", "text", "", "client-form-fieldset");
    const inputPhone = new FormField("Teléfono: ", "phone", "text", "", "client-form-fieldset");
    const inputAddress = new FormField("Dirección: ", "address", "text", "", "client-form-fieldset");
    const inputCP = new FormField("C.P.: ", "cp", "text", "", "client-form-fieldset");
    const inputProvince = new FormField("Provincia: ", "province", "text", "", "client-form-fieldset");
    const inputPopulation = new FormField("Población: ", "population", "text", "", "client-form-fieldset");
    //const inputCountry = new FormField("Pais: ", "country", "text", client.pais, "client-form-fieldset");

    const saveButton = document.createElement("button");
    saveButton.classList.add("save-button");
    saveButton.textContent = "Guardar cambios";
    saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      saveNewClient();
    });
    clientFormData.append(
      inputId.container,
      //checkActive.container,
      inputFacturacionName.container,
      inputAlias.container,
      inputCif.container,
      inputPhone.container,
      inputAddress.container,
      inputCP.container,
      inputPopulation.container,
      inputProvince.container,
      //inputCountry.container,
      saveButton
    );

    function saveNewClient() {
      const datosFormulario = new FormData(document.querySelector("#client-form"));
      //console.log(datosFormulario);
      if (datosFormulario.get("facturation-name") != "") {
        const headers = setHeadersAuthSesion(); // Este método esta en el archivo de session.js
        fetch(globalClientPost, {
          method: "POST",
          headers: headers,
          body: datosFormulario,
        })
          .then((response) =>
            response.json().then((data) => {
              if (data[0] == 200) {
                //modalMessage("success","El alta se ha realizado correctamente");
                const newModal = new Modal("newClient", "El alta se ha realizado correctamente");
                dashBoard.append(newModal.container);
                clientFormEdit.reset();
              }
              console.log("Mensaje del servidor:", data);
            })
          )
          .catch((error) => {
            const newModal = new modalMessage(error);
            dashBoard.append(newModal.container);
            console.error("Error:", error);
          });
      } else {
        //console.log("Show error")
      }
    }
  }
}
function updateClient() {
  // console.log(sessionData.token,sessionData.id);
  const token = sessionData.token;
  const userId = sessionData.id;
  const headers = new Headers();
  //headers.append("Authorization", `Bearer ${token}`);
  headers.append("X-User-ID", userId);
  headers.append("X-Token", token);
  //console.log(headers);
  //console.log(idCliente);
  const datosFormulario = new FormData(document.querySelector("#client-form"));
  //console.log("datos formulario", datosFormulario);
  fetch(globalClientUpdate, {
    method: "POST",
    headers: headers,
    body: datosFormulario,
  }).then((response) => {
    // console.log(response);
    response.json().then((data) => {
      // console.log(data);
      if (data[0] == 404) {
        alert("Usuario no logado");
        window.location = "index.html";
      }
      if (data[0] == 401) {
        alert("Tiempo de sesion expirado");
        window.location = "index.html";
      }
    });
  });
}
