# Seesaw Simulation

A physics-based seesaw simulation built with **pure HTML, CSS, and JavaScript**.

🔗 **Live Demo:**  
https://dilanbtk.github.io/seesaw-simulation

---

## Design & Implementation

- The seesaw is modeled as a fixed-length plank with a central pivot.
- Each dropped object has a random weight (1–10 kg) and a distance from the pivot.
- Torque is calculated using:
torque = weight × distance

- The final rotation angle is derived from the total torque difference and clamped to **±30°**.
- All objects are stored in a single state array and rendered from that state.
- Seesaw rotation is animated using CSS `transform` with smooth transitions.
- The simulation state is persisted using `localStorage`.

---

## Trade-offs & Limitations

- DOM-based rendering was chosen over canvas for simplicity and readability.
- Physics is intentionally simplified for clarity.

---

## AI Usage

AI tools were used only for minor syntax checks and debugging assistance.  



