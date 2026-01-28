const seesaw = document.getElementById("seesaw");


const objects = [];

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

  console.log("New object added:", newObject);
  console.log("Current state:", objects);
});
