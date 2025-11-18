import { IDirections } from "../input/InputManager";

interface IPlayer {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  speed: number;
  color: string;
  update?(deltaTime: number, directions: IDirections): void;
}

export class Player {
  position!: { x: number; y: number };
  size!: {
    width: number;
    height: number;
  };
  speed!: number;
  color!: string;
  #colliderSize = {
    width: 20,
    height: 42,
  };
  #collider = {
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  };

  constructor(playerData: IPlayer) {
    Object.assign(this, playerData);

    this.#collider.offsetX = this.size.width / 2 - this.#colliderSize.width / 2;
    this.#collider.offsetY = this.size.height / 2 - this.#colliderSize.height;
    this.#collider.width = this.#colliderSize.width;
    this.#collider.height = this.#colliderSize.height;
  }

  // I will need to redo this with your help, sensei
  getBounds(newX: number, newY: number) {
    return {};
  }

  update(deltaTime: number, directions: IDirections) {
    let moveX: number = 0;
    let moveY: number = 0;

    if (directions.left) moveX -= 1;
    if (directions.right) moveX += 1;
    if (directions.up) moveY -= 1;
    if (directions.down) moveY += 1;

    // Normalize movement vector when moving diagonally
    const magnitude = Math.hypot(moveX, moveY);
    if (magnitude !== 0) {
      moveX /= magnitude;
      moveY /= magnitude;
    }

    this.position.x += moveX * this.speed * (deltaTime / 1000);
    this.position.y += moveY * this.speed * (deltaTime / 1000);
  }
}
