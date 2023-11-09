class Modal {
  message;
  container;
  closeBtn;  
  constructor(type,msg){
    this.container = document.createElement("div");
    this.container.classList.add("modal");
    this.closeBtn =  document.createElement("div");
    this.closeBtn.classList.add("btnClose");
    this.closeBtn.textContent = "X";
    this.closeBtn.addEventListener("click",()=>{
      this.destroy();
    });
    this.container.append(this.closeBtn);

    switch(type){
      case "success" : 
        this.container.classList.add("success");
      break;
      case "error" :
        this.container.classList.add("error");
      break;
    }
    this.message = document.createElement("p");
    this.message.classList.add("message");
    this.message.textContent = msg;
    this.container.append(this.message);
  }
  destroy(){
    console.log("mierda pa ti");
    this.container.remove();
  }
}