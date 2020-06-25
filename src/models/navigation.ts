import moment from 'moment';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/articles';
import { errorMessages, successMessages } from '../constants/messages';
import pagination from '../lib/pagination';
import { menuMap } from '../store/menus';

export default {
  namespace: 'navigation',

  /**
   *  Initial state
   */
  state: {
    menuName: 'page1',
    menuItems: menuMap['page1'],
  },

  reducers: {
    setMenu(state, menuName: string) {
      return { ...state, menuName }
    }
  },

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
  })
};
