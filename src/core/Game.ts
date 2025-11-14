import { GAME_WIDTH, GAME_HEIGHT, gameCtx, renderToDisplay } from "./Canvas";
import { Camera } from "./Camera";
import { Player } from "../entities/Player";
import { getDirections } from "../input/InputManager";
import { renderGrid } from "../maps/TrainingRoom";

const camera = new Camera({
  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  lerpSpeed: 0.09,
});

let lastTime: number = 0;

const player = new Player({
  position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 },
  size: { width: 48, height: 48 },
  speed: 100,
  color: "green",
});

function update(deltaTime: number): void {
  if (deltaTime > 0) {
    const dir = getDirections();
    player.update(deltaTime, dir);
  }
}

function render(): void {
  if (!gameCtx) return;

  gameCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  renderGrid(gameCtx, camera);

  gameCtx.fillStyle = player.color;
  gameCtx.fillRect(
    player.position.x - camera.position.x - player.size.width / 2,
    player.position.y - camera.position.y - player.size.height / 2,
    player.size.width,
    player.size.height
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
  camera.follow(player.position.x, player.position.y);
  camera.update();
  render();
  renderToDisplay();

  requestAnimationFrame(gameLoop);
}

export { gameLoop };
