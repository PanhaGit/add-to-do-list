// Get elements from the DOM
const form = document.getElementById("form");
const InputAddToDo = document.getElementById("InputAddToDo");
const listUl = document.getElementById("list_ul");
const btnClearAll = document.getElementById("btnClearAll");
const pending = document.getElementById("pending");
const toDoList = [];

//  3. Function to render the to-do list
const showList = () => {
  let ul = "";
  toDoList.map((item, index) => {
    ul += `
        <li>
            <span 
              class="${item.completed ? "line-through" : ""}" 
              onclick='handleLineThrough(${index})'>
              ${item.text}
            </span>
            <button class="btn_delete" onclick='handleDeleteTodoList(${index})'>
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </li>
    `;
  });
  listUl.innerHTML = ul;
  updatePendingCount(); // Update the pending tasks count
};

// 1 . Function to add a new to-do item
const handleAddToDoList = () => {
  const input = InputAddToDo.value;
  if (input) {
    // console.log(input);
    // toDoList.push({ key: value, key: value });
    toDoList.push({ text: input, completed: false });
    InputAddToDo.value = ""; // Clear input value
    showList(); // Display new to-do list
  }
};

// 2. Function to delete a to-do item by index
const handleDeleteTodoList = (index) => {
  toDoList.splice(index, 1);
  showList(); // Update the displayed list after deleting the item
};

// 4. Function to delete all to-do items
const handleDeleteTodoListAll = () => {
  toDoList.length = 0; // Empty the toDoList array
  showList(); // Update the displayed list after deleting all items
};
// Add event listener to the clear all button
btnClearAll.addEventListener("click", handleDeleteTodoListAll);

// 5.  Function to toggle the line-through effect on a to-do item
const handleLineThrough = (index) => {
  toDoList[index].completed = !toDoList[index].completed;
  showList(); // Update the displayed list after toggling the line-through
};

// 6 .Function update pending tasks count
const updatePendingCount = () => {
  const pendingTasks = toDoList.filter((item) => !item.completed).length;
  pending.textContent = `You have ${pendingTasks} pending tasks`;
};

// 2. Add event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddToDoList();
});

// Add event listener for keypress on the input field
InputAddToDo.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAddToDoList();
  }
});
