export function setupInput({ canvas, onFlap }) {
    window.addEventListener("keydown", event => {
        if (["Space", "ArrowUp", "KeyW"].includes(event.code)) {
            onFlap();
        }
    });

    if (canvas) {
        canvas.addEventListener("pointerdown", () => {
            onFlap();
        });
    }
}
