import { setItem, getItem } from '../utils/asyncStorage';
const storageKey = 'myfavorites';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
// export const RECEIVED_TODAY = 'RECEIVED_TODAY';

// function receivedToday(today) {
//   return {
//     type: RECEIVED_TODAY,
//     month: today.getMonth() + 1,
//     date: today.getDate(),
//     weekday: today.getDay(),
//   };
// }

function toggleFavorite(id) {
  return {
    type: TOGGLE_FAVORITE,
    data: id,
  };
}

export async function getFavList() {
  let favoriteList = await getItem(storageKey);
  if (favoriteList) {
    favoriteList = JSON.parse(favoriteList);
  } else {
    favoriteList = [];
  }
  return favoriteList;
}

export async function checkIsFav(id) {
  let isFav = false;
  let favoriteList = await getItem(storageKey);
  if (favoriteList) {
    favoriteList = JSON.parse(favoriteList);
    isFav = favoriteList.indexOf(id) >= 0;
  } else {
    isFav = false;
  }
  return isFav;
}

export async function countFav() {
  let count = 0;
  let favoriteList = await getItem(storageKey);
  if (favoriteList) {
    favoriteList = JSON.parse(favoriteList);
    count = favoriteList.length;
  } else {
    count = 0;
  }
  return count;
}

export async function addToFav(id) {
  let favoriteList = await getItem(storageKey);
  // console.log(favoriteList)
  if (!favoriteList) {
    favoriteList = [];
  } else {
    favoriteList = JSON.parse(favoriteList);
  }
  favoriteList.push(id);
  await setItem(storageKey, JSON.stringify(favoriteList));
  favoriteList = await getItem(storageKey);
  favoriteList = JSON.parse(favoriteList);
}

export async function requestAddFavorite(id) {
  const isFav = await checkIsFav(id);
  if (!isFav) {
    addToFav(id);
  }
  return (dispatch) => {
    dispatch(toggleFavorite(id));
  };
}


export async function requestRemoveFavorite(id) {
  const isFav = await checkIsFav(id);
  if (isFav) {
    let favoriteList = await getItem(storageKey);
    favoriteList = JSON.parse(favoriteList);
    const indexOfTarget = favoriteList.indexOf(id);
    favoriteList.splice(indexOfTarget, 1);
    await setItem(storageKey, JSON.stringify(favoriteList));
  }

  return (dispatch) => {
    dispatch(toggleFavorite(id));
  };
}
