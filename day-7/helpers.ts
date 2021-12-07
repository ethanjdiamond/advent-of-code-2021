export function movementCost(distance: number) {
  let sum = 0;
  for (let x = distance; x > 0; x--) {
    sum += x;
  }
  return sum;
}
