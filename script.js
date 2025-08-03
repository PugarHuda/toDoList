const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const addTaskBtn = document.getElementById("addTaskBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Tampilkan tanggal sekarang
document.getElementById(
  "time"
).textContent = `Tanggal: ${new Date().toLocaleDateString()}`;

// Tambah Tugas
addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const level = priority.value;
  const date = dateInput.value;

  if (!task || !date) {
    alert("Tolong lengkapi tugas dan tanggal!");
    return;
  }

  const li = document.createElement("li");
  li.classList.add(level.toLowerCase());

  // Tandai overdue jika tanggal di masa lalu
  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    li.classList.add("overdue");
  }

  li.innerHTML = `
    <span>${task} - <strong>${level}</strong> - ${date}</span>
    <div>
      <input type="checkbox" title="Selesai?" />
      <button class="delete">🗑</button>
    </div>
  `;

  // Checkbox: tugas selesai
  const checkbox = li.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      li.classList.add("done");
      doneList.appendChild(li);
    } else {
      li.classList.remove("done");
      todoList.appendChild(li);
    }
  });

  // Tombol hapus tugas
  const deleteBtn = li.querySelector(".delete");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // Tambahkan ke daftar To-Do
  todoList.appendChild(li);

  // Reset input
  taskInput.value = "";
  dateInput.value = "";
  priority.value = "Low";
});

// Hapus semua tugas
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Apakah kamu yakin ingin menghapus semua tugas?")) {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
  }
});
