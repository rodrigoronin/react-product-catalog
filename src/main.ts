// Minimal canvas game loop for prototype
// - Player: move (WASD / arrows), dash (Shift), attack (left mouse button)
// - One mlee enemy that seeks the player
// - One ranged enemy that shoots projectiles

import { initInput } from "./input/InputManager";
import { gameLoop } from "./core/Game";

initInput();
gameLoop();

/**
type Vec = { x: number; y: number };

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.style.margin = "0";
document.body.style.background = "#111";
document.body.appendChild(canvas);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const keys = new Set<string>();
window.addEventListener("keydown", (e) => keys.add(e.key));
window.addEventListener("keyup", (e) => keys.delete(e.key));

function now() {
  return performance.now();
}
const player = {
  pos: { x: canvas.width / 2, y: canvas.height / 2 } as Vec,
  size: 28,
  facing: { x: 0, y: -1 } as Vec,
  speed: 240, // px / sec
  dashSpeed: 800,
  dashTime: 0.18, // seconds
  dashCooldown: 0.9, // seconds
  dashing: false,
  dashTimer: 0,
  dashCooldownTimer: 0,
  attackCooldown: 0.35,
  attackTimer: 0,
  hp: 100,
  maxHp: 100,
};

type Enemy = {
  pos: Vec;
  size: number;
  speed: number;
  hp: number;
  maxHp: number;
};
const enemy: Enemy = {
  pos: { x: canvas.width / 2 + 200, y: canvas.height / 2 - 60 },
  size: 30,
  speed: 80,
  hp: 60,
  maxHp: 60,
};

let lastTime = now();
let fps = 0;
let fpsAcc = 0;
let fpsCount = 0;

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function normalize(v: Vec) {
  const l = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / l, y: v.y / l };
}

function update(dt: number) {
  // FPS
  fpsAcc += 1 / dt;
  fpsCount++;
  if (fpsCount >= 8) {
    fps = Math.round(fpsAcc / fpsCount);
    fpsAcc = 0;
    fpsCount = 0;
  }
  // Timers
  if (player.dashCooldownTimer > 0)
    player.dashCooldownTimer = Math.max(0, player.dashCooldownTimer - dt);
  if (player.dashing) player.dashTimer = Math.max(0, player.dashTimer - dt);
  if (player.attackTimer > 0) player.attackTimer = Math.max(0, player.attackTimer - dt);
  if (player.dashing && player.dashTimer === 0) {
    player.dashing = false;
    player.dashCooldownTimer = player.dashCooldown;
  }

  // Input
  const dir = { x: 0, y: 0 };
  if (keys.has("w") || keys.has("ArrowUp")) dir.y -= 1;
  if (keys.has("s") || keys.has("ArrowDown")) dir.y += 1;
  if (keys.has("a") || keys.has("ArrowLeft")) dir.x -= 1;
  if (keys.has("d") || keys.has("ArrowRight")) dir.x += 1;

  const usingDash = keys.has("Shift") || keys.has("ShiftLeft") || keys.has("ShiftRight");
  if (usingDash && !player.dashing && player.dashCooldownTimer === 0) {
    if (dir.x !== 0 || dir.y !== 0) {
      player.dashing = true;
      player.dashTimer = player.dashTime;
    }
  }

  const moveDir = normalize(dir);
  // update facing when moving (used for attack direction)
  if (moveDir.x !== 0 || moveDir.y !== 0) {
    player.facing = moveDir;
  }
  const walkSpeed = player.speed;
  const curSpeed = player.dashing ? player.dashSpeed : walkSpeed;

  player.pos.x += moveDir.x * curSpeed * dt;
  player.pos.y += moveDir.y * curSpeed * dt;

  // Keep player onscreen
  player.pos.x = clamp(player.pos.x, player.size / 2, canvas.width - player.size / 2);
  player.pos.y = clamp(player.pos.y, player.size / 2, canvas.height - player.size / 2);

  // Attack
  if ((keys.has(" ") || keys.has("Spacebar")) && player.attackTimer === 0) {
    player.attackTimer = player.attackCooldown;
    // hit detection uses the same visual arc as the sword swing
    const dx = enemy.pos.x - player.pos.x;
    const dy = enemy.pos.y - player.pos.y;
    const dist = Math.hypot(dx, dy);
    const faceAngle = Math.atan2(player.facing.y, player.facing.x);
    const angleToEnemy = Math.atan2(dy, dx);
    let delta = angleToEnemy - faceAngle;
    while (delta <= -Math.PI) delta += Math.PI * 2;
    while (delta > Math.PI) delta -= Math.PI * 2;

    const maxArcDeg = 120;
    const halfArc = (maxArcDeg * (Math.PI / 180)) / 2;
    const arcRadius = player.size * 1.9;

    if (dist <= arcRadius + enemy.size / 2 && Math.abs(delta) <= halfArc) {
      enemy.hp = Math.max(0, enemy.hp - 18);
    }
  }

  // Enemy AI: seek player if alive
  if (enemy.hp > 0) {
    const dx = player.pos.x - enemy.pos.x;
    const dy = player.pos.y - enemy.pos.y;
    const n = normalize({ x: dx, y: dy });
    enemy.pos.x += n.x * enemy.speed * dt;
    enemy.pos.y += n.y * enemy.speed * dt;

    // enemy damage to player on contact
    const d = Math.hypot(player.pos.x - enemy.pos.x, player.pos.y - enemy.pos.y);
    if (d < (player.size + enemy.size) * 0.6) {
      // naive cooldown by using dashCooldownTimer as a shared timer
      if (player.dashCooldownTimer === 0) {
        player.hp = Math.max(0, player.hp - 8);
        player.dashCooldownTimer = 0.6; // enemy hit cooldown
      }
    }
  }
}

function draw() {
  // Background
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid for feel
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;
  const step = 32;
  for (let x = 0; x < canvas.width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(canvas.width, y + 0.5);
    ctx.stroke();
  }

  // Enemy
  if (enemy.hp > 0) {
    ctx.fillStyle = "#b33";
    ctx.beginPath();
    ctx.arc(enemy.pos.x, enemy.pos.y, enemy.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // enemy HP
    ctx.fillStyle = "#222";
    ctx.fillRect(enemy.pos.x - 22, enemy.pos.y - enemy.size / 2 - 12, 44, 6);
    ctx.fillStyle = "#ff5555";
    ctx.fillRect(
      enemy.pos.x - 22,
      enemy.pos.y - enemy.size / 2 - 12,
      44 * (enemy.hp / enemy.maxHp),
      6
    );
  }

  // Player
  ctx.save();
  // draw attack arc (sword swing) when attacking
  if (player.attackTimer > 0) {
    const progress = 1 - player.attackTimer / player.attackCooldown; // 0 -> 1
    const maxArcDeg = 120; // sweep angle of the sword arc
    const arcRadius = player.size * 1.9;
    const faceAngle = Math.atan2(player.facing.y, player.facing.x);
    const halfArc = (maxArcDeg * (Math.PI / 180)) / 2;
    // swing from -halfArc to +halfArc over progress
    const startAngle = faceAngle - halfArc - (Math.PI / 6) * (1 - progress);
    const endAngle = faceAngle + halfArc + (Math.PI / 6) * progress;

    ctx.beginPath();
    ctx.moveTo(player.pos.x, player.pos.y);
    ctx.arc(player.pos.x, player.pos.y, arcRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = `rgba(200,220,255,${0.28 + 0.5 * progress})`;
    ctx.fill();
  }
  // glow when dashing
  if (player.dashing) {
    ctx.shadowColor = "rgba(120,200,255,0.7)";
    ctx.shadowBlur = 16;
  } else {
    ctx.shadowBlur = 0;
  }
  ctx.fillStyle = "#39d";
  ctx.translate(player.pos.x, player.pos.y);
  ctx.beginPath();
  ctx.moveTo(0, -player.size / 2);
  ctx.lineTo(player.size / 2, player.size / 2);
  ctx.lineTo(-player.size / 2, player.size / 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Player HP bar
  ctx.fillStyle = "#222";
  ctx.fillRect(12, 12, 200, 18);
  ctx.fillStyle = "#55cc77";
  ctx.fillRect(12, 12, 200 * (player.hp / player.maxHp), 18);
  ctx.strokeStyle = "#000";
  ctx.strokeRect(12, 12, 200, 18);

  // HUD text
  ctx.fillStyle = "#eee";
  ctx.font = "14px monospace";
  ctx.fillText(`HP: ${player.hp}/${player.maxHp}`, 14, 46);
  ctx.fillText(
    `Dash: ${player.dashCooldownTimer > 0 ? player.dashCooldownTimer.toFixed(1) : "Ready"}`,
    14,
    64
  );
  ctx.fillText(
    `Attack: ${player.attackTimer > 0 ? player.attackTimer.toFixed(1) : "Ready"}`,
    14,
    82
  );
  ctx.fillText(`FPS: ${fps}`, canvas.width - 110, 26);

  // Simple hint
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fillText("WASD / Arrows: Move  •  Shift: Dash  •  Space: Attack", 12, canvas.height - 18);
}

function loop(ts: number) {
  const t = now();
  const dt = Math.min(0.05, (t - lastTime) / 1000);
  lastTime = t;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// small helper so prototype can be restarted easily in dev
(window as any).__protoGame = { player, enemy };
 */
