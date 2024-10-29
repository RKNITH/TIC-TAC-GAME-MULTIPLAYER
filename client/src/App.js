// Description: This is the main component of the application. 
// It is responsible for routing the user to the correct page.
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Material UI
import { ThemeProvider } from '@mui/material'
import { theme } from './utils/theme'

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoutes';

// Library Imports
import *  as  Realm from "realm-web";
import axios from 'axios';

// Redux Functions
import { useDispatch } from 'react-redux';
import { userInfo } from './features/userSlice';

// Pages
import Entry from './pages/Entry';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Play from './pages/Play';
import NewGame from './pages/NewGame';
import { url } from './constants/url';

// MongoDB AppID
const app = new Realm.App({ id: "tic_tac_toe-yywge" });

function App() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);

  // Watch for changes in the database
  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      // setUser(user);

      // Connect to the database
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const games = mongodb.db("tic-tac-toe").collection("games");

      // Everytime a change happens in the stream, add it to the list of events
      for await (const change of games.watch()) {
        setEvents(events => [...events, change]);
      }
    }
    login();
  }, []);

  // Dispatch user info
  useEffect(() => {
    axios.get(`${url}/api/user`, {
      withCredentials: true
    }).then((res) => {
      // navigate('/home')
      dispatch(userInfo(res.data));
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<Entry />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/home' element={<Home events={events} />} />
                <Route path='/new-game' element={<NewGame />} />
                <Route path='/play/:id' element={<Play events={events} />} />
              </Route>
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
