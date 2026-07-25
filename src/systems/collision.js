import { GAME } from "../config/game.js";

export function checkGameOver(state) {
    if (checkGroundCollision(state.plane)) {
        return true;
    }
    
    if (checkPipeCollision(state.plane, state.pipes)) {
        return true;
    }
    
    return false;
}

export function checkGroundCollision(plane) {
    return plane.y + plane.hitboxHeight >= GAME.groundY;
}

function checkPipeCollision(plane, pipes) {
    return pipes.some(pipe => intersects(plane, pipe));
}

function intersects(plane, pipe) {
    return (
        plane.x < pipe.x + pipe.width &&
        plane.x + plane.hitboxWidth > pipe.x &&
        (plane.y < pipe.gapUpperY ||
        plane.y + plane.hitboxHeight > pipe.gapUpperY + pipe.gapHeight)
    );
}
