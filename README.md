<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# CareBite 🍱

## Basic Details

### Team Name: CodeSprout

### Team Members
- Member 1: Angela Elsa John - MITS,Kochi
- Member 2: Anjana R - MITS,Kochi

### Hosted Project Link
https://angela0526.github.io/CareBite/Frontend/index.html

### Project Description
CareBite is a web-based food donation platform that connects food donors (restaurants, households, and events) with NGOs and receivers who need food, and volunteers who pick up and deliver it. It helps reduce food waste and fight hunger by coordinating real-time food donations across communities.

### The Problem statement
Tonnes of good food gets thrown away every day while people nearby go hungry. 
The problem isn't shortage — it's connection. Donating food is slow, 
unorganized, and by the time it's arranged, the food has already gone bad. 
There had to be a better way.

### The Solution
CareBite is the bridge that should have always existed.

The moment a donor posts surplus food, it goes live on our platform 
instantly. Nearby NGOs and receivers can see it, claim it, and a volunteer 
is already on their way to pick it up — all within minutes, not hours.

No phone calls. No emails. No food wasted waiting.

We built three powerful dashboards — one for donors to post food in seconds, 
one for receivers to find and claim donations nearby, and one for volunteers 
to accept pickups and track deliveries in real time. Every donation has a 
live status — from the moment it's posted to the moment it reaches someone 
who needs it.

CareBite doesn't just move food. It moves people to act faster, give more, 
and waste less. Because when technology meets compassion, nobody has to go 
hungry tonight.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: HTML5, CSS3, JavaScript (ES6+)
- APIs used: Browser Geolocation API, FileReader API
- Storage: localStorage (Browser-based)
- Fonts: Google Fonts (Poppins)
- Tools used: VS Code, Git, GitHub, Live Server


---

## Features

List the key features of your project:

- Feature 1: Three-Role System — CareBite supports three distinct user roles 
  (Donor, Receiver/NGO and Volunteer) each with their own personalized 
  dashboard and access controls.

- Feature 2: Real-Time Food Donation Tracking — Every donation has a live 
  status that updates in real time from Available → Claimed → Pickup Assigned 
  → Delivered, so everyone knows exactly where the food is.

- Feature 3: Location-Based Matching — Using the Browser Geolocation API, 
  CareBite automatically detects the receiver's location and sorts available 
  donations by distance, showing the closest food first.

- Feature 4: Volunteer Delivery System — Volunteers can browse claimed 
  donations, accept pickup tasks, and mark deliveries as complete — creating 
  a full end-to-end food delivery chain.

- Feature 5: Expiry Alert System — Donations expiring within 2 hours are 
  automatically flagged with a warning so receivers and volunteers can 
  prioritize urgent pickups.

- Feature 6: Food Image Upload — Donors can upload photos of their food so 
  receivers know exactly what they're claiming before they commit.
## Implementation

### For Software:

#### Installation
```bash
No installation needed!
Just clone the repository and open with Live Server
git clone https://github.com/angela0526/CareBite.git
cd CareBite
```

#### Run
```bash
Open frontend/index.html using Live Server in VS Code
Right click index.html → Open with Live Server
App will open at http://127.0.0.1:5500
```
## Project Documentation

### For Software:

#### Screenshots (Add at least 3)
![Screenshot1](Frontend/images/Homepage.jpg)
*Landing Page — CareBite's home page with hero section, about section and contact form*

![Screenshot1](Frontend/images/login.jpg)
*Login Page — Role-based login for Donors, Receivers and Volunteers*

![Screenshot1](Frontend/images/register.jpg)
*Register Page — Role-based registration for Donors, Receivers and Volunteers*

![Screenshot1](Frontend/images/donor.jpg)
*Donor Dashboard — Donors can post food donations with name, type, quantity, expiry and image*

![Screenshot1](Frontend/images/receiver.jpg)
*Receiver Dashboard — Receivers can browse available donations sorted by distance and claim them*

![Screenshot1](Frontend/images/volunteer.jpg)
*Volunteer Dashboard — Volunteers can accept pickup tasks and mark deliveries as complete*


#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
*Explain your system architecture - components, data flow, tech stack interaction*

**Application Workflow:**

![Workflow](docs/workflow.png)
*Add caption explaining your workflow*

---

## Additional Documentation

### For Web Projects:

#### API Documentation

Since CareBite is a frontend-only application, all data is handled through 
the Browser's localStorage API. No external API calls are made.

**Data Storage Keys:**

**cb_users**
- **Description:** Stores all registered users
- **Type:** Array of user objects
- **Example:**
```json
{
  "name": "Angela John",
  "email": "angela@gmail.com",
  "phone": "9876543210",
  "role": "donor",
  "lat": 10.123,
  "lng": 76.456
}
```

**cb_donations**
- **Description:** Stores all food donations and their status
- **Type:** Array of donation objects
- **Example:**
```json
{
  "id": 1234567890,
  "donorName": "Angela John",
  "foodName": "Biryani",
  "foodType": "Non-Veg",
  "quantity": "20 plates",
  "expiryDate": "2025-02-21",
  "expiryTime": "20:00",
  "status": "Available",
  "claimedBy": null,
  "volunteerName": null
}
```

**cb_currentUser**
- **Description:** Stores the currently logged in user
- **Type:** Single user object



#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```

**Example 2: Advanced Usage**

**Input:**
```json
{
  "name": "test",
  "value": 123
}
```

**Command:**
```bash
python script.py -v --format json data.json
```

**Output:**
```
[VERBOSE] Loading configuration...
[VERBOSE] Parsing JSON input...
[VERBOSE] Processing data...
{
  "status": "success",
  "processed": true,
  "result": {
    "name": "test",
    "value": 123,
    "timestamp": "2024-02-07T10:30:00"
  }
}
[VERBOSE] Operation completed in 0.23s
```

---

## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** [e.g., GitHub Copilot, v0.dev, Cursor, ChatGPT, Claude]

**Purpose:** [What you used it for]
- Example: "Generated boilerplate React components"
- Example: "Debugging assistance for async functions"
- Example: "Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Percentage of AI-generated code:** [Approximately X%]

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- [Name 1]: [Specific contributions - e.g., Frontend development, API integration, etc.]
- [Name 2]: [Specific contributions - e.g., Backend development, Database design, etc.]
- [Name 3]: [Specific contributions - e.g., UI/UX design, Testing, Documentation, etc.]

---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
