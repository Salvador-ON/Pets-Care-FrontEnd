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

const tomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

const utilities = {
  chunkArray,
  futureAppointments,
  pastAppointments,
  tomorrowDate,
};

export default utilities;
