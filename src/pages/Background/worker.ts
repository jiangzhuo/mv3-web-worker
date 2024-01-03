import * as ort from 'onnxruntime-web';

ort.env.wasm.numThreads = 1;

async function processFrame(frame) {
  const session = await ort.InferenceSession.create("/model.onnx", { executionProviders: ['webgl'] });
  console.log('created session')

  // Convert to Float32 tensor.
  const inputTensor = await ort.Tensor.fromImage(frame);
  console.log('got input tensor', inputTensor)

  // Run the model.
  const outputTensor = (await session.run({ "input1": inputTensor })).output1;
  console.log('got output tensor')


  // Post-processing output tensor (clamp values between 0, 255 and divide by 255).
  for (let i = 0; i < outputTensor.size; i++) {
    outputTensor.data[i] = Math.min(Math.max(0, outputTensor.data[i]), 255) / 255.0;
  }
  console.log('post processed output tensor')

  // Convert Float32 image on range [0, 1] back to ImageData.
  const outImage = outputTensor.toImageData();
  console.log('got output image data')
}

addEventListener('message', (e) => {
  console.log(e.data);
  processFrame(e.data.payload).then((result) => {
    console.log(result)
    postMessage(result)
  }).catch((err) => {
    console.error(err)
  })

});