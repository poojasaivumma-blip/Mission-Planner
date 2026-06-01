const missionInput = document.getElementById("missionInput");
const missionDate = document.getElementById("missionDate");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");

const missionList = document.getElementById("missionList");
const activeCount = document.getElementById("activeCount");
const progressFill = document.getElementById("progressFill");
const percentText = document.getElementById("percentText");

let missions = [];

addBtn.addEventListener("click", () => {
  if (!missionInput.value.trim()) return;

  missions.push({
    id: Date.now(),
    text: missionInput.value,
    date: missionDate.value,
    priority: priority.value,
    completed: false
  });

  missionInput.value = "";
  render();
});

function isOverdue(date) {
  if (!date) return false;
  const today = new Date().setHours(0,0,0,0);
  const missionDate = new Date(date).setHours(0,0,0,0);
  return missionDate < today;
}

function render() {
  missionList.innerHTML = "";

  let completed = 0;

  missions.forEach(m => {

    if (m.completed) completed++;

    const card = document.createElement("div");
    card.className = "mission";

    if (isOverdue(m.date) && !m.completed) {
      card.classList.add("overdue");
    }

    card.innerHTML = `
      <div class="left">

        <div class="priority-bar ${m.priority}"></div>

        <input type="checkbox" ${m.completed ? "checked" : ""}/>

        <div>
          <div class="${m.completed ? "completed" : ""}">${m.text}</div>
          <small>${m.date || "No date"}</small>
        </div>

      </div>

      <button class="deleteBtn">Delete</button>
    `;

    // checkbox
    card.querySelector("input").addEventListener("change", () => {
      m.completed = !m.completed;
      render();
    });

    // delete
    card.querySelector(".deleteBtn").addEventListener("click", () => {
      missions = missions.filter(x => x.id !== m.id);
      render();
    });

    missionList.appendChild(card);
  });

  // ACTIVE
  const active = missions.length - completed;
  activeCount.textContent = `Active Missions: ${active}`;

  // PROGRESS
  const percent = missions.length ? Math.round((completed / missions.length) * 100) : 0;

  progressFill.style.width = percent + "%";
  percentText.textContent = percent + "%";
}
