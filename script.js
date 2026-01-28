const seesaw = document.getElementById("seesaw");
const leftWeightEl = document.getElementById("leftWeight");
const rightWeightEl = document.getElementById("rightWeight");
const angleValueEl = document.getElementById("angleValue");
const dropList = document.getElementById("dropList");
const resetBtn = document.getElementById("resetBtn");
const nextWeightEl = document.getElementById("nextWeight");

const PLANK_WIDTH = 400;
const MAX_ANGLE = 30;

let items = JSON.parse(localStorage.getItem("seesawItems")) || [];
let nextWeight = generateRandomWeight();

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function generateRandomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}

function renderItems() {
  seesaw.querySelectorAll(".weight").forEach(w => w.remove());
  dropList.innerHTML = "";

  items.forEach(item => {
    const el = document.createElement("div");
    el.className = "weight";
    el.textContent = item.weight;
    el.style.left = `${item.x}px`;
    el.style.width = `${(item.weight + 12) * 2}px`;
    el.style.height = `${(item.weight + 12) * 2}px`;
    el.style.top = `${ (-1 * ((item.weight + 12) * 2))}px`;
    seesaw.appendChild(el);

    const li = document.createElement("li");
    li.textContent = `Merkezden ${Math.round(item.distance)}px uzaklığa  ${item.side} tarafa  ${item.weight} kg ağırlık bırakıldı.`;
    dropList.appendChild(li);
  });
}

function updateSeesaw() {
  let leftTorque = 0;
  let rightTorque = 0;
  let leftWeight = 0;
  let rightWeight = 0;

  items.forEach(item => {
    if (item.side === "sol") {
      leftTorque += item.weight * item.distance;
      leftWeight += item.weight;
    } else {
      rightTorque += item.weight * item.distance;
      rightWeight += item.weight;
    }
  });

  const angle = clamp((rightTorque - leftTorque) / 10, -MAX_ANGLE, MAX_ANGLE);

  seesaw.style.transform = `rotate(${angle}deg)`;
  leftWeightEl.textContent = `${leftWeight} kg`;
  rightWeightEl.textContent = `${rightWeight} kg`;
  angleValueEl.textContent = `${angle.toFixed(1)}°`;

  localStorage.setItem("seesawItems", JSON.stringify(items));
}

seesaw.addEventListener("click", e => {
  const rect = seesaw.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  const center = PLANK_WIDTH / 2;
  const distance = Math.abs(clickX - center);
  const side = clickX < center ? "sol" : "sağ";

  const weight = nextWeight;
  
  let size = (weight + 12) * 2;

  items.push({
    x: clickX - (size / 2),
    weight,
    side,
    distance
  });

  nextWeight = generateRandomWeight();
  nextWeightEl.textContent = `${nextWeight} kg`;

  renderItems();
  updateSeesaw();
});


resetBtn.addEventListener("click", () => {
  items = [];
  localStorage.removeItem("seesawItems");

  nextWeight = generateRandomWeight();
  nextWeightEl.textContent = `${nextWeight} kg`;

  renderItems();
  updateSeesaw();
});


nextWeightEl.textContent = `${nextWeight} kg`;
renderItems();
updateSeesaw();