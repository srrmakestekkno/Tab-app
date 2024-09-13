const content = [
  {
    id: 1,
    title: "title title title 1111",
    text: "loraslkdlaksdnlkasndlkasnldnaslkndlaksdnlkasndlkasldkaskdkd",
  },
  {
    id: 2,
    title: "title title title 2222",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        unde nemo modi voluptatum aliquid autem quidem fugit minima odit, ut
        fugiat voluptate debitis ducimus dolore sequi tempora ipsa qui sed.
        Itaque iste quo quaerat aut rerum, quidem exercitationem, consectetur
        nemo ea architecto sunt est enim. Officiis natus laboriosam veniam
        ipsam?`,
  },
  {
    id: 3,
    title: "title title title 3333",
    text: "loraslkdlaksdnlkasndlkasnldnaslkndlaksdnlkasndlkasldkaskdkd",
  },
  {
    id: 4,
    title: "4444",
    text: "loraslkdlaksdnlkasndlkasnldnaslkndlaksdnlkasndlkasldkaskdkd",
  },
];

let activeButton = null;
let currentCount = 0;
let lastIncrementValue = 1;
let incrementValueHistory = [];

function createTabButtons() {
  document.addEventListener("DOMContentLoaded", () => {
    content.forEach((c) => {
      const button = createTabButton(c);
      document.getElementById("buttons").appendChild(button);
      const hideShow = document.getElementById("hide-text");
      hideShow.innerText = "Hide text";
      //   const tabText = document.getElementById("tab-text");
      //   tabText.classList.remove("hide");
    });
    // set first tab as active as default
    const firstButton = document.getElementById("buttons").firstElementChild;
    changeTab(firstButton);
    activeButton = firstButton;
  });
}

function createTabButton(content) {
  const button = document.createElement("button");
  button.id = content.id;
  button.className = "tab";
  button.textContent = `Tab ${content.id}`;

  button.addEventListener("click", () => {
    changeTab(button);
  });

  return button;
}

function setCount(count) {
  if (lastIncrementValue < 0) lastIncrementValue = 0;
  document.getElementById("count").innerText = count;
}

function changeTab(currentButton) {
  const index = currentButton.id - 1;
  const tabContentTitle = document.getElementById("tab-content-title");
  const hideText = document.getElementById("hide-text");
  const tabText = document.getElementById("tab-text");

  tabText.classList.remove("hide");
  tabContentTitle.innerText = content.at(index).title;
  tabText.innerText = content.at(index).text;

  if (activeButton && activeButton !== currentButton) {
    activeButton.classList.remove("active");
  }

  currentButton.classList.add("active");
  activeButton = currentButton.classList.contains("active")
    ? currentButton
    : null;

  hideText.innerText = "Hide text";
}

function hideText() {
  const tabText = document.getElementById("tab-text");
  const hideShow = document.getElementById("hide-text");
  const isHidden = tabText.classList.toggle("hide");
  hideShow.innerText = isHidden ? "Show text" : "Hide text";
}

function incrementCount(button) {
  const length = button.innerText.length;
  currentCount += length;
  incrementValueHistory.push(lastIncrementValue);
  lastIncrementValue = length;
  setCount(currentCount);
}

function convertToNumber(value) {
  return value ? parseInt(value[1], 10) * 1000 : 0; // convert seconds to ms
}

function undo(button) {
  // searches for one or more digits followed by "s". match[1] contains the numeric part of the match.
  const match = button.innerText.match(/(\d+)s/);

  const delay = convertToNumber(match);

  if (incrementValueHistory.length === 0) return;

  const performUndo = () => {
    if (currentCount > 0) {
      setCount((currentCount -= lastIncrementValue));
    }
    lastIncrementValue = incrementValueHistory.pop();
  };

  if (delay) {
    setTimeout(performUndo, delay);
  } else {
    performUndo();
  }
}

createTabButtons();
