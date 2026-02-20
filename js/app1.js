let foods = [];
let userLocation = null;

// ---------- AUTH ----------
function signup() {
    const role = document.getElementById("role").value;
    localStorage.setItem("role", role);

    if (role === "donor") location.href = "donor.html";
    if (role === "receiver") location.href = "receiver.html";
    if (role === "volunteer") location.href = "volunteer.html";
}

// ---------- STORAGE ----------
function saveFoods() {
    localStorage.setItem("foods", JSON.stringify(foods));
}

function loadFoods() {
    const data = localStorage.getItem("foods");
    if (data) foods = JSON.parse(data);
}

// ---------- IMAGE ----------
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
}

// ---------- DONOR ----------
function addFood() {
    const name = document.getElementById("foodName").value;
    const date = document.getElementById("expiryDate").value;
    const time = document.getElementById("expiryTime").value;
    const pickup = document.getElementById("pickup").value;
    const img = document.getElementById("foodPic").files[0];

    if (!name || !date || !time || !pickup || !img) {
        alert("Fill all fields");
        return;
    }

    const expiry = `${date}T${time}`;

    getBase64(img, (imgData) => {
        const food = {
            id: Date.now(),
            name,
            expiry,
            pickup,
            img: imgData,
            status: "Available"
        };

        foods.push(food);
        saveFoods();
        renderDonor();

        // clear form
        foodName.value = "";
        expiryDate.value = "";
        expiryTime.value = "";
        pickup.value = "";
        foodPic.value = "";
        document.getElementById("preview").src = "";
    });
}

function renderDonor() {
    const list = document.getElementById("foodList");
    if (!list) return;

    list.innerHTML = "";

    foods.forEach(f => {
        const div = document.createElement("div");
        div.className = "food-card";
        div.innerHTML = `
            <img src="${f.img}">
            <h3>${f.name}</h3>
            <p>Status: ${f.status}</p>
            <p>Pickup: ${f.pickup}</p>
        `;
        list.appendChild(div);
    });
}

// ---------- RECEIVER ----------
function renderReceiver() {
    const list = document.getElementById("receiverFoodList");
    if (!list) return;

    list.innerHTML = "";

    foods.forEach((f, i) => {
        if (f.status === "Available") {
            const div = document.createElement("div");
            div.className = "food-card";
            div.innerHTML = `
                <img src="${f.img}">
                <h3>${f.name}</h3>
                <p>Pickup: ${f.pickup}</p>
                <button onclick="takeOrder(${i})">Take Order</button>
            `;
            list.appendChild(div);
        }
    });
}

function takeOrder(i) {
    foods[i].status = "Accepted";
    saveFoods();
    alert("Thank you for reducing food waste 💙");
    renderReceiver();
    renderDonor();
    renderVolunteer();
}

// ---------- VOLUNTEER ----------
function renderVolunteer() {
    const list = document.getElementById("volunteerList");
    if (!list) return;

    list.innerHTML = "";

    foods.forEach((f, i) => {
        if (f.status === "Accepted") {
            const div = document.createElement("div");
            div.className = "food-card";
            div.innerHTML = `
                <img src="${f.img}">
                <h3>${f.name}</h3>
                <p>Pickup: ${f.pickup}</p>
                <button onclick="deliver(${i})">Start Delivery</button>
            `;
            list.appendChild(div);
        }
    });
}

function deliver(i) {
    foods[i].status = "Delivered";
    saveFoods();
    renderVolunteer();
    renderDonor();
}

// ---------- IMAGE PREVIEW ----------
function previewImage() {
    const file = document.getElementById("foodPic").files[0];
    const preview = document.getElementById("preview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    }
}


// ---------- LOAD ----------
window.onload = () => {
        loadFoods();
        renderDonor();
        renderReceiver();
        renderVolunteer();
    }
    /* ===== existing JS ends here ===== */



/* ============================= */
/* FOOD BRIDGE SYSTEM LOGIC */
/* ============================= */

let foodData = JSON.parse(localStorage.getItem("foodData")) || [];

function addFood() {
    const name = document.getElementById("foodName").value;
    const date = document.getElementById("expiryDate").value;
    const time = document.getElementById("expiryTime").value;
    const imgInput = document.getElementById("foodImg");

    if (!name || !date || !time || !imgInput.files[0]) {
        alert("Fill all fields");
        return;
    }

    const reader = new FileReader();
    reader.onload = function() {
        foodData.push({
            name,
            date,
            time,
            img: reader.result,
            status: "Available"
        });

        localStorage.setItem("foodData", JSON.stringify(foodData));
        alert("Food Added Successfully");
        renderFoods();
    };

    reader.readAsDataURL(imgInput.files[0]);
}

function renderFoods() {
    const donorBox = document.getElementById("donorList");
    const receiverBox = document.getElementById("receiverList");
    const volunteerBox = document.getElementById("volunteerList");

    if (donorBox) donorBox.innerHTML = "";
    if (receiverBox) receiverBox.innerHTML = "";
    if (volunteerBox) volunteerBox.innerHTML = "";

    foodData.forEach((food, i) => {
        if (donorBox) {
            donorBox.innerHTML += `
            <div class="food-card">
                <img src="${food.img}">
                <div>
                    <b>${food.name}</b><br>
                    Exp: ${food.date} ${food.time}<br>
                    <span class="status-text">Status: ${food.status}</span>
                </div>
            </div>`;
        }

        if (receiverBox && food.status === "Available") {
            receiverBox.innerHTML += `
            <div class="food-card">
                <img src="${food.img}">
                <div>
                    <b>${food.name}</b><br>
                    Exp: ${food.date} ${food.time}<br><br>
                    <button class="dashboard-btn" onclick="requestFood(${i})">Take Order</button>
                </div>
            </div>`;
        }

        if (volunteerBox && food.status === "Requested") {
            volunteerBox.innerHTML += `
            <div class="food-card">
                <img src="${food.img}">
                <div>
                    <b>${food.name}</b><br>
                    <span class="status-text">Receiver waiting</span><br><br>
                    <button class="dashboard-btn" onclick="pickupFood(${i})">Pickup</button>
                </div>
            </div>`;
        }
    });
}

function requestFood(i) {
    foodData[i].status = "Requested";
    localStorage.setItem("foodData", JSON.stringify(foodData));
    alert("Request sent to Donor & Volunteer");
    renderFoods();
}

function pickupFood(i) {
    foodData[i].status = "Picked by Volunteer";
    localStorage.setItem("foodData", JSON.stringify(foodData));
    alert("Pickup Confirmed");
    renderFoods();
}

window.onload = renderFoods;