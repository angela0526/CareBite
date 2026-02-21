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

"images/Homepage.jpg"
*Landing Page — CareBite's home page with hero section, about section and contact form*

"images/login.jpg"
*Login Page — Role-based login for Donors, Receivers and Volunteers*

"images/register.jpg"
*Register Page — Role-based registration for Donors, Receivers and Volunteers*

"images/donor.jpg"
*Donor Dashboard — Donors can post food donations with name, type, quantity, expiry and image*

"images/receiver.jpg"
*Receiver Dashboard — Receivers can browse available donations sorted by distance and claim them*

"images/volunteer.jpg"
*Volunteer Dashboard — Volunteers can accept pickup tasks and mark deliveries as complete*


#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
*Explain your system architecture - components, data flow, tech stack interaction*

**Application Workflow:**

![Workflow](docs/workflow.png)
*Add caption explaining your workflow*

---

### For Hardware:

#### Schematic & Circuit

![Circuit](Add your circuit diagram here)
*Add caption explaining connections*

![Schematic](Add your schematic diagram here)
*Add caption explaining the schematic*

#### Build Photos

![Team](Add photo of your team here)

![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

---

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://api.yourproject.com`

##### Endpoints

**GET /api/endpoint**
- **Description:** [What it does]
- **Parameters:**
  - `param1` (string): [Description]
  - `param2` (integer): [Description]
- **Response:**
```json
{
  "status": "success",
  "data": {}
}
```

**POST /api/endpoint**
- **Description:** [What it does]
- **Request Body:**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Operation completed"
}
```

[Add more endpoints as needed...]

---

### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---

### For Hardware Projects:

#### Bill of Materials (BOM)

| Component | Quantity | Specifications | Price | Link/Source |
|-----------|----------|----------------|-------|-------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | ₹450 | [Link] |
| LED | 5 | Red, 5mm, 20mA | ₹5 each | [Link] |
| Resistor | 5 | 220Ω, 1/4W | ₹1 each | [Link] |
| Breadboard | 1 | 830 points | ₹100 | [Link] |
| Jumper Wires | 20 | Male-to-Male | ₹50 | [Link] |
| [Add more...] | | | | |

**Total Estimated Cost:** ₹[Amount]

#### Assembly Instructions

**Step 1: Prepare Components**
1. Gather all components listed in the BOM
2. Check component specifications
3. Prepare your workspace
![Step 1](images/assembly-step1.jpg)
*Caption: All components laid out*

**Step 2: Build the Power Supply**
1. Connect the power rails on the breadboard
2. Connect Arduino 5V to breadboard positive rail
3. Connect Arduino GND to breadboard negative rail
![Step 2](images/assembly-step2.jpg)
*Caption: Power connections completed*

**Step 3: Add Components**
1. Place LEDs on breadboard
2. Connect resistors in series with LEDs
3. Connect LED cathodes to GND
4. Connect LED anodes to Arduino digital pins (2-6)
![Step 3](images/assembly-step3.jpg)
*Caption: LED circuit assembled*

**Step 4: [Continue for all steps...]**

**Final Assembly:**
![Final Build](images/final-build.jpg)
*Caption: Completed project ready for testing*

---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

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
