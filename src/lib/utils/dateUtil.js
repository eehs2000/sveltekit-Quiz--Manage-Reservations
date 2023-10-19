import dayjs from 'dayjs';

export function formatReservationDate(date) {
  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) {
    console.error('Invalid date passed to formatReservationDate');
    return date;
  }

  const today = dayjs();
  const isToday = parsedDate.isSame(today, 'day');

  if (isToday) {
    return `Today, ${parsedDate.format('hh:mm A')}`;
  } else {
    return parsedDate.format('MMMM D, hh:mm A');
  }
}
