export interface ICamera {
  position: { x: number; y: number };
  size: { width: number; height: number };
  lerpSpeed: number;
}

export class Camera {
  position!: { x: number; y: number };
  size!: { width: number; height: number };
  lerpSpeed!: number;
  targetX: number = 0;
  targetY: number = 0;

  constructor(cameraData: ICamera) {
    this.position = cameraData.position;
    this.size = cameraData.size;
    this.lerpSpeed = cameraData.lerpSpeed;
  }

  follow(targetX: number, targetY: number) {
    this.targetX = targetX - this.size.width / 2;
    this.targetY = targetY - this.size.height / 2;
  }

  update() {
    this.position.x += (this.targetX - this.position.x) * this.lerpSpeed;
    this.position.y += (this.targetY - this.position.y) * this.lerpSpeed;
  }
}
