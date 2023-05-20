export function createElement(
  elem,
  className,
  parentClass = "app",
  parentNode
) {
  const element = document.createElement(elem);
  element.classList.add(className);
  if (parentNode) {
    parentNode.appendChild(element);
  } else {
    document.querySelector(`.${parentClass}`).appendChild(element);
  }

  return element;
}
