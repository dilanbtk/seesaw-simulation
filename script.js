
const seesaw = document.getElementById("seesaw");


const objects = [];
let currentAngle = 0;
const MAX_ANGLE = 30;


function calculateTorque(items) {
  let leftTorque = 0;
  let rightTorque = 0;

  items.forEach((obj) => {
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
  const diff = rightTorque - leftTorque;

  let angle = diff / 500; 


  if (angle > MAX_ANGLE) angle = MAX_ANGLE;
  if (angle < -MAX_ANGLE) angle = -MAX_ANGLE;

  return angle;
}


function renderWeights() {

  seesaw.querySelectorAll(".weight").forEach((el) => el.remove());

  objects.forEach((obj) => {
    const div = document.createElement("div");
    div.className = "weight";
    div.textContent = obj.weight + "kg";

    div.style.position = "absolute";
    div.style.left = `${obj.x - 12}px`;
    div.style.top = `-28px`;

    seesaw.appendChild(div);
  });
}

seesaw.addEventListener("click", (event) => {
  const rect = seesaw.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const pivotX = rect.width / 2;

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


  const { leftTorque, rightTorque } = calculateTorque(objects);


  currentAngle = calculateAngle(leftTorque, rightTorque);

  
  seesaw.style.transform = `rotate(${currentAngle}deg)`;

  renderWeights();

 
  console.log("STATE:", objects);
  console.log("ANGLE:", currentAngle);
});
