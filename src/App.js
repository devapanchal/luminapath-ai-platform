import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [aiText, setAiText] = useState("Start adding tasks...");

  function addTask() {
    if (!input.trim()) return;

    const newTasks = [...tasks, { text: input, done: false }];
    setTasks(newTasks);
    setInput("");
    generateAI(newTasks);
  }

  function toggleDone(index) {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
    generateAI(newTasks);
  }

  function generateAI(taskList) {
    const completed = taskList.filter(t => t.done).length;
    const pending = taskList.length - completed;

    if (pending > completed) setAiText("🔥 Focus on pending tasks!");
    else if (completed > pending) setAiText("🚀 Great progress!");
    else setAiText("⚡ Stay consistent");
  }

  const completed = tasks.filter(t => t.done).length;
  const pending = tasks.length - completed;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed || 0, pending || 0],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  // 🎨 PRO UI STYLES
  const cardStyle = {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px",
    color: "white",
    margin: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: "20px", color: "white" }}>
      
      <h1 style={{ textAlign: "center" }}>🤖 AI Dashboard Pro</h1>

      {/* INPUT SECTION */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: "10px", width: "250px", borderRadius: "8px" }}
        />
        <button
          onClick={addTask}
          style={{ padding: "10px 15px", marginLeft: "10px", borderRadius: "8px", cursor: "pointer" }}
        >
          Add
        </button>
      </div>

      {/* DASHBOARD CARDS */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        
        <div style={cardStyle}>
          <h3>📊 Total Tasks</h3>
          <h2>{tasks.length}</h2>
        </div>

        <div style={cardStyle}>
          <h3>✅ Completed</h3>
          <h2>{completed}</h2>
        </div>

        <div style={cardStyle}>
          <h3>⏳ Pending</h3>
          <h2>{pending}</h2>
        </div>
      </div>

      {/* CHART */}
      <div style={{ width: "300px", margin: "30px auto" }}>
        <Doughnut data={data} />
      </div>

      {/* TASK LIST */}
      <div style={{ ...cardStyle, maxWidth: "500px", margin: "auto" }}>
        <h3>📋 Tasks</h3>
        {tasks.map((task, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input type="checkbox" checked={task.done} onChange={() => toggleDone(index)} />
            <span style={{ marginLeft: "10px", textDecoration: task.done ? "line-through" : "none" }}>
              {task.text}
            </span>
          </div>
        ))}
      </div>

      {/* AI SECTION */}
      <div style={{ ...cardStyle, textAlign: "center", maxWidth: "500px", margin: "20px auto" }}>
        <h3>🧠 AI Suggestion</h3>
        <p>{aiText}</p>
      </div>
    </div>
  );
}

export default App;