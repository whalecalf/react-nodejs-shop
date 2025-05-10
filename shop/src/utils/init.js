import store from "../redux/store"
import * as LoginAction from "../redux/actions/login"

if (localStorage.getItem("user")) {
    store.dispatch(LoginAction.setLogin(JSON.parse(localStorage.getItem("user"))))
  }