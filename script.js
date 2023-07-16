const FLIPPER_FLAGS = {
  reRenderVersion: 1,
  // reRenderVersion: 2,

  mockData: false, // alternate is false
};
if (FLIPPER_FLAGS.mockData) {
  const mockElement = "Wake up";
  for (let i = 0; i < 100; i++) {
    todos.push(mockElement);
  }
}

// app code STARTS here
const todos = ["Wake up", "Wash up", "Have Breadkfast"];
const todosListNode = document.querySelector("#todos-list");

/*
 update (replace) given li node

 listData = array of strings
 listNode = container (could be ul)
 */
function reRenderList(listData, listNode) {
  const startTime = Date.now();

  if (FLIPPER_FLAGS.reRenderListVersion === 2) {
    for (let i = 0; i < listData.length; i++) {
      appendToTodoList(listData[i], listNode);
    }
    const endTime = Date.now();
    console.log((endTime - startTime) / 1000);
    return;
  }
  listNode.innerHTML = "";
  for (let i = 0; i < listData.length; i++) {
    //  List markup - <li>Wake up</li>
    // const newItem = document.createElement("li");
    // newItem.textContent = listData[i];
    // listNode.appendChild(newItem);

    console.log();
    // Updated list item markup
    // <li><span>Wake up</span><button>Done</button></li>
    const newItem = document.createElement("li");
    const todoText = document.createElement("span");
    const deleteButton = document.createElement("button");
    // deleteButton.setAttribute("class", "done-button");
    // Add deletion code

    todoText.textContent = listData[i];
    deleteButton.textContent = "Done";
    newItem.appendChild(todoText);
    newItem.appendChild(deleteButton);
    listNode.appendChild(newItem);
    deleteButton.addEventListener("click", () => {
      newItem.innerHTML = "";
      newItem.remove();
    });
  }
  const endTime = Date.now();
  console.log("reRenderList", (endTime - startTime) / 1000);
}

function appendToTodoList(newTodoText, listNode) {
  const startTime = Date.now();

  // create new list node
  const newItem = document.createElement("li");

  // create new list node children nodes
  const todoText = document.createElement("span");
  const deleteButton = document.createElement("button");

  todoText.textContent = newTodoText;

  deleteButton.textContent = "Done";
  deleteButton.setAttribute("class", "done-button");
  //   add click event here itself, to avoid the problem of 'which list item was clicked'
  deleteButton.addEventListener("click", () => {
    newItem.innerHTML = "";
    newItem.remove();
  });

  // add children node to the new list node
  newItem.appendChild(todoText);
  newItem.appendChild(deleteButton);

  // add list node to list container
  listNode.appendChild(newItem);

  // ___ perf test
  const endTime = Date.now();
  console.log("appendToTodoList", (endTime - startTime) / 1000);
}

// first render (list UI from array)
reRenderList(todos, todosListNode);

// add button
const addButton = document.querySelector("button#add-button");
addButton.addEventListener("click", () => {
  const input = document.querySelector("input");
  if (input.value === "") {
    // alert("Cannot add empty task");
    const addButtonErrorNode = document.querySelector("#add-button-error");
    addButtonErrorNode.toggleAttribute("hidden");
    setTimeout(() => {
      addButtonErrorNode.toggleAttribute("hidden");
    }, 2000);
    return;
  }
  todos.push(input.value);

  reRenderList([input.value], todosListNode);
  //   input.value = "";
});
