import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  authReducer,
  initialAuthState,
} from "../reducers/authReducer";

import {
  loginUser,
  registerUser,
  getProfile,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialAuthState
  );

  // ===========================
  // Login
  // ===========================
  const login = async (credentials) => {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    try {
      const response = await loginUser(credentials);

      localStorage.setItem(
        "token",
        response.token
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response.user,
          token: response.token,
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message,
      });

      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ===========================
  // Register
  // ===========================
 const register = async (userData) => {
  return await registerUser(userData);
};

  // ===========================
  // Logout
  // ===========================
  const logout = () => {
    localStorage.removeItem("token");

    dispatch({
      type: "LOGOUT",
    });
  };

  // ===========================
  // Load Logged In User
  // ===========================
  const loadProfile = async () => {
    try {
      const response = await getProfile();

      dispatch({
        type: "LOAD_PROFILE",
        payload: response.data,
      });
     
    } catch (error) {
          console.error(error);
      logout();
    }
  };

  useEffect(() => {
    if (state.token) {
      loadProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        register,
        logout,
        loadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);