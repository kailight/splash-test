export default function rand(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}