import { useEffect, createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

/**
 * Init state default
 */
//  {
//   _id: '61c7c93bba2b02421a9464bf',
//   username: 'bao',
//   email: 'bao@gmail.com',
//   profilePicture: 'person/1.jpeg',
//   coverPicture: '',
//   isAdmin: false,
//   followers: [],
//   followings: [1, 2],
// }
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

/**
 * Create context with default state
 */
export const AuthContext = createContext(INITIAL_STATE);

/**
 * Create Context provider
 */
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
