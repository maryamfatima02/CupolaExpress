Cupola Express: Your Window to Earth

Interactive, portable web app showcasing an interactive Earth (Three.js), NASA Cupola imagery, and a disaster overview carousel.
Our mission is to educate the public about Earth observation, inspire interest in science, and empower a new generation of problem solvers—supporting both global sustainability efforts and the UAE’s innovative vision for the future.

Features:

Rotating, interactive 3D Earth model on the home page
Educational content about space-based environmental monitoring
Disaster prediction tab: learn to identify disasters from space imagery
Embedded mini-game: Test your skills and predict real-world disasters
Friendly mascot to guide users and share facts

Run locally
VS Code: Install “Live Server”, then right‑click `index.html` → Open with Live Server
- Option B (any static server): serve the folder and open `/index.html`

Project structure
- `index.html`, `styles.css`, `main.js`
- `assets/` — local textures and images used for offline/CORS‑safe loads

Data and media sources (NASA)
All photographs are official NASA images provided via the NASA Image and Video Library. Filenames map to their original NASA items:

Notes:
 Items are used for educational/non‑commercial demonstration. Review NASA Media Usage Guidelines: https://www.nasa.gov/nasa-brand-center/

These textures originate from the Three.js examples repository and are used for demonstration purposes.

Accessibility and controls
- Drag to rotate the globe; mouse wheel/pinch to zoom
- Tabs in the top navigation switch sections (Education, Disaster Prediction, Gallery)

Attribution summary
- Imagery: NASA Image and Video Library (items linked above)
- Earth textures: Three.js examples textures

Game:
The 2D game, developed in Unity, lets users interact with Earth as seen from the ISS Cupola. Players receive warnings when satellite imagery indicates changes, and have a few seconds to identify the type of disaster based on what they’ve learned from the educational website. This gameplay reinforces disaster prediction skills using authentic space data, making learning immersive and engaging.
