randomWidth = () => {
  const items = [50, 80, 100, 150, 200];
  const w = items[Math.floor(Math.random() * items.length)];
  return w;
}

randomHeight = () => {
  const items = [25, 40, 50, 75, 100];
  const h = items[Math.floor(Math.random() * items.length)];
  return h;
}

generateCloud = () => {
  const parent = document.querySelector(".content");
  const div = document.createElement('div');
  w = randomWidth();
  h = randomHeight();
  div.className = `cloud cloud__${new Date().valueOf()}`;
  div.style.width = `${w}px`;
  div.style.height = `${h}px`;
  for (i = 0; i < (h / 10) - 1; i++) {
    const lines = document.createElement('div')
    lines.className = 'lines';
    div.appendChild(lines);
  }
  parent.appendChild(div);

}




window.onload = () => {
  generateCloud();

};
