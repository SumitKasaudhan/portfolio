import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home loads eagerly — it's the critical path
import Home from "./pages/Home";

// Admin routes lazy — visitors never need these on initial load
const AdminLogin     = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Minimal fallback — no layout shift, just blank while admin chunk loads
const PageLoader = () => (
  <div style={{
    minHeight: "100vh",
    background: "#04040c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <div style={{
      width: "32px", height: "32px",
      borderRadius: "50%",
      border: "2px solid rgba(168,85,247,0.2)",
      borderTop: "2px solid #a855f7",
      animation: "spin 0.7s linear infinite",
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          }
        />

        <Route
          path="/admin"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;