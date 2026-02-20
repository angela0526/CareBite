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
function getLocationAndRegister(userData) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userData.lat = position.coords.latitude;
                userData.lng = position.coords.longitude;
                completeRegistration(userData);
            },
            function(error) {
                // If user denies location, register without it
                completeRegistration(userData);
            }
        );
    } else {
        completeRegistration(userData);
    }
}

function completeRegistration(newUser) {
    const users = JSON.parse(localStorage.getItem('cb_users') || '[]');
    users.push(newUser);
    localStorage.setItem('cb_users', JSON.stringify(users));
    localStorage.setItem('cb_currentUser', JSON.stringify(newUser));

    if (newUser.role === 'donor') window.location.href = 'donor.html';
    else if (newUser.role === 'receiver') window.location.href = 'receiver.html';
    else if (newUser.role === 'volunteer') window.location.href = 'volunteer.html';
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
    getLocationAndRegister(newUser);
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
        donorLat: user.lat || null,    
        donorLng: user.lng || null,   
        foodName,
        foodType,
        quantity,
        expiryDate,
        expiryTime,
        image: imgData,
        status: 'Available',
        claimedBy: null,
        claimedByEmail: null
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
// Calculate distance between two coordinates in km
function calculateDistance(lat1, lng1, lat2, lng2) {
    if (!lat1 || !lng1 || !lat2 || !lng2) return 9999;
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) *
              Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1); // Returns distance in km
}

// ===========================
// RECEIVER FUNCTIONS
// ===========================
function loadReceiverList() {
    const user = JSON.parse(localStorage.getItem('cb_currentUser'));
    if (!user) return;

    const donations = JSON.parse(localStorage.getItem('cb_donations') || '[]');
    let available = donations.filter(d => d.status === 'Available');

    // Get receiver location and sort by distance
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const recLat = position.coords.latitude;
                const recLng = position.coords.longitude;

                // Add distance to each donation
                available = available.map(d => ({
                    ...d,
                    distance: calculateDistance(recLat, recLng, d.donorLat, d.donorLng)
                }));

                // Sort by closest first
                available.sort((a, b) => a.distance - b.distance);

                renderReceiverList(available, user);
            },
            function() {
                // No location, show without distance
                renderReceiverList(available, user);
            }
        );
    } else {
        renderReceiverList(available, user);
    }

    // Load my claims (doesn't need location)
    const myClaims = donations.filter(d => d.claimedByEmail === user.email);
    renderMyClaims(myClaims);

    const welcome = document.getElementById('welcomeMsg');
    if (welcome) welcome.innerText = `Welcome, ${user.name}! 👋`;
}
function renderReceiverList(available, user) {
    const list = document.getElementById('receiverList');
    if (!list) return;

    if (available.length === 0) {
        list.innerHTML = '<p style="color:#7dd3fc; text-align:center;">No food available right now!</p>';
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
                <p class="status-text">🥗 Type: ${d.foodType || 'N/A'}</p>
                <p class="status-text">📦 Quantity: ${d.quantity || 'N/A'}</p>
                <p class="status-text">👤 Donor: ${d.donorName}</p>
                <p class="status-text">📅 Expiry: ${d.expiryDate} at ${d.expiryTime}</p>
                ${d.distance && d.distance !== 9999 
                    ? `<p class="status-text">📍 Distance: <strong style="color:#4ade80">${d.distance} km away</strong></p>` 
                    : ''
                }
                ${isExpiringSoon(d.expiryDate, d.expiryTime)
                    ? `<p style="color:#f87171; font-weight:bold;">⚠️ Expiring Soon!</p>`
                    : ''
                }
            </div>
            <button class="dashboard-btn" onclick="claimFood(${d.id})">🤝 Claim</button>
        </div>
    `).join('');
}

function renderMyClaims(myClaims) {
    const claimsList = document.getElementById('myClaimsList');
    if (!claimsList) return;

    if (myClaims.length === 0) {
        claimsList.innerHTML = '<p style="color:#7dd3fc; text-align:center;">No claims yet!</p>';
        return;
    }

    claimsList.innerHTML = myClaims.map(d => `
        <div class="food-card">
            ${d.image
                ? `<img src="${d.image}" alt="food">`
                : `<div style="width:90px;height:90px;background:#0f172a;border-radius:10px;border:2px dashed #00c6ff;display:flex;align-items:center;justify-content:center;font-size:30px;">🍱</div>`
            }
            <div style="flex:1;">
                <h3 style="color:white; margin-bottom:6px;">${d.foodName}</h3>
                <p class="status-text">👤 Donor: ${d.donorName}</p>
                <p class="status-text">📅 Expiry: ${d.expiryDate} at ${d.expiryTime}</p>
                <p class="status-text">Status: <strong style="color:#facc15">${d.status}</strong></p>
            </div>
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