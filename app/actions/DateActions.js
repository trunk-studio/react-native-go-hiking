export const RECEIVED_TODAY = 'RECEIVED_TODAY';

function receivedToday(today) {
  return {
    type: RECEIVED_TODAY,
    month: today.getMonth() + 1,
    date: today.getDate(),
    weekday: today.getDay(),
  };
}

export async function requestToday() {
  return (dispatch) => {
    dispatch(receivedToday(new Date()));
  };
}
