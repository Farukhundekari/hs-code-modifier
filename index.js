const submit = document.getElementById("submit");
const input = document.getElementById("input");
const Hscode = document.getElementById("Hscode");
const copyBtn = document.getElementById("copyBtn");
const counterDisplay = document.getElementById("counter");
const resetBtn = document.getElementById("reset");
const decrementBtn = document.getElementById("decrement");
const comment = document.getElementById("comment");
const comments = document.getElementById("comments");

// Counter logic
function counter() {
  let num = 0;
  return {
    increment() {
      num++;
      return num;
    },
    decrement() {
      num = Math.max(0, num - 1);
      return num;
    },
    reset() {
      num = 0;
      return num;
    },
    value() {
      return num;
    },
  };
}

const counts = counter();

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
  const comments = "SI AUTO INDEX";
  navigator.clipboard.writeText(comments).catch((err) => console.log(err));
});
