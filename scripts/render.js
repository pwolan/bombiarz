const render = () => {
  const form = document.createElement('form')
  form.id = 'form'
  const fields = ["Height", "Width", "Mines"];
  fields.forEach(field => {
    const div = document.createElement("div");
    div.classList.add('form-row')
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.id = field.toLowerCase()
    input.classList.add("start-values");
    label.textContent = field;
    label.appendChild(input);
    div.appendChild(label);
    form.appendChild(div);
  });

  const timeDiv = document.createElement("div");
  timeDiv.textContent = "0 [s]";
  timeDiv.id = 'time-div'
  form.appendChild(timeDiv);

  const generate = document.createElement("button");
  generate.textContent = "generuj";
  generate.id = 'generate'
  form.appendChild(generate);

  document.body.appendChild(form)
};