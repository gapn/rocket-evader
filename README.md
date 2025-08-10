# 🚀 Rocket Evader 🚀

A retro-style arcade shooter/evader game built for the FCC "Legacy Code" Game Jam.

---

## Concept

- Control a spaceship at the bottom of the screen.
- Evade falling obstacles that spawn continuously from the top.
- Survive as long as possible to increase your score.
- Shoot the obstacles to destroy them for extra points, game speeds up over time!

---

## How to Play

Your mission is to pilot the rocket and survive for as long as possible! Obstacles will continuously spawn from the top of the screen and fall downwards. Use your reflexes to dodge them. The longer you survive, the higher your score, and the faster the game gets! The game is over when you collide with an obstacle, but you can always restart to beat your score.

---

## Controls

-   **Left Arrow Key** → Move the rocket left
-   **Right Arrow Key** → Move the rocket right
-   **Enter Key** → Restart the game after a "Game Over"

---

## Key Features

-   **Sprite-Based Graphics:** Player and obstacle graphics replace basic shapes for a retro feel.
-   **Randomized Obstacles:** A different obstacle sprite is chosen for each playthrough, adding variety.
-   **Progressive Difficulty:** Both the obstacle's falling speed and spawn rate increase as your score goes up.
-   **Collision Detection:** Rectangle AABB collision detection determines when the player hits an obstacle.
-   **Scoring System:** Get points for every obstacle you successfully dodge.
-   **Complete Game Loop:** Full state management for playing, game over, and restarting.
-   **Sound Effects:** SFX for dodging, speeding up, and collisions enhance the player experience.
-   **Custom Fonts:** Retro-style fonts give the UI a thematic look.

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
-   ✅ **Sprites, SFX & difficulty:** Player and obstacles show sprites instead of rectangles, sound effects for different events, increasing difficulty (faster & more frequent obstacles).
-   ⏳ **Next:** Polish UI.

## Future Ideas ⏳

-   Implement a multi-obstacle system where different sprites with unique sizes and point values appear in the same game.
-   Add a session-based high score tracker.
-   Include background music and more sound effects.
-   Add on-screen controls for mobile device compatibility.