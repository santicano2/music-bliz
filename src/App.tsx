import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";

import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
