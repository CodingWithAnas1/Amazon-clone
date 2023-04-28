import Home from "./Components/Pages/Home";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import { productsData } from "./Api/Api";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Login from "./Components/Pages/Login";
import Cart from "./Components/Pages/Cart";
import Register from "./Components/Pages/Register";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home qu />} loader={productsData} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );

  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
