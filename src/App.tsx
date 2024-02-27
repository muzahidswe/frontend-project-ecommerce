import React from "react";
import "./assets/css/main.css";
import AppRoutes from './routes/routes';

const App = () => {
   // const { url } = useSelector((state) => state.cart);
   return (
      <>
         <div>
            <AppRoutes/>
         </div>
      </>
   );
};

export default App;
