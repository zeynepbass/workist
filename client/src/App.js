
import AppRoutes from "./app/routes/AppRoutes";
import { Toaster } from "react-hot-toast";
export default function App()  {
  return(
        <>
            <Toaster
    position="top-right"
    toastOptions={{
        duration: 3000,
    }}
/>
        <AppRoutes />;
        </>
  ) 
};