import { checkIsFav, getFavList } from '../actions/FavoriteActions';
import pathListData from '../json/data';
export const UPDATE_PATH_LIST = 'UPDATE_PATH_LIST';

function updatePathList(data) {
  return {
    type: UPDATE_PATH_LIST,
    data,
  };
}

export async function requestPathData() {
  let listData = pathListData;
  let favoriteList = await getFavList();
  const amount = favoriteList.length;
  let count = 0;
  for (let item of listData) {
    if (favoriteList.indexOf(item.id) >= 0) {
      item.isFav = true;
      count += 1;
    } else {
      item.isFav = false;
    }
    if (count >= amount) {
      break;
    }
  }
  return (dispatch) => {
    dispatch(updatePathList(listData));
  };
}
