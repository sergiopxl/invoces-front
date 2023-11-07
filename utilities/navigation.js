"use strict";
console.log("navigation.js 1.1");

const initNavigation = ()=>{
  getSession();
  const navButtons = {
   // parents : document.querySelectorAll(".nav-parent"),
    inicio : document.querySelector("#nav-inicio"),
    clientes : document.querySelector("#nav-clientes"),
    proveedores : document.querySelector("#nav-proveedores"),
    ingresos : document.querySelector("#nav-ingresos"),
    rectificativas : document.querySelector("#nav-rectificativas"),
    gastos : document.querySelector("#nav-gastos"),
    presupuestos : document.querySelector("#nav-presupuestos"),
    pendientes : document.querySelector("#nav-pendientes"),
    calendario : document.querySelector("#nav-calendario"),
    informes : document.querySelector("#nav-informes"),
    graficos : document.querySelector("#nav-graficos"),
    analiticaListado : document.querySelector("#nav-analitica-listado"),
    analiticaTotales : document.querySelector("#nav-analitica-totales"),
    analiticaClientes : document.querySelector("#nav-analitica-clientes"),
    usuarios : document.querySelector("#nav-usuarios"),
    configuracion : document.querySelector("#nav-configuracion")    
  }
  

  navButtons.clientes.addEventListener("click",clientList)
}

initNavigation();