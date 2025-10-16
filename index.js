const submit = document.getElementById("submit");
const input = document.getElementById("input");
const Hscode = document.getElementById("Hscode");
const copyBtn = document.getElementById("copyBtn");

submit.addEventListener("click", function () {
  const inputs = input.value.trim();
  const result = inputs.replace(/\./g, "");
  Hscode.textContent = result;
  input.value = "";
});

// Copy text silently (no alert)
copyBtn.addEventListener("click", function () {
  navigator.clipboard
    .writeText(Hscode.textContent)
    .catch((err) => console.error("Failed to copy:", err));
});
