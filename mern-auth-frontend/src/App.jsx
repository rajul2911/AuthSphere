import AppRoutes from "./routes/AppRoutes";
import AuthBootstrap from "./components/common/AuthBootstrap";

function App() {
  return (
    <AuthBootstrap>
      <AppRoutes />
    </AuthBootstrap>
  );
}

export default App;
