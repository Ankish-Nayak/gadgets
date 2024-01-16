export const randomNumber = (n: number): number => {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the random decimal to the range (1 to 5)
  const randomNumber = Math.floor(randomDecimal * n) + 1;

  return randomNumber;
};
