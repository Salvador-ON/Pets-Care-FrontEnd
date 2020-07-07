const chunkArray = (myArray, chunkSize) => {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    const myChunk = myArray.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
};

const pastAppointments = appoList => appoList.filter(item => {
  const date = new Date(item.date.replace(/-/g, '/')); // eslint-disable-line no-useless-escape
  date.setHours(item.time.split('T')[1].split(':')[0]);
  return date < new Date();
});

const futureAppointments = appoList => appoList.filter(item => {
  const date = new Date(item.date.replace(/-/g, '/')); // eslint-disable-line no-useless-escape
  date.setHours(item.time.split('T')[1].split(':')[0]);
  return date > new Date();
});

const utilities = {
  chunkArray,
  futureAppointments,
  pastAppointments,
};

export default utilities;
