import { IMAGE_ASSETS } from "./assetmanifest.js";

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);

        image.onerror = () => {
            reject(
                new Error(`Failed to load image: ${src}`)
            );
        };

        image.src = src;
    });
}

export async function loadImages() {
    const entries = await Promise.all(
        Object.entries(IMAGE_ASSETS).map(
            async ([name, src]) => {
                const image = await loadImage(src);

                return [name, image];
            }
        )
    );

    return Object.fromEntries(entries);
}