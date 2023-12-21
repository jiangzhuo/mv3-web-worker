self.onmessage = function(e) {
  let userNum = Number(e.data);
  fibonacci(userNum);
}


function fibonacci(num){
  for(let i = 0; i < 1000000000; i++){
    let num1 = num;
    let a = 1, b = 0, temp;
    while (num1 >= 0){
      temp = a;
      a = a + b;
      b = temp;
      num1--;
    }
  }

  self.postMessage(b);
}