const addNewTopic = document.getElementById("topics");
function addTopic() {
    const div = document.createElement("div");
    div.innerHTML = `
        <input type="text" placeholder="Enter the Topic" class="topic">
        <label>Time (hours):</label>
        <input type="number" class="time" min="1" placeholder="Hours"> <br>
    `;
    addNewTopic.appendChild(div);
}
function saveData() {
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;

    if (!name || !date) {
        alert("Please enter Exam Name and Date!");
        return;
    }

    const topicInputs = document.querySelectorAll(".topic");
    const timeInputs = document.querySelectorAll(".time");

    let topics = [];
    for (let i = 0; i < topicInputs.length; i++) {
        if (topicInputs[i].value && timeInputs[i].value) {
            topics.push({
                topic: topicInputs[i].value,
                time: timeInputs[i].value
            });
        }
    }

    if (topics.length === 0) {
        alert("Please add at least one topic!");
        return;
    }

    const examDetails = {
        id: Date.now(),
        name: name,
        date: date,
        topics: topics
    };

    let plans = JSON.parse(localStorage.getItem("plans")) || [];
    plans.push(examDetails);
    localStorage.setItem("plans", JSON.stringify(plans));

    alert("Plan Saved Successfully ..");
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("topics").innerHTML = `
        <input type="text" placeholder="Enter the Topic" class="topic">
        <label>Time (hours):</label>
        <input type="number" class="time" min="1" placeholder="Hours"> <br>
    `;
}
function showData() {
    const plansDiv = document.getElementById("studyplans");
    plansDiv.innerHTML = "";
    const plans = JSON.parse(localStorage.getItem("plans")) || [];

    if (plans.length === 0) {
        plansDiv.innerHTML = "<p>No previous plans fouund</p>";
        return;
    }

    plans.forEach((plan) => {
        const examDate = new Date(plan.date);
        const today = new Date();
        const diffTime = examDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const div = document.createElement("div");
        div.className = "plan";

        div.innerHTML = `
            <h3>${plan.name} 📅 (${plan.date})</h3>
            <p><b>Days Left:</b> ${daysLeft >= 0 ? daysLeft + " days" : "Exam Over"}</p>
            <div class="flowchart">
                <b>Study Plan:</b><br>
                ${plan.topics.map(t => `👉 ${t.topic} → ${t.time} hrs`).join("<br>")}
            </div>
            <button class="delete-btn" onclick="deletePlan(${plan.id})">Delete Plan</button>
        `;

        plansDiv.appendChild(div);
    });
}


function deletePlan(id) {
    let plans = JSON.parse(localStorage.getItem("plans")) || [];
    plans = plans.filter(plan => plan.id !== id);
    localStorage.setItem("plans", JSON.stringify(plans));
    showData();
}
