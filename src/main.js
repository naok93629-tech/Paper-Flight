import { GAME } from "./config/game.js";
import { PIPE_CONFIG } from "./config/pipe.js";
import { createGameState } from "./state/gamestate.js";
import { flap, updatePlane, updatePipes } from "./systems/physics.js";
import { spawnPipe, despawnOffscreenPipes } from "./systems/pipe.js";
import { checkGameOver, checkGroundCollision } from "./systems/collision.js";
import { updateScore, updateHighScore } from "./systems/scoring.js";
import { render } from "./rendering/renderer.js";
import { loadImages } from "./rendering/assetloader.js";
import { setupInput } from "./input/input.js";


let state = createGameState();
const images = await loadImages();

const canvas = document.getElementById("gameCanvas");
if (!canvas) {
    throw new Error("Canvas element with id 'gameCanvas' was not found.");
}
const ctx = canvas.getContext("2d");
resizeCanvas(canvas);


setupInput({
    canvas,
    onFlap: () => {
        switch (state.status) {
            case "ready":
                state.status = "playing";
                break;
            case "playing":
                flap(state.plane);
                break;
            case "gameover":
                resetGame();
                break;
        }
        if (state.status === "playing") {
            flap(state.plane);
        }
    },
});

addEventListener("resize", () => {
    resizeCanvas(canvas);
    render(ctx, images, state);
});

setInterval(gameLoop, 1000 / GAME.fps);


function resizeCanvas(canvas) {
    const aspectRatio = GAME.width / GAME.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth / windowHeight > aspectRatio) {
        canvas.width = windowHeight * aspectRatio;
        canvas.height = windowHeight;
    } else {
        canvas.width = windowWidth;
        canvas.height = windowWidth / aspectRatio;
    }

    state.scale = canvas.width / GAME.width;
}

function updateGame() {
    state.elapsedTime += 1;

    updatePlane(state.plane);
    updatePipes(state.pipes);
    updateScore(state);
    updateHighScore(state);

    despawnOffscreenPipes(state);
    if (state.elapsedTime % PIPE_CONFIG.spawnInterval === 0) {
        spawnPipe(state);
    }
    
    if (checkGameOver(state)) {
        state.status = "gameover";
    }
}

function fall() {
    if (true || !checkGroundCollision(state.plane)) {
        updatePlane(state.plane);
    }
}

function resetGame() {
    state = createGameState({ scale: state.scale, highScore: state.highScore });
}

function gameLoop() {
    switch (state.status) {
        case "ready":
            break;
        case "playing":
            updateGame();
            break;
        case "gameover":
            fall();
            break;
    }
    render(ctx, images, state);
}
