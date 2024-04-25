import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer"; 
import Routers from "./routes/Routers";

function App() {
  return (
    <>
      <Header />

      <Routers />

      <Footer />
    </>
  );
}

export default App;
