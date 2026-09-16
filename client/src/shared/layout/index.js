import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layouts() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full">
        <div className="container mx-auto">
          <Header />
        </div>
      </header>

      <div className="flex-1 grid grid-cols-5">
        <aside className="col-span-1">
          <Sidebar />
        </aside>

        <main className="col-span-4 bg-gray-100 p-10">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
