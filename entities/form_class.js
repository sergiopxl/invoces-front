class Form{
  container;
  wrapper;
  saveButton;
  header
  constructor(headerContent,id,method,fields,action){
    this.container = document.createElement("form");
    this.container.id = id;
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("client-form-data-block");
    this.saveButton =  document.createElement("button");
    this.saveButton.classList.add("save-button");
    this.saveButton.textContent = "Guardar cambios";
    this.saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      action();
    });
    if(headerContent && headerContent != ""){
      this.header = document.createElement("small");
      this.header.classList.add("header-form");
      this.header.textContent = headerContent;
      this.wrapper.append(this.header);
    }
    this.container.append(this.wrapper);
    switch(method){
      case "UPDATE" : 
     this.setFields(fields);
    }
    this.wrapper.append(this.saveButton);
  }
  setFields(fields){
    console.log("fields[0]",fields[0].data);
    //TODO: estoy hay que repensarlo por que tiene numeros mágicos y no es legible
    fields.forEach(field => {      
      const newField = new FormField(field.label,field.name,field.type,field.data,field.cssClass);
      this.wrapper.append(newField.container);
    });
  }
}

class FormField {
  container;
  fieldLabel;
  fieldInput;
  constructor(label, name, type, data, cssClass) {
    this.container = document.createElement("div");
    this.container.classList.add("form-fieldset");
    console.log(label, name);

    if (cssClass != "") {
      this.container.classList.add(cssClass);
    }

    this.fieldLabel = document.createElement("label");
    this.fieldLabel.textContent = label;
    this.fieldInput = document.createElement("input");
    this.fieldInput.setAttribute("name", name);
    this.fieldInput.setAttribute("type", type);
    if(data && data != ""){
      this.fieldInput.value = data;
    }else{
      this.fieldInput.value = "";
    }
    if(type == "checkbox"){
      this.fieldInput.setAttribute("checked", "checked");
    }
    
    this.container.append(this.fieldLabel, this.fieldInput);
  }
}