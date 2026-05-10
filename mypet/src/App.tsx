import { Switch, Route, Router as WouterRouter } from "wouter";
import { AppProvider } from "./lib/AppContext";
import Navbar from "./components/Navbar";
import CartPanel from "./components/CartPanel";
import AuthModal from "./components/AuthModal";
import ToastContainer from "./components/ToastContainer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Doctors from "./pages/Doctors";
import MyPet from "./pages/MyPet";
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-navy-500 mb-4">404</h1>
        <p className="text-navy-300 mb-6">Page not found</p>
        <a href="/" className="btn-gold px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider">Go Home</a>
      </div>
    </div>
  );
}

function AppInner() {
  return (
    <>
      <Navbar />
      <CartPanel />
      <AuthModal />
      <ToastContainer />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/shop" component={Shop} />
        <Route path="/doctors" component={Doctors} />
        <Route path="/mypet" component={MyPet} />
        <Route path="/appointment" component={Appointment} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppInner />
      </WouterRouter>
    </AppProvider>
  );
}

export default App;
