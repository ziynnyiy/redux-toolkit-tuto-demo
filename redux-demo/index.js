// BASIC PATTERN OF REDUX

const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// 這裡將 string 賦值給變數也是為了提高可維護性、只需要修改一個地方、避免命名衝突
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// ACTION CREATORS
// action creactor 相較於直接帶入 action 的好處是，如果日後要修改時可以只修改一個地方(牽一髮動全身)
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// ALL INITIAL STATES
const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 20,
};

// ALL REDUCERS
// (previousState, action) => newState

// The reducer that only incharges of cake
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};

// The reducer that only incharges of ice cream
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// Combine all reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger)); // store 一定只能有一個 !
console.log("Initial state", store.getState()); // 第二個參數可以直接取得store 的 state

const unsubscribe = store.subscribe(() => {}); // 將store增加 listener，當 state 發生改變時會執行參數中的函式

// store.dispatch(orderCake()); // dispatch函式 可以放入一個 action 作為參數，執行該 action 進而更新 state
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

// Bind Action Creators => 可以精簡呼叫 action 的語法 (非必要)
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch,
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

unsubscribe();
