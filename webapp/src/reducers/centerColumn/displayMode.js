import {
    SHOW_MENU, HIDE_MENU,
    START_ORDER, CONTINUE_ORDER, GO_BACK_TO_MENU,
    SHOW_SUGGESTION, HIDE_SUGGESTION,
    SUGGESTION_SUCCESS, NEW_GROUP_SUCCESS
} from '../../actions/actionTypes';

import {
    DISPLAY_DEFAULT,
    DISPLAY_MENU_VIEWING,
    DISPLAY_MENU_ORDERING,
    DISPLAY_NEW_ORDER_OPTIONS,
    DISPLAY_SUGGEST_OPTIONS
} from '../../constants';

const displayMode = (state = DISPLAY_DEFAULT, action) => {
    switch (action.type) {
        case SHOW_MENU:
            return DISPLAY_MENU_VIEWING;

        case HIDE_MENU:
            return DISPLAY_DEFAULT;

        case START_ORDER:
            return DISPLAY_MENU_ORDERING;

        case CONTINUE_ORDER:
            return DISPLAY_NEW_ORDER_OPTIONS;

        case GO_BACK_TO_MENU:
            return DISPLAY_MENU_ORDERING;

        case SHOW_SUGGESTION:
            return DISPLAY_SUGGEST_OPTIONS;

        case HIDE_SUGGESTION:
            return DISPLAY_DEFAULT;

        case SUGGESTION_SUCCESS:
        case NEW_GROUP_SUCCESS:
            return DISPLAY_DEFAULT;

        default:
            return state;
    }
};

export default displayMode
