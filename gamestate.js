import { PLAYER } from "../config/player.js";

export function createGameState(overrides = {}) {
    const state = {
        status: "ready", // ready, playing, paused

        score: 0,
        highScore: 0,

        plane: {
            x: PLAYER.initialX,
            y: PLAYER.initialY,
            velocityY: 0,
            rotation: 0,

            hitboxWidth: PLAYER.hitboxWidth,
            hitboxHeight: PLAYER.hitboxHeight,

            imageWidth: PLAYER.imageWidth,
            imageHeight: PLAYER.imageHeight,
        },

        pipes: [],  // [{x, gapUpperY, gapHeight, width}, ]

//      particles: [],

        scale: 1,

        elapsedTime: 0,
    };
    
    return {...state, ...overrides};
}