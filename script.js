//Creating a task to add to the dom
const addAListItemToDom = (contentTextNode, classListP, hashId, trueFalse) => {
  const newDiv = document.createElement("div");
  newDiv.classList = "todo-list-item";
  const newCheckbox = document.createElement("input");
  newCheckbox.classList = "checkbox";
  newCheckbox.id = contentTextNode;
  newCheckbox.name = hashId;
  newCheckbox.type = "checkbox";
  newCheckbox.checked = trueFalse;
  const newTextInput = document.createElement("input");
  newTextInput.id = hashId;
  newTextInput.classList = classListP;
  newTextInput.value = contentTextNode;
  const newDiv2 = document.createElement("div");
  newDiv2.classList = "button-wrapper";
  const newDeleteButton = document.createElement("button");
  newDeleteButton.classList = "delete-button";
  newDeleteButton.id = hashId;
  newDiv2.appendChild(newDeleteButton);
  newDiv.appendChild(newCheckbox);
  newDiv.appendChild(newTextInput);
  newDiv.appendChild(newDiv2);
  document.querySelector(".todo-task-list").appendChild(newDiv);
};

//Adding an eventlistener to submitting the form (text input field or add button) to add a task to the list
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const valueInputField = document.querySelector(".input-text-field");
  if (valueInputField.value !== "") {
    makingAPOSTRequest({ description: valueInputField.value, done: false });
    valueInputField.value = "";
  }
});

//Loading the data from GET request and writing it to the dom
const loadingGatheredAPITasks = async () => {
  const result = await getAPICallToGetAllTasks(API_BASIS);
  let tasks = Object.keys(result).map((key) => ({
    id: key,
    description: result[key].description,
    done: result[key].done,
  }));
  tasks.forEach((todoItem) => {
    if (todoItem.done === true) {
      let classListP = "done";
      let checkedTrueFalse = true;
      addAListItemToDom(
        todoItem.description,
        classListP,
        todoItem.id,
        checkedTrueFalse
      );
    } else if (todoItem.done === false) {
      let classListP = "not-done";
      let checkedTrueFalse = false;
      addAListItemToDom(
        todoItem.description,
        classListP,
        todoItem.id,
        checkedTrueFalse
      );
    }
  });
};
loadingGatheredAPITasks();

//Handling a POST request
const makingAPOSTRequest = async (body) => {
  await postAPICallToAddTask(API_BASIS, body);
};

//Adding an eventlistener to the delete button and to the input field to edit a task
document.addEventListener("click", (event) => {
  if (event.target.className === "delete-button") {
    makingADELETERequest(event.target.id);
    const target = event.target;
    const parentElement = target.parentElement;
    const parentParentElement = parentElement.parentElement;
    parentParentElement.remove();
  } else if (
    event.target.className === "done" ||
    event.target.className === "not-done"
  ) {
    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13) {
        makingAPUTRequest(event.target.id, {
          description: event.target.value,
          done: false,
        });
        const textField = document.querySelector(".input-text-field");
        textField.focus();
      }
    });
  }
});

//Handling a DELETE request
const makingADELETERequest = async (hashId) => {
  await deleteAPICallToDeleteATask(API_DELETE + hashId + ".json");
};

//Adding an eventlistener to the radiobutton to show a task is done (line-through) or not done
document.addEventListener("change", (event) => {
  if (event.target.className === "checkbox") {
    const nextSibling = event.target.nextSibling;
    if (event.target.checked === true) {
      makingAPUTRequest(event.target.name, {
        description: event.target.id,
        done: true,
      });
      nextSibling.style.textDecoration = "line-through";
    } else {
      makingAPUTRequest(event.target.name, {
        description: event.target.id,
        done: false,
      });
      nextSibling.style.textDecoration = "none";
    }
  }
});

//Handling a PUT request to update a task
const makingAPUTRequest = async (hashId, body) => {
  await putAPICallToUpdateATask(API_DELETE + hashId + ".json", body);
};
