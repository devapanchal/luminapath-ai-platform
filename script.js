function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") return;

    let tasks = getTasks();

    tasks.push({ text: task, done: false });

    saveTasks(tasks);
    renderTasks();

    input.value = "";

    generateAI(task);
}
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = getTasks();

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleDone(${index})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        if (task.done) li.classList.add("done");

        taskList.appendChild(li);
    });

    updateUI();
}
function toggleDone(index) {
    let tasks = getTasks();

    tasks[index].done = !tasks[index].done;

    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    let tasks = getTasks();

    tasks.splice(index, 1);

    saveTasks(tasks);
    renderTasks();
}
function updateUI() {
    let tasks = getTasks();

    let total = tasks.length;
    let completed = tasks.filter(t => t.done).length;
    let pending = total - completed;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("total").innerText = total;
    document.getElementById("done").innerText = completed;
    document.getElementById("pending").innerText = pending;

    document.getElementById("progressBar").value = percent;
    document.getElementById("progressText").innerText = percent + "% completed";

    let completedList = document.getElementById("completedList");
    let pendingList = document.getElementById("pendingList");

    if (completedList && pendingList) {
        completedList.innerHTML = "";
        pendingList.innerHTML = "";

        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerText = task.text;

            if (task.done) {
                completedList.appendChild(li);
            } else {
                pendingList.appendChild(li);
            }
        });
    }

    // 📊 Update chart first
    updateChart(completed, pending);

    // 🤖 Then update AI (final step)
    generateAI(tasks[tasks.length - 1]?.text || "");
}
let chart;

function updateChart(completed, pending) {
    let ctx = document.getElementById("taskChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Completed", "Pending"],
            datasets: [{
                data: [completed, pending],
                backgroundColor: ["#22c55e", "#ef4444"]
            }]
        }
    });
}
function generateAI(task) {
    let tasks = getTasks();

    let completed = tasks.filter(t => t.done).length;
    let pending = tasks.length - completed;

    let suggestion = "";

    if (pending > completed) {
        suggestion = "You have many pending tasks. Focus on completing them first 🔥";
    } 
    else if (completed > pending) {
        suggestion = "Great progress! Keep going 🚀";
    } 
    else if (task && task.toLowerCase().includes("study")) {
        suggestion = "Use Pomodoro technique: 25 min study + 5 min break 📚";
    } 
    else if (task && task.toLowerCase().includes("gym")) {
        suggestion = "Stay consistent 💪 Discipline beats motivation";
    } 
    else {
        suggestion = "Stay focused and avoid distractions ⚡";
    }

    document.getElementById("aiText").innerText = suggestion;
}
document.addEventListener("DOMContentLoaded", renderTasks);