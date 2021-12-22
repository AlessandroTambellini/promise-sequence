# Promise Sequence

In JavaScript there is `Promise.all()` to execute and arbitrary number of promises in parallel and there are the chains of Promise (`.then().then()`) to execute a fixed number of promises in sequence. However there isn't a method to execute an arbitrary number of promises in sequence.

## Function Description

To solve the problem above I implemented a function called promiseSequence.
This function takes in an array of values and a function called promiseMaker. For each value x in the array, promiseMaker(x) has to return a Promise that will be fulfilled with an output value and as long as the previous Promise is not fulfilled, the next will not be called.
At the end promiseSequence is going to return a fulfilled Promise (if not rejected) with an array of calculated values.

If you analize the function you see how it is going to create a sequence of **nested** promises. Thus it is going to return the first Promise that will be fulfilled (or rejected) with the same value as the last Promise (most nested) in the sequence.

### example of use

Let's say you want to fetch data from different **apis**, but to avoid overloading the network you want to fetch data sequentially

```
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

function fetchBody(url) {
  return fetch(url).then((response) => response.text());
}

const urls = ["/api/user/personalData", "/api/user/achievements", "/api/user/scores"];

promiseSequence(urls, fetchBody)
  .then((bodies) => {
    /* do something with the array of strings */
  })
  .catch(console.error);
```

### Credits

"JavaScript: The Definitive Guide" by @davidflanagan
