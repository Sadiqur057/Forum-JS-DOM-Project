const hideElementById = (elementId) => {
  const element = document.getElementById(elementId);
  element.classList.add("hidden");
};

const showElementById = (elementId) => {
  const element = document.getElementById(elementId);
  element.classList.remove("hidden");
};
