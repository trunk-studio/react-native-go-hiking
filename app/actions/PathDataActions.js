import { checkIsFav } from '../actions/FavoriteActions';
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
  for (let item of listData) {
    item.isFav = await checkIsFav(item.id);
  }
  return (dispatch) => {
    dispatch(updatePathList(listData));
  };
}
