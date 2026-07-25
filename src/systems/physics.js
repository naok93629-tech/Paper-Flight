import { PHYSICS } from "../config/physics.js";
import { PIPE_CONFIG } from "../config/pipe.js";

export function flap(plane) {
    plane.velocityY = PHYSICS.flapVelocity;
}

export function updatePlane(plane) {
    plane.velocityY += PHYSICS.gravity;

    plane.velocityY = Math.min(
        plane.velocityY,
        PHYSICS.maxFallSpeed
    );

    plane.y += plane.velocityY;

    plane.rotation = Math.atan(plane.velocityY / PIPE_CONFIG.speed) / 3;
}

export function updatePipes(pipes) {
    for (const pipe of pipes) {
        pipe.x -= PIPE_CONFIG.speed;
    }
}
