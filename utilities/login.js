"use strict";
console.log("login.js 1.2");
function getLogin() {
  const formContaier = document.querySelector("#login-form");
  const awaitDiv = document.querySelector(".await");
  formContaier.addEventListener("submit", (e) => {
    e.preventDefault();
    const loader = new Loader("Esperando autenticación de servidor");
    document.querySelector("body").append(loader.container);
    const formData = new FormData(formContaier);
    fetch(globalLoginQuery, {
      method: "POST",
      body: formData,
    }).then((response) => {
      //NOTE: esto no se realza
      console.log(response);
      response.json().then((data) => {
        console.log(data, typeof data);
        if (typeof data == "string") {
          alert(data);
        }
        if (typeof data == "object") {
          setSession(data);
          loader.destroy();
          window.location = "pages/index.html";
        }
      });
    });
  });
  
}
getLogin();
