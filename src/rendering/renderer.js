export function render(ctx, images, state) {
    ctx.save();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.scale(state.scale, state.scale);

//  drawBackground(ctx, images.background);
    drawPipes(ctx, images.pipe, state.pipes);
    drawPlane(ctx, images.plane, state.plane);
//  drawGround(ctx, images.ground);
    drawUI(ctx, state);

    ctx.restore();
}


function drawBackground(ctx, backgroundImage) {}

function drawGround(ctx, groundImage) {}

function drawUI(ctx, state) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(`SCORE   ${state.score}`, 10, 30);
    ctx.fillText(`HIGH SCORE   ${state.highScore}`, 10, 55);
//  ctx.fillText(`STAGE ${}`, 10, 125);
}

function drawPlane(ctx, planeImage, plane) {
    ctx.save();

    ctx.translate(plane.x + plane.hitboxWidth / 2, plane.y + plane.hitboxHeight / 2);
    ctx.rotate(plane.rotation);

    ctx.drawImage(
        planeImage,
        -plane.imageWidth / 2,
        -plane.imageHeight / 2,
        plane.imageWidth,
        plane.imageHeight
    );
    
    ctx.restore();
}

function drawPipes(ctx, pipeImage, pipes) {
    if (pipes.length === 0) {
        return;
    }

    const imageScale = pipes[0].width / pipeImage.width;

    for (const pipe of pipes) {
        ctx.drawImage(
            pipeImage,
            pipe.x,
            pipe.gapUpperY + pipe.gapHeight,
            pipe.width,
            pipeImage.height * imageScale
        );
    }

    ctx.save();
    ctx.scale(1, -1);

    for (const pipe of pipes) {
        ctx.drawImage(
            pipeImage,
            pipe.x,
            -pipe.gapUpperY,
            pipe.width,
            pipeImage.height * imageScale
        );
    }
    
    ctx.restore();
}
