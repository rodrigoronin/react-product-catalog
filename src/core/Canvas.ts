const displayCanvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const displayCtx: CanvasRenderingContext2D = displayCanvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const GAME_WIDTH: number = 480;
const GAME_HEIGHT: number = 270;
const DISPLAY_WIDTH: number = 960;
const DISPLAY_HEIGHT: number = 540;

const gameCanvas: HTMLCanvasElement = document.createElement("canvas");
const gameCtx: CanvasRenderingContext2D | null = gameCanvas.getContext("2d");

function initCanvas() {
  gameCanvas.width = GAME_WIDTH;
  gameCanvas.height = GAME_HEIGHT;

  displayCanvas.width = DISPLAY_WIDTH;
  displayCanvas.height = DISPLAY_HEIGHT;
  displayCanvas.style.backgroundColor = "#302F2F";

  const scale: number = Math.floor(
    Math.min(DISPLAY_WIDTH / GAME_WIDTH, DISPLAY_HEIGHT / GAME_HEIGHT)
  );

  displayCtx.imageSmoothingEnabled = false;

  displayCtx.drawImage(
    gameCanvas,
    0,
    0,
    GAME_WIDTH,
    GAME_HEIGHT,
    0,
    0,
    GAME_WIDTH * scale,
    GAME_HEIGHT * scale
  );
}

export { initCanvas, displayCanvas, displayCtx, gameCanvas, gameCtx, GAME_WIDTH, GAME_HEIGHT };
