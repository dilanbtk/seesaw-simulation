const seesaw = document.getElementById("seesaw");


const objects = [];
let currentAngle = 0;

function calculateTorque(objects) {
  let leftTorque = 0;
  let rightTorque = 0;

  objects.forEach((obj) => {
    const torque = obj.weight * obj.distance;

    if (obj.side === "left") {
      leftTorque += torque;
    } else {
      rightTorque += torque;
    }
  });

  return { leftTorque, rightTorque };
}

function calculateAngle(leftTorque, rightTorque) {
  const scaleFactor = 10;
  const rawAngle = (rightTorque - leftTorque) / scaleFactor;

  const clampedAngle = Math.max(-30, Math.min(30, rawAngle));
  return clampedAngle;
}

function renderObject(obj) {
  const el = document.createElement("div");
  el.className = "weight";
  el.textContent = obj.weight;
  el.style.left = `${obj.x - 8}px`;
  seesaw.appendChild(el);
}

seesaw.addEventListener("click", (event) => {
  const plankRect = seesaw.getBoundingClientRect();
  const clickX = event.clientX - plankRect.left;
  const pivotX = plankRect.width / 2;

  const side = clickX < pivotX ? "left" : "right";
  const distance = Math.abs(clickX - pivotX);
  const weight = Math.floor(Math.random() * 10) + 1;

  const newObject = {
    id: Date.now(),
    weight,
    side,
    distance,
    x: clickX
  };

  objects.push(newObject);
  renderObject(newObject);

  const { leftTorque, rightTorque } = calculateTorque(objects);
  currentAngle = calculateAngle(leftTorque, rightTorque);

  console.log("Angle:", currentAngle.toFixed(2));
});
