const seesaw = document.getElementById("seesaw");

seesaw.addEventListener("click", (event) => {
  const plankRect = seesaw.getBoundingClientRect();

  
  const clickX = event.clientX - plankRect.left;

  
  const pivotX = plankRect.width / 2;

  const side = clickX < pivotX ? "left" : "right";

 
  const distance = Math.abs(clickX - pivotX);

  console.log("Side:", side);
  console.log("Distance from pivot:", distance.toFixed(2), "px");
});
