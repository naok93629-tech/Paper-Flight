import { GAME } from "../config/game.js";

export function updateScore(state) {
    for (const pipe of state.pipes) {
        if (
            !pipe.passed &&
            pipe.x + pipe.width < state.plane.x
        ) {
            pipe.passed = true;
            state.score += GAME.scorePerPipe;
        }
    }
}

export function updateHighScore(state) {
    if (state.score > state.highScore) {
        state.highScore = state.score;
    }
}
