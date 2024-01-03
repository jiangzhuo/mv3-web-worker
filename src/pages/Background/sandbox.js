// create several new workers
const worker = new Worker('worker.bundle.js');
// const worker1 = new Worker('cv.worker.bundle.js');
// const worker2 = new Worker('cv.worker.bundle.js');
// const worker3 = new Worker('cv.worker.bundle.js');
// const worker4 = new Worker('cv.worker.bundle.js');
// const worker5 = new Worker('cv.worker.bundle.js');

// var worker = new Worker('fibonacci.js');
// var worker = new Worker('cv.worker.bundle.js');


// worker.postMessage(1000000);
const offscreenCanvas = new OffscreenCanvas(128, 128);
const offscreenCanvasCtx = offscreenCanvas.getContext('2d');
// draw icon-128.png to offscreenCanvas
const img = new Image();
img.src = 'icon-224.png';
img.onload = () => {
  console.log('loaded image')
  offscreenCanvasCtx.drawImage(img, 0, 0);
  worker.postMessage({ msg: 'imageProcessing', payload: offscreenCanvasCtx.getImageData(0, 0, 224, 224) });
};




