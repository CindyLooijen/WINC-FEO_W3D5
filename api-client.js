const API_BASIS = "https://wincacademydatabase.firebaseio.com/cindy/tasks.json";
const API_DELETE = "https://wincacademydatabase.firebaseio.com/cindy/tasks/";

const getAPICallToGetAllTasks = async (usedUrl) => {
  try {
    const resultGET = await fetch(usedUrl, {
      method: "GET",
    });
    const dataInJavascript = await resultGET.json();
    return dataInJavascript;
  } catch {
    console.log("Sorry het ophalen van de data is niet gelukt!");
  }
};

const postAPICallToAddTask = async (usedUrl, data) => {
  try {
    const resultPOST = await fetch(usedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const todoTaskList = document.querySelector(".todo-task-list");
    todoTaskList.querySelectorAll("div").forEach((element) => element.remove());
    await loadingGatheredAPITasks();
  } catch {
    console.log("Sorry het versturen van de data is niet gelukt");
  }
};

const deleteAPICallToDeleteATask = async (usedUrl) => {
  try {
    const resultDELETE = await fetch(usedUrl, {
      method: "DELETE",
    });
  } catch {
    console.log("Sorry het versturen van de data is niet gelukt");
  }
};

const putAPICallToUpdateATask = async (usedUrl, data) => {
  try {
    const resultPOST = await fetch(usedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    console.log("Sorry het versturen van de data is niet gelukt");
  }
};
