export const formatTime = (time: number) => {
  const date = new Date(0);

  date.setMilliseconds(time);
  return date.toISOString().substr(11, 8);
};
