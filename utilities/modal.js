class Modal {
  message;
  container;
  closeBtn;
  constructor(type, msg, newForm) {
    this.container = document.createElement("div");
    this.container.classList.add("modal");
    this.closeBtn = document.createElement("div");
    this.closeBtn.classList.add("btnClose");
    this.closeBtn.textContent = "X";
    this.closeBtn.addEventListener("click", () => {
      this.destroy();
    });
    this.container.append(this.closeBtn);

    if (type == "success") {
      this.container.classList.add("success");
      this.setMessage(msg);
    }

    if (type == "error") {
      this.container.classList.add("error");
      this.setMessage(msg);
    }
    if (type == "form") {
      this.container.classList.add("form");
      this.setForm(newForm);
    }
  }
  destroy() {
    console.log("mierda pa ti");
    this.container.remove();
  }
  setMessage(msg) {
    this.message = document.createElement("p");
    this.message.classList.add("message");
    this.message.textContent = msg;
    this.container.append(this.message);
  }
  setForm(form) {
    console.log(form);
    this.container.append(form.container);
  }
}
class Modalform {}
