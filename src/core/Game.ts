/* eslint-disable @typescript-eslint/no-unused-vars */
const app: HTMLElement | null = document.getElementById("app");
const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d") as CanvasRenderingContext2D;

if (app) app.appendChild(canvas);
else console.log("App render error. Canvas couldn't be created");

const CANVAS_WIDTH: number = 800;
const CANVAS_HEIGHT: number = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.backgroundColor = "#302F2F";

let lastTime: number = 0;
let FPS: number = 0;

const player = {
  size: { width: 32, height: 32 },
  position: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 },
  color: "green",
};

function update(deltaTime: number): void {
  FPS = Math.round(1000 / deltaTime);
}

function render(): void {
  if (!ctx) return;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = player.color;
  ctx.fillRect(
    player.position.x - player.size.width / 2,
    player.position.y - player.size.height / 2,
    32,
    32
  );
}

// The value passed from requestAnimationFrame is a timestamp
// not the delta time between frames, we need to calculate it ourselves
// delta time: time difference between current frame and last frame
function gameLoop(timestamp: number): void {
  if (!lastTime) lastTime = timestamp; // Initialize lastTime on the first frame
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  render();

  requestAnimationFrame(gameLoop);
}

export { gameLoop };
