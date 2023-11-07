class Loader {
  container;
  animation;
  message;
  constructor(msg){
    this.container = document.createElement("div");
    this.container.classList.add("loader");
    this.animation = document.createElement("div");
    this.animation.classList.add("loader-animation");
    this.message = document.createElement("p");
    this.message.textContent = msg;
    this.container.append(this.animation, this.message)
  }
  destroy(){
    this.container.remove();
  }  
}