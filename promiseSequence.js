function promiseSequence(inputs, promiseMaker) {
  let inputs = [...inputs];

  function handleNextInput(outputs) {
    if (inputs.length === 0) return outputs;
    else {
      let nextInput = inputs.shift();
      return promiseMaker(nextInput)
        .then((output) => outputs.concat(output))
        .then(handleNextInput);
    }
  }

  return Promise.resolve([]).then(handleNextInput);
}
