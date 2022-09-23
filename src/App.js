import NavBar from "./components/NavBar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

function App() {
  const { isOpen } = useSelector((state) => state.modal);

  return (
    <main>
      {isOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
