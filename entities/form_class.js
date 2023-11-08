class Form{
  container;
  constructor(id,method,fields){
    this.container = document.createElement("form");
    this.container.id = id;
    switch(method){
      case "UPDATE" : 
     this.setFields(fields);
    }
  }
  setFields(fields){
    fields.forEach(field => {
      console.log(field[0]);
      const newField = new FormField(field[0],field[1],field[2],field[3],field[4]);
      this.container.append(newField.container);
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
    this.fieldInput.value = data;
    this.container.append(this.fieldLabel, this.fieldInput);
  }
}