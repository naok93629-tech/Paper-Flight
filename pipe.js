import { GAME } from "../config/game.js";
import { PIPE_CONFIG } from "../config/pipe.js";

export function spawnPipe(state) {
    const gapUpperY = Math.random() * (PIPE_CONFIG.maxGapUpperY - PIPE_CONFIG.minGapUpperY) + PIPE_CONFIG.minGapUpperY;
    const gapHeight = Math.random() * (PIPE_CONFIG.maxGapHeight - PIPE_CONFIG.minGapHeight) + PIPE_CONFIG.minGapHeight;
    
    state.pipes.push({
        x: GAME.width,
        width: PIPE_CONFIG.width,
        gapUpperY: gapUpperY,
        gapHeight: gapHeight,
        passed: false
    });
}

export function despawnOffscreenPipes(state) {
    state.pipes = state.pipes.filter(pipe => pipe.x + pipe.width > 0);
}