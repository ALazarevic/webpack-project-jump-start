/**
 * JavaScript for demo purpose.
 */

const button = document.querySelector("#toggle-button");
const paragraph = document.querySelector("#hidden-paragraph");

if (button && paragraph) {
  button.addEventListener("click", () => {
    paragraph.classList.toggle("show");
  });
}
