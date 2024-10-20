import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Logout from "./pages/Logout/Logout";
import HomeContainer from "./pages/Home/Home";
import Registration1 from "./pages/Register/Registration1";
import Registration3 from "./pages/Register/Registration3";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/Dashboard/DashBoard";
import Chat from "./pages/Chat/Chat";
import ChatList from "./pages/ChatList/ChatList";
import Error from "./pages/Error/Error";
import FindCare from "./pages/FindCare/FindCare";
import AboutUs from "./pages/AboutUs/AboutUs";
import Appointment from "./pages/Appointment/Appointment";

 
import Find from "./pages/Find/Find";
import AppointmentList from "./pages/AppointmentList/AppointmentList";
import Notes from "./pages/Notes/Notes";
import Support from "./pages/Support/Support";
import Ratings from "./pages/Ratings/Ratings";
import Requests from "./pages/Requests/Requests";
import Users from "./pages/Users/Users";


function App() {
  // for getting token this is for global this is helped whit the UserContext.js
  const [user, setUser] = useState({
    // this is just set to null
    id: null,
    encryptedId: null,
    lastname: null,
    firstname: null,
    email: null,
    userType: null,
    street: null,
    barangayId: null,
    contactNumber: null,
    gender: null,
    birthDate: null,
    experienceId: null,
  });

  // for clearing token of logout
  const unsetUser = () => {
    localStorage.clear();
  };

  // this is where you generate the details of the user to be put in the global
  useEffect(() => {
    // fetch data from db
    fetch(`${process.env.REACT_APP_API_URL}/main/user-profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // if there is data passed go to if and if there is non else
        if (data.auth !== "Failed") {
          // the passed id will be set in the setUser asand will be set globally carried in line 21 const [user, setUser] = useState and so on
          setUser({
            id: data.data.userId,
            encryptedId: data.data.userType,
            lastname: data.data.lastname,
            firstname: data.data.firstname,
            email: data.data.email,
            userType: data.data.userType,
            street: data.data.street,
            barangayId: data.data.barangayId,
            contactNumber: data.data.contactNumber,
            gender: data.data.gender,
            birthDate: data.data.birthDate,
            experienceId: data.data.experienceId,
          });
        } else {
          setUser({
            id: null,
            userType: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
 
        <Routes>
          <Route path="*" errorElement={<Error />} />
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration1" element={<Registration1 />} />
          <Route path="/registration3" element={<Registration3 />} />
          <Route path="/dashboard-main" element={<DashBoard />} />
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/chat/:receiverId" element={<Chat />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/find-care" element={<FindCare />} />
          <Route path="/notes" element={<Notes />} />
          <Route
            path="/appointment-page/:assistantId"
            element={<Appointment />}
          />
          <Route path="/appointment" element={<AppointmentList />} />

          <Route path="/find" element={<Find />} />
          <Route path="/support" element={<Support />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
