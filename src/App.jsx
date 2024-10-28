import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import Testing from "./features/auth/Taxation";
import Overview from "./features/auth/overview";
import QuizList from "./features/auth/QuizList";
import QuizAttemptCheck from "./features/auth/CheckAttempt";
import Quiz from "./features/auth/Quiz";
import Quiz2 from "./features/auth/Quiz2";
import Quiz3 from "./features/auth/Quiz3";
import UserProfile from "./features/auth/UserProfile";
import Introduction from "./features/auth/Introduction";
import Lesson1 from "./features/auth/Lesson1";
import Lesson2 from "./features/auth/Lesson2";
import Lesson3 from "./features/auth/Lesson3";
import Contact from "./features/auth/contact";

function App() {
  useTitle("LeadgerLearn");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route path="Taxation" element={<Testing />} />
                <Route path="QuizList" element={<QuizList />} />
                <Route path="overview" element={<Overview />} />
                <Route path="contact" element={<Contact />} />
                <Route path="UserProfile" element={<UserProfile />} />

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="CheckAttempt" element={<QuizAttemptCheck />} />
                <Route path="Quiz" element={<Quiz />} />
                <Route path="Quiz2" element={<Quiz2 />} />
                <Route path="Quiz3" element={<Quiz3 />} />

                <Route path="Lesson1" element={<Lesson1 />} />
                <Route path="Lesson2" element={<Lesson2 />} />
                <Route path="Lesson3" element={<Lesson3 />} />
                <Route path="Introduction" element={<Introduction />} />

                {/* <Route path="Quiz">
                  <Route path=":quizId" element={<Quiz />} />
                </Route> */}
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
