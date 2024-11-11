import TopBar from '../Topbar/TopBar';

import Routers from '../Routes/Routers';
import Welcome from '../Welcome/Welcome';
import Header from '../Header/Header';



const Layout = () => {
  return (
    <>
      
      <TopBar/>
   
      <main>
        <Routers/>
      </main>
   
    </>
  )
}

export default Layout


