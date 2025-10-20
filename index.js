const submit = document.getElementById("submit");
const input = document.getElementById("input");
const Hscode = document.getElementById("Hscode");
const copyBtn = document.getElementById("copyBtn");
const counterDisplay = document.getElementById("counter");
const resetBtn = document.getElementById("reset");
const decrementBtn = document.getElementById("decrement");
const comment = document.getElementById("comment");
const procComment = document.getElementById("proc-comment");
const entryInput = document.getElementById("entry-input");
const editBtn = document.getElementById("edit");
const editInput = document.getElementById("editInput");

//////////////////////////
// Counter with localStorage
//////////////////////////
function counter() {
  // ✅ Initialize from localStorage if exists
  let num = parseInt(localStorage.getItem("copyCount")) || 0;

  // ✅ Helper to sync to localStorage
  const saveToStorage = () => {
    localStorage.setItem("copyCount", num);
  };

  return {
    increment() {
      num++;
      saveToStorage();
      return num;
    },
    decrement() {
      num = Math.max(0, num - 1);
      saveToStorage();
      return num;
    },
    reset() {
      num = 0;
      saveToStorage();
      return num;
    },
    value() {
      return num;
    },
    edit(newNum) {
      if (typeof newNum === "number" && newNum >= 0) {
        num = newNum;
        saveToStorage();
        return num;
      } else {
        console.warn("Invalid value — must be a positive number");
        return num;
      }
    },
  };
}

const counts = counter();

// ✅ Set initial display from stored value
counterDisplay.textContent = `Copied: ${counts.value()} times`;

//////////////////////////
// Event Listeners
//////////////////////////

submit.addEventListener("click", function () {
  const result = input.value.trim().replace(/\./g, "");
  Hscode.textContent = result || "No code entered";
  input.value = "";
  Hscode.style.color = "#007bff";
  Hscode.style.transform = "scale(1.1)";
  setTimeout(() => (Hscode.style.transform = "scale(1)"), 400);
});

copyBtn.addEventListener("click", function () {
  navigator.clipboard
    .writeText(Hscode.textContent)
    .then(() => {
      const val = counts.increment();
      counterDisplay.textContent = `Copied: ${val} times`;
      counterDisplay.style.color = "#28a745";
      setTimeout(() => (counterDisplay.style.color = "#007bff"), 800);
    })
    .catch((err) => console.error("Failed to copy:", err));

  // Change background color randomly
  document.body.style.backgroundColor =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
});

resetBtn.addEventListener("click", () => {
  counts.reset();
  counterDisplay.textContent = "Copied: 0 times";
});

decrementBtn.addEventListener("click", () => {
  const val = counts.decrement();
  counterDisplay.textContent = `Copied: ${val} times`;
});

comment.addEventListener("click", function () {
  const comments = "SI AUTO - Index";
  navigator.clipboard.writeText(comments).catch((err) => console.log(err));
});

procComment.addEventListener("click", function () {
  const entry = entryInput.value.trim();
  navigator.clipboard.writeText(`${entry} - Keyed 87/01 - 7501PROC`);
});

editBtn.addEventListener("click", () => {
  const newVal = Number(editInput.value);
  const updated = counts.edit(newVal);
  counterDisplay.textContent = `Copied: ${updated} times`;
  editInput.value = "";
});
