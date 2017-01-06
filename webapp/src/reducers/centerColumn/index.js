import { combineReducers } from 'redux';

import displayMode from './displayMode';
import menuId from './menuId';
import currentOrder from './currentOrder';
import suggestOrder from './suggestOrder';
import login from './login';
import pizzaBuilder from './pizzaBuilder';
import organizer from './organizer';
import myOrderDetails from './myOrderDetails';

const centerColumn = combineReducers({
    displayMode,
    menuId,
    currentOrder,
    suggestOrder,
    login,
    pizzaBuilder,
    organizer,
    myOrderDetails
});

export default centerColumn
