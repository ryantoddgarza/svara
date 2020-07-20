// time of day
export const prahar = () => {
  const hour = new Date().getHours();

  switch (true) {
    case hour >= 4 && hour < 7 :
      return 0
    case hour >= 7 && hour < 10 :
      return 1
    case hour >= 10 && hour < 13 :
      return 2
    case hour >= 13 && hour < 16 :
      return 3
    case hour >= 16 && hour < 19 :
      return 4
    case hour >= 19 && hour < 22 :
      return 5
    case hour >= 22 || hour < 1 :
      return 6
    case hour >= 1 && hour < 4 :
      return 7
    default:
      return null;
  }
}

// fibonacci
export const fibonacci = (n) => {
  let fibArr = [0, 1];

  for (let i = 2; i < n + 1; i++) {
    fibArr.push(fibArr[i - 2] + fibArr[i - 1]);
    console.log(fibArr);
  }

 return fibArr[n]
}

