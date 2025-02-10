import {
    createBrowserRouter,
     
  } from "react-router-dom";

  import "../../src/index.css";
import Pages from "../app/(dashboard)/Pages";
// import DashboardAnalytics from "../app/(dashboard)/DashboardAnalytics";
import Login from "../views/Login";
import Layout from "../app/(dashboard)/Layout";
import PrivateRouter from "./PrivateRouter";
import Register from "../views/Register";
import Tickets from "../components/PersonalComponent/Tickets";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
      // element:  <Pages></Pages>,
      // element:  <Layout></Layout>
    },
    {
      path: '/dashboard',
      element:  <PrivateRouter><Layout></Layout></PrivateRouter>,
      children: [
        {
          path: 'ticket',
          // element: <Pages></Pages>,
          element:<PrivateRouter><Tickets></Tickets></PrivateRouter> ,
        },{
          path: 'ticket-submission',
          element: <PrivateRouter><Register></Register></PrivateRouter>
        },
        {
          path: 'video-class',
          element: <PrivateRouter><h2>video class</h2></PrivateRouter>
        }
      ]
    }

 
   
   
  ]);


export default router;
  