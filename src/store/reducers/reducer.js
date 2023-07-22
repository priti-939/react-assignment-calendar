import { REHYDRATE } from "redux-persist";

const initialState = {
  auth: {
    email: "",
    password: "",
  },
  registrationData: {},
  loginStatus: false,
  homeActive: true
};

export function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_CONFIRMED_ACTION":
      return {
        ...state,
        auth: action.payload,
      };

    case "SET_LOGIN_STATUS":
      return {
        ...state,
        loginStatus: action.payload,
      };

    case "LOGOUT_ACTION":
      return {
        auth: {
          email: "",
          password: "",
        },
        loginStatus: false,
      };

      case "REGESTRATION_USER_DATA":
        return{
          ...state,
          registrationData: action.password
        }
        case "SET_HOME_ACTIVE":
          return{
            ...state,
            homeActive: action.payload
          }

    case REHYDRATE:
      return {
        loginStatus:
          action.payload && action.payload.auth.loginStatus
            ? action.payload.auth.loginStatus
            : false,
        auth:
          action.payload && action.payload.auth.auth
            ? action.payload.auth.auth
            : {},
      };

    default:
      return {
        ...state,
      };
  }
}
