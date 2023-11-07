"use strict"
console.log("session.js 1.1");
const setSession = (sessionData)=>{
  sessionStorage.setItem("user", JSON.stringify(sessionData));
}
const getSession = ()=>{
  const sessionVar = sessionStorage.getItem("user");
  if(sessionVar){
    return JSON.parse(sessionVar);
  }else{
    window.location = "index.html";
  }
}
function setHeadersAuthSesion(){
  console.log(sessionData.token, sessionData.id);
  const token = sessionData.token;
  const userId = sessionData.id;
  const headers = new Headers();
  //headers.append("Authorization", `Bearer ${token}`);
  headers.append("X-User-ID", userId);
  headers.append("X-Token", token);
  return headers;
}
const clearSession = () =>{

}