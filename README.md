# 🚀 Rocket Evader 🚀

A retro-style arcade shooter/evader game built for the FCC "Legacy Code" Game Jam.

---

## Concept

- Control a spaceship at the bottom of the screen.
- Evade falling obstacles that spawn continuously from the top.
- Survive as long as possible to increase your score.
- Shoot the obstacles to destroy them for extra points, game speeds up over time!

---

## Tech Stack 🛠️

-   **HTML Canvas:** Renders all game elements.
-   **CSS:** Provides the retro styling for the canvas and page.
-   **Vanilla JavaScript:** Powers all core game logic, adhering to the jam's constraints.

---

## Progress Tracker 📈

-   ✅ **Initial Setup:** Project structure, `index.html`, `style.css`, `script.js`, and `.gitignore` created.
-   ✅ **Player Implementation:** A controllable player character is on screen.
-   ✅ **Core Movement and Boundary Detection:** The player can move left and right using arrow keys, movement confined within play area limits.
-   ✅ **Obstacle System:** Obstacles spawn at random, fall down the screen, and are removed when they exit the play area.
-   ✅ **Collision & Scoring:** The game detects collisions with obstacles, triggers a 'game over' state, and keeps score.
-   ✅ **Game Over & Restart:** 'Game Over' message when detected collision, full restart mechanic.
-   ⏳ **Next:** Change player and obstacle squares to images, add sfx, add increasing difficulty (faster obstacles).