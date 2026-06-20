const runner = document.getElementById("runner");
const runnerPair = document.getElementById("runnerPair");

const lanePositions = [28, 36, 44, 52, 60, 68];
let passCount = 0;
let previousLane = null;

function getNextLane() {
  const candidates = lanePositions.filter((lane) => lane !== previousLane);
  const lane = candidates[Math.floor(Math.random() * candidates.length)];
  previousLane = lane;
  return lane;
}

function applyPassState() {
  const isDogFirst = passCount % 2 === 0;

  runnerPair.classList.toggle("dog-first", isDogFirst);
  runnerPair.classList.toggle("m-first", !isDogFirst);

  const lane = getNextLane();
  document.documentElement.style.setProperty("--runner-top", `${lane}%`);
}

function startPass() {
  runner.classList.remove("is-running");
  applyPassState();

  void runner.offsetWidth;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      runner.classList.add("is-running");
    });
  });
}

runner.addEventListener("animationend", () => {
  passCount += 1;
  startPass();
});

startPass();
