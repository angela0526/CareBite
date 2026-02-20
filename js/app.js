// ===========================
// CAREBITE - app.js
// ===========================


// ===========================
// REGISTER
// ===========================
function showRoleFields() {
    const role = document.getElementById('regRole').value;
    document.getElementById('donorFields').style.display = role === 'donor' ? 'block' : 'none';
    document.getElementById('receiverFields').style.display = role === 'receiver' ? 'block' : 'none';
}

function register() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    const role = document.getElementById('regRole').value;

    if (!name || !email || !phone || !password || !role) {
        document.getElementById('registerError').innerText = '⚠️ Please fill all required fields!';
        return;
    }
    if (password !== confirm) {
        document.getElementById('registerError').innerText = '❌ Passwords do not match!';
        return;
    }

    const users = JSON.parse(localStorage.getItem('cb_users') || '[]');
    if (users.find(u => u.email === email)) {
        document.getElementById('registerError').innerText = '❌ Email already registered!';
        return;
    }

    const newUser = { name, email, phone, password, role };

    if (role === 'donor') {
        newUser.donorType = document.getElementById('donorType').value;
        newUser.orgName = document.getElementById('orgName').value;
    }
    if (role === 'receiver') {
        newUser.ngoName = document.getElementById('ngoName').value;
        newUser.ngoReg = document.getElementById('ngoReg').value;
        newUser.peopleServed = document.getElementById('peopleServed').value;
    }

    users.push(newUser);
    localStorage.setItem('cb_users', JSON.stringify(users));
    localStorage.setItem('cb_currentUser', JSON.stringify(newUser));

    if (role === 'donor') window.location.href = 'donor.html';
    else if (role === 'receiver') window.location.href = 'receiver.html';
}


// ===========================
// LOGIN
// ===========================
function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    if (!email || !password || !role) {
        document.getElementById('loginError').innerText = '⚠️ Please fill all fields!';
        return;
    }

    const users = JSON.parse(localStorage.getItem('cb_users') || '[]');
    const user = users.find(u =>
        u.email === email &&
        u.password === password &&
        u.role === role
    );

    if (!user) {
        document.getElementById('loginError').innerText = '❌ Invalid email, password or role!';
        return;
    }

    localStorage.setItem('cb_currentUser', JSON.stringify(user));

    if (role === 'donor') window.location.href = 'donor.html';
    else if (role === 'receiver') window.location.href = 'receiver.html';
}


// ===========================
// LOGOUT
// ===========================
function logout() {
    localStorage.removeItem('cb_currentUser');
    window.location.href = 'index.html';
}


// ===========================
// DONOR FUNCTIONS
// ===========================
function addFood() {
    const user = JSON.parse(localStorage.getItem('cb_currentUser'));
    if (!user || user.role !== 'donor') {
        alert('Please login as a donor first!');
        window.location.href = 'login.html';
        return;
    }

    const foodName = document.getElementById('foodName').value.trim();
    const expiryDate = document.getElementById('expiryDate').value;
    const expiryTime = document.getElementById('expiryTime').value;
    const foodImgFile = document.getElementById('foodImg').files[0];

    if (!foodName || !expiryDate || !expiryTime) {
        alert('⚠️ Please fill all fields!');
        return;
    }

    if (foodImgFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            saveFood(user, foodName, expiryDate, expiryTime, e.target.result);
        };
        reader.readAsDataURL(foodImgFile);
    } else {
        saveFood(user, foodName, expiryDate, expiryTime, null);
    }
}

function saveFood(user, foodName, expiryDate, expiryTime, imgData) {
    const donations = JSON.parse(localStorage.getItem('cb_donations') || '[]');

    donations.push({
        id: Date.now(),
        donorName: user.name,
        donorEmail: user.email,
        foodName,
        expiryDate,
        expiryTime,
        image: imgData,
        status: 'Available',
        claimedBy: null
    });

    localStorage.setItem('cb_donations', JSON.stringify(donations));
    alert('✅ Food donation added successfully!');

    // Clear form
    document.getElementById('foodName').value = '';
    document.getElementById('expiryDate').value = '';
    document.getElementById('expiryTime').value = '';
    document.getElementById('foodImg').value = '';

    loadDonorList();
}

function loadDonorList() {
    const user = JSON.parse(localStorage.getItem('cb_currentUser'));
    if (!user) return;

    const donations = JSON.parse(localStorage.getItem('cb_donations') || '[]');
    const myDonations = donations.filter(d => d.donorEmail === user.email);
    const list = document.getElementById('donorList');
    if (!list) return;

    // Show welcome message
    const welcome = document.getElementById('welcomeMsg');
    if (welcome) welcome.innerText = `Welcome, ${user.name}! 👋`;

    if (myDonations.length === 0) {
        list.innerHTML = '<p style="color:#7dd3fc; text-align:center;">No donations yet. Add your first one above!</p>';
        return;
    }

    list.innerHTML = myDonations.map(d => `
        <div class="food-card">
            ${d.image
                ? `<img src="${d.image}" alt="food">`
                : `<div style="width:90px;height:90px;background:#0f172a;border-radius:10px;border:2px dashed #00c6ff;display:flex;align-items:center;justify-content:center;font-size:30px;">🍱</div>`
            }
            <div style="flex:1;">
                <h3 style="color:white; margin-bottom:6px;">${d.foodName}</h3>
                <p class="status-text">📅 Expiry: ${d.expiryDate} at ${d.expiryTime}</p>
                <p class="status-text">Status: <strong style="color:${d.status === 'Available' ? '#4ade80' : '#facc15'}">${d.status}</strong></p>
                ${d.claimedBy ? `<p class="status-text">🤝 Claimed by: ${d.claimedBy}</p>` : ''}
            </div>
            <button class="dashboard-btn" onclick="deleteFood(${d.id})" style="background:linear-gradient(135deg,#ff4e4e,#c0392b);">🗑️</button>
        </div>
    `).join('');
}

function deleteFood(id) {
    if (!confirm('Are you sure you want to delete this donation?')) return;
    let donations = JSON.parse(localStorage.getItem('cb_donations') || '[]');
    donations = donations.filter(d => d.id !== id);
    localStorage.setItem('cb_donations', JSON.stringify(donations));
    loadDonorList();
}


// ===========================
// RECEIVER FUNCTIONS
// ===========================
function loadReceiverList() {
    const user = JSON.parse(localStorage.getItem('cb_currentUser'));
    if (!user) return;

    const donations = JSON.parse(localStorage.getItem('cb_donations') || '[]');
    const available = donations.filter(d => d.status === 'Available');
    const list = document.getElementById('receiverList');
    if (!list) return;

    // Show welcome message
    const welcome = document.getElementById('welcomeMsg');
    if (welcome) welcome.innerText = `Welcome, ${user.name}! 👋`;

    if (available.length === 0) {
        list.innerHTML = '<p style="color:#7dd3fc; text-align:center;">No food available right now. Check back soon!</p>';
        return;
    }

    list.innerHTML = available.map(d => `
        <div class="food-card">
            ${d.image
                ? `<img src="${d.image}" alt="food">`
                : `<div style="width:90px;height:90px;background:#0f172a;border-radius:10px;border:2px dashed #00c6ff;display:flex;align-items:center;justify-content:center;font-size:30px;">🍱</div>`
            }
            <div style="flex:1;">
                <h3 style="color:white; margin-bottom:6px;">${d.foodName}</h3>
                <p class="status-text">👤 Donor: ${d.donorName}</p>
                <p class="status-text">📅 Expiry: ${d.expiryDate} at ${d.expiryTime}</p>
                <p class="status-text">Status: <strong style="color:#4ade80">${d.status}</strong></p>
            </div>
            <button class="dashboard-btn" onclick="claimFood(${d.id})">🤝 Claim</button>
        </div>
    `).join('');
}

function claimFood(id) {
    const user = JSON.parse(localStorage.getItem('cb_currentUser'));
    if (!user || user.role !== 'receiver') {
        alert('Please login as a receiver!');
        return;
    }

    let donations = JSON.parse(localStorage.getItem('cb_donations') || '[]');
    donations = donations.map(d => {
        if (d.id === id) {
            d.status = 'Claimed';
            d.claimedBy = user.name;
        }
        return d;
    });

    localStorage.setItem('cb_donations', JSON.stringify(donations));
    alert('✅ Food claimed successfully!');
    loadReceiverList();
}


// ===========================
// AUTO LOAD ON PAGE OPEN
// ===========================
window.onload = function () {

    // Protect donor page
    if (document.getElementById('donorList')) {
        const user = JSON.parse(localStorage.getItem('cb_currentUser'));
        if (!user || user.role !== 'donor') {
            window.location.href = 'login.html';
            return;
        }
        loadDonorList();
    }

    // Protect receiver page
    if (document.getElementById('receiverList')) {
        const user = JSON.parse(localStorage.getItem('cb_currentUser'));
        if (!user || user.role !== 'receiver') {
            window.location.href = 'login.html';
            return;
        }
        loadReceiverList();
    }
};