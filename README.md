# 🌍 DISASTER X – Strategic Response & AI Sentinel

![Made with React](https://img.shields.io/badge/Made_with-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![AI Powered Gemini](https://img.shields.io/badge/AI_Powered-Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)
![Backend Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Built for Web](https://img.shields.io/badge/Built_for-Web-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GSC 2026](https://img.shields.io/badge/Solution-GSC_2026-F4B400?style=for-the-badge&logo=google&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-32CD32?style=for-the-badge)

---

## 📝 Abstract
**Disaster X** (developed by Persistence-Pixels) is a high-fidelity disaster management and situational awareness platform designed to optimize emergency response during high-stakes crises. The system transitions beyond traditional reporting tools by providing a **Tactical HUD (Heads-Up Display)** environment that integrates real-time geospatial intelligence, AI-driven survival protocols, and a resilient SOS communication chain.

The platform leverages **React 18** for a high-performance frontend, **Firebase Firestore** for sub-second data synchronization, and the **Google Gemini AI** engine for generating localized, bulleted rescue intelligence. By centralizing fragmented data into a unified "Strategic Mission Control," Disaster X addresses the critical latency between disaster onset and life-saving intervention, aiming for a zero-casualty response model.

---

## 📋 Table of Contents
- [Introduction](#-introduction)
- [System Architecture](#-system-architecture)
- [Module I — Tactical Command HUD](#module-i--tactical-command-hud)
- [Module II — KAVACH AI Sentinel](#module-ii--kavach-ai-sentinel)
- [Module III — Secure SOS & Beacon System](#module-iii--secure-sos--beacon-system)
- [Module IV — Survival Academy](#module-iv--survival-academy)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [Operational Ethos](#-operational-ethos)
- [Authors & Team](#-authors--team)

---

## 📖 Introduction
Natural disasters displaced over 30 million people globally in 2023. The primary bottleneck in response is not a lack of resources, but **information fragmentation**. Responders often work with stale data, while survivors struggle to find actionable advice amidst the chaos.

**Disaster X** was engineered to eliminate this fog of war through three core pillars:
1.  **Visual Intelligence:** Converting raw coordinates into tactical heatmaps.
2.  **Instant AI Guidance:** Providing immediate, non-paragraphic rescue steps via KAVACH AI.
3.  **Resilient Coordination:** A centralized dashboard that synchronizes victims, responders, and relief assets in real-time.

---

## 🏗️ System Architecture
Disaster X follows a **Serverless Real-time Architecture**, ensuring maximum uptime and horizontal scalability during peak disaster events.

- **Frontend:** Single Page Application (SPA) built with React/Vite, optimized for low-latency rendering.
- **Data Bus:** Firebase Firestore acts as the central reactive hub, pushing updates to all connected clients in <200ms.
- **AI Layer:** Edge-integrated Gemini API for localized crisis reasoning.
- **Geospatial Layer:** Mapbox/Google Maps API for tactical risk matrix visualization.

---

## 📱 Module I — Tactical Command HUD
The HUD is the operational nerve center of Disaster X. It provides a high-contrast, "Dark Mode" interface designed for high-stress environments, reducing eye strain and highlighting critical data.

### 🗺️ Real-Time Risk Matrix
- **Tactical Overlays:** Visualizes active threats (Wildfires, Floods, Seismic activity) using dynamic SVG layers.
- **Mission Dashboard:** Displays live victim statistics, responder locations, and extraction point availability.
- **Live Sync:** Every marker on the map is a reactive component that updates instantly as field data arrives in Firebase.

---

## 🤖 Module II — KAVACH AI Sentinel
KAVACH (meaning "Armor") is an integrated AI assistant powered by **Google Gemini**. Unlike generic chatbots, KAVACH is fine-tuned for "Tactical Brevity."

- **Rescue Assistant:** Processes natural language queries to provide immediate first-aid and evacuation steps.
- **Bulleted Intel:** Automatically formats complex disaster manuals into 3-5 high-priority action items.
- **Multilingual Crisis Support:** Communicates in regional dialects to ensure accessibility in diverse disaster zones.

---

## 🛰️ Module III — Secure SOS & Beacon System
The SOS module provides a one-click distress mechanism that bypasses complex navigation during emergencies.

- **Emergency Beacon:** Captures live GPS, device health, and timestamp data.
- **Triage Priority:** Algorithms rank incoming SOS signals based on proximity to high-risk zones and reported severity.
- **Interactive Check-Ins:** Sends automated "Safety Pings" to users in affected areas to track population health status.

---

## 📚 Module IV — Survival Academy
Knowledge is the first line of defense. The Survival Academy gamifies disaster preparedness to ensure users are "Mission Ready" before a crisis hits.

- **Strategic Manuals:** High-fidelity, illustrated guides for various disaster scenarios.
- **Interactive Drills:** Scenario-based decision testing that rewards correct survival choices.
- **Offline Cache:** Essential survival documents are cached locally using Service Workers for zero-connectivity access.

---

## 🧰 Technology Stack

### 🖥️ Frontend & UI
| Technology | Purpose |
| :--- | :--- |
| **React 18** | Core Application Framework |
| **Vite** | Next-gen Build Tooling |
| **Tailwind CSS** | Tactical Utility-First Styling |
| **Framer Motion** | Immersive Animations & Transitions |

### ⚙️ Backend & AI
| Technology | Purpose |
| :--- | :--- |
| **Firebase Auth** | Secure Identity Management |
| **Firestore** | Real-time NoSQL Data Bus |
| **Gemini AI** | Strategic Crisis Reasoning |

### 🗺️ Geospatial
| Technology | Purpose |
| :--- | :--- |
| **Mapbox/Google Maps** | Tactical Mapping & Geo-visualization |
| **OpenStreetMap** | Reverse Geocoding Services |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- Firebase Project
- Google AI (Gemini) API Key

### Deployment Steps
1. **Clone the Command**
   ```bash
   git clone https://github.com/ppranaypatil14-ops/Persistence-Pixels
   cd Persistence-Pixels
   ```

2. **Equip Dependencies**
   ```bash
   npm install
   ```

3. **Configure Tactical Link (.env)**
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_id
   VITE_GEMINI_API_KEY=your_gemini_key
   ```

4. **Initialize Uplink**
   ```bash
   npm run dev
   ```

---

## 📜 Operational Ethos
*Disaster X is built on the foundation of resilience, transparency, and the pursuit of zero-casualty disaster response.*

---

🤝 Contributing
We welcome contributions from the open-source community. To contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/your-feature-name`)
3. **Commit your changes** with descriptive messages (`git commit -m 'Add feature: description'`)
4. **Push to your branch** (`git push origin feature/your-feature-name`)
5. **Open a Pull Request** with a detailed description of your changes

Please ensure your code follows the existing project conventions and includes relevant documentation.

⚠️ Disclaimer
**Disaster X** is a research prototype developed for academic demonstration, hackathon presentation, and proof-of-concept validation. For real-world deployment in active disaster scenarios, the following are prerequisite:

*   Official partnerships with government disaster management agencies (NDMA, NDRF, State SDMAs).
*   Legal compliance with data protection regulations (IT Act 2000, DPDP Act 2023).
*   Verified integration with official emergency communication infrastructure.
*   Security audits and penetration testing for all public-facing modules.

## 👨‍💻 Authors & Contributors

**Anuja Pawar**  
GitHub: [Anuja-3248](https://github.com/Anuja-3248)

**Pranay Patil**  
GitHub: [ppranaypatil14-ops](https://github.com/ppranaypatil14-ops)

**Bhavika Patil**  
GitHub: [Bhavika-0308](https://github.com/Bhavika-0308)

**Harshita Jadhav**  
GitHub: [harshita10](https://github.com/harshita10)

---

## 📬 Contact
**Email:** anujap2222@gmail.com  
**Project Repository:** [https://github.com/ppranaypatil14-ops/Persistence-Pixels](https://github.com/ppranaypatil14-ops/Persistence-Pixels)

❤️🔥 Made with dedication and Collaboration for Google Solution Challenge 2026 :)
