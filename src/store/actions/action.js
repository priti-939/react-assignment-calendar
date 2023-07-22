export function loginData(data) {
    return {
      type: "LOGIN_CONFIRMED_ACTION",
      payload: data,
    };
  }
  
  export function loginStatus(value) {
    return {
      type: "SET_LOGIN_STATUS",
      payload: value,
    };
  }
  
  export function logout(history) {
    return {
      type: "LOGOUT_ACTION",
    };
  }

  export function registrationAction(value){
    return{
      type:"REGESTRATION_USER_DATA",
      payload: value
    }
  }
  
  export function setHomeActive(value){
    return{
      type:"SET_HOME_ACTIVE",
      payload: value
    }
  }
  