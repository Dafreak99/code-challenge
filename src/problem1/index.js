// Iterative
const sum_to_n_a = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

// Mathematical formula
const sum_to_n_b = (n) => {
  return (n * (n + 1)) / 2;
};

// Recursive
const sum_to_n_c = (n) => {
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
};
