import { Platform } from 'react-native'
import {
  // CHECK_STATUS_INIT,
  // CHECK_STATUS_SUCCESS,
  // CHECK_STATUS_FAILURE,
  // CLEAR_CHECK_RESP,
  APP_VERSION,
  APP_VERSION_SUCCESS,
  APP_VERSION_FAILURE,

} from './actionTypes'

const initialState = {
  version: '',
  versionDetails: {},
  forceUpdate: 0,
  isFetchingVersion: false,
  isFetchingUser: false,
  user_details: {
    // user_profile: {
    //   terms_accepted: true
    // },
    // user_subscription: {}
  },
  userDetailsError: false,
  userDetailsErrorMsg: '',

  demoRequested: false,
  requestDemoError: false,
  requestDemoErrorMsg: '',
  isRequestingDemo: false,

  isLogging: false,
  loginError: false,
  loginErrorMsg: '',
  loginResp: {},
  isLoggedIn: false,

  logoutError: false,
  logoutErrorMsg: '',
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case APP_VERSION:
      return {
        ...state,
        isFetchingVersion: true,
      }

    case APP_VERSION_SUCCESS: {
      const { data = {} } = action
      const forceUpdate = Platform.OS === 'ios' ? data.force_update_ios : data.force_update
      return {
        ...state,
        version: data.new_v,
        forceUpdate: forceUpdate || 0,
        versionDetails: data,
        isFetchingVersion: false,
      }
    }

    case APP_VERSION_FAILURE:
      return {
        ...state,
        isFetchingVersion: false,
      }


    default:
      return state
  }
}

export default auth