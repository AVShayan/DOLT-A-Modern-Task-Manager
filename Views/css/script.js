const BASE_URL = "http://localhost:3500";
var t;

async function fetchJSON(url, options = {}) {
  const res = await fetch(BASE_URL + url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

async function getTasks() {
  return fetchJSON("/tasks");
}

async function checkTask(id){
    try{
        const res = await fetch(`http://localhost:3500/tasks/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
        })
        const data = await res.json();
        t= (data.task == null) ? 1 : 0;
    } catch(err){
        console.error(err);
    }
}
async function createTask(data) {
  return fetchJSON("/tasks", {
    method: "POST",
    body: data
  });
}

async function updateTask(data) {
  return fetchJSON('/tasks', {
    method: "PUT",
    body: data
  });
}

async function deleteTask(id) {
  return fetchJSON(`/tasks`, { method: "DELETE" ,
  body: JSON.stringify(id)});
}

async function deleteAllTasks(){
  return fetch('/tasks/reset', {
    method:"DELETE"
  });
}

const form = document.getElementById("itemForm");
const itemsEl = document.getElementById("items");
const button = document.getElementById("resetBtn");

async function loadAndRender() {
  try {
    const tasks = await getTasks();
    itemsEl.innerHTML = "";
    if (!tasks.length) {
      itemsEl.innerHTML = "<p>You're Free Right Now!</p>";
      return;
    }
    tasks.forEach(t => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <p id="id_s"><strong>${t.id}</strong></p>
        <p id="task">${t.task_det}</p>
        <button class="icon-btn" onclick="handleDelete(${t.id})"> ❌ </button>
      `;
      itemsEl.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("ID").value;
  const task_desc = document.getElementById("task_dec").value;
  const data = {id:`${id}`,task_det:`${task_desc}`};
  await checkTask(id);
  if(t === 1){
    await createTask(JSON.stringify(data));
  } else{
    await updateTask(JSON.stringify(data));
  }
  form.reset();
  loadAndRender(); 
});

button.addEventListener("click", async(r) => {
  r.preventDefault();
  alert("Do you want to delete all your tasks?")
  await deleteAllTasks();
  form.reset();
  loadAndRender();
})

async function handleDelete(id) {
  alert("Did you complete the task?");
    await deleteTask({id});
    loadAndRender();
  }

loadAndRender();