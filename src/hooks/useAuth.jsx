// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "../features/auth/authSlice";
// import { jwtDecode } from "jwt-decode";

// const useAuth = () => {
//   const token = useSelector(selectCurrentToken);
//   let isAdmin = false;
//   let status = "Student";

//   if (token) {
//     const decoded = jwtDecode(token);
//     const { username, roles } = decoded.UserInfo;

//     isAdmin = roles.includes("Admin");

//     if (isAdmin) status = "Admin";

//     return { username, roles, status, isAdmin };
//   }

//   return { username: "", roles: [], isAdmin, status };
// };
// export default useAuth;

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode"; // Removed destructuring here as jwt-decode is the default export

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let status = "Student";
  let id = null;
  let currentScore = 0;

  if (token) {
    const decoded = jwtDecode(token);
    const { id: userId, username, roles, score } = decoded.UserInfo; // Extract user id

    isAdmin = roles.includes("Admin");

    if (isAdmin) status = "Admin";
    currentScore = score;
    return { id: userId, username, roles, status, isAdmin, currentScore }; // Return id
  }

  return { id, username: "", roles: [], isAdmin, status, currentScore };
};

export default useAuth;
