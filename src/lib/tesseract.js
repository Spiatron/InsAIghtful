import Tesseract from 'tesseract.js';

export async function tesseract(image) {
    const { data: { text } } = await Tesseract.recognize(
        image,
        'eng', // language: English
        { logger: (info) => console.log(info) } // optional logger
    );

    return text;
}