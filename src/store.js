import { readable, writable } from 'svelte/store';

export let reservations = writable([
  {
    id: 0,
    name: 'Noah Lee',
    phone: '010-1111-2222',
    date: '2023-07-08',
    count: 8,
    table: [
      { floor: 1, no: 7 },
      { floor: 1, no: 8 },
    ],
    note: 'Birthday',
  },
]);

// 손님 이름, 전화번호, 예약날짜, 인원수, 테이블, 노트

export function removeReservationById(id) {
  reservations.update((items) => items.filter((item) => item.id !== id));
  console.log(reservations);
}

export function updateReservationById(id, updatedReservation) {
  reservations.update((items) =>
    items.map((item) => (item.id === id ? updatedReservation : item)),
  );
}

export function addNewReservation(newReservation) {
  reservations.update((items) => {
    const lastId = items.length > 0 ? items[items.length - 1].id : -1;
    const newId = lastId + 1;
    return [...items, { ...newReservation, id: newId }];
  });
}

export let tableList = readable([
  { floor: 1, no: 1 },
  { floor: 1, no: 2 },
  { floor: 1, no: 3 },
  { floor: 1, no: 4 },
  { floor: 1, no: 5 },
  { floor: 1, no: 6 },
  { floor: 1, no: 7 },
  { floor: 1, no: 8 },
]);
