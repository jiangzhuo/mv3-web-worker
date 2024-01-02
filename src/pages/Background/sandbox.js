// create several new workers
const worker = new Worker('cv.worker.js');
const worker1 = new Worker('cv.worker.js');
const worker2 = new Worker('cv.worker.js');
const worker3 = new Worker('cv.worker.js');
const worker4 = new Worker('cv.worker.js');
const worker5 = new Worker('cv.worker.js');

// var worker = new Worker('fibonacci.js');
// var worker = new Worker('cv.worker.js');


worker.postMessage({ msg: 'load' });
worker.onmessage = function(event) {
  console.log('Got: ', event.data);
};
worker.onerror = function(error) {
  console.log('Worker error: ' + error.message + '\n');
  throw error;
};
// await new Promise((resolve) => setTimeout(resolve, 10000)); // wait for
setTimeout(() => {

// worker.postMessage(1000000);
  const offscreenCanvas = new OffscreenCanvas(128, 128);
  const offscreenCanvasCtx = offscreenCanvas.getContext('2d');
// draw icon-128.png to offscreenCanvas
  const img = new Image();
  img.src = 'icon-128.png';
  img.onload = () => {
    offscreenCanvasCtx.drawImage(img, 0, 0);
    worker.postMessage({ msg: 'imageProcessing', payload: offscreenCanvasCtx.getImageData(0, 0, 128, 128) });
  };

}, 10000);



