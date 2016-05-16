import { UPDATE_PATH_LIST } from '../actions/PathDataActions';
import { TOGGLE_FAVORITE } from '../actions/FavoriteActions';
import { findObjById } from '../utils/immutable';

export function pathList(state = [], action) {
  switch (action.type) {
    case UPDATE_PATH_LIST:
      return [
        ...action.data,
      ];
    case TOGGLE_FAVORITE: {
      const newList = findObjById(state, 'id', action.data, (item) => {
        let newItem = {...item};
        newItem.isFav = !item.isFav;
        return newItem;
      });
      return newList;
    }
    default:
      return state;
  }
}
