import { Suspense } from "react";
import AppRoutes from "./routes";
import { Spinner } from "./components/ui/spinner";
import AuthLoader from "./features/auth/components/AuthLoader";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthLoader>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<Spinner />}>
        <AppRoutes />
      </Suspense>
    </AuthLoader>
  );
}

export default App;
