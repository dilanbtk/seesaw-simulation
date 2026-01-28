const seesaw = document.getElementById("seesaw");

seesaw.addEventListener("click", (event) => {
  console.log("Clicked on seesaw");
  console.log("Client X:", event.clientX);
  console.log("Client Y:", event.clientY);
});