const seesaw = document.getElementById("seesaw");


const objects = [];

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

  console.log("Current objects:", objects);
});
