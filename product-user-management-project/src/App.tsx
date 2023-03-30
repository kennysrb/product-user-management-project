import { Header } from "./components/Header";
import { Products } from "./pages/Products";
import { Provider, initializeStore } from "./store";
import { observer } from "mobx-react-lite";

const store = initializeStore();
function App() {
  return (
    <>
      <Header />
      <div>Home page</div>
    </>
  );
}

export default observer(App);
