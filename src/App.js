import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Login from "components/login";
import Signup from "components/signup";
import Pm1Particles from "scenes/Pm1Particles";
import Pm2_5Particles from "scenes/Pm2_5Particles";
import Pm10Particles from "scenes/Pm10Particles";
import MumbaiParticles from "scenes/MumbaiParticles";
import KeralaParticles from "scenes/KeralaParticles";
import DelhiParticles from "scenes/DelhiParticles";
import MostWindy from "scenes/MostWindy";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "utils/ProtectedRoutes";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
      <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route path="/account/login" element={<Login/>}/>
          <Route path="/account/signup" element={<Signup/>}/>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/account/login" replace />} />
              <Route exact path='/' element={<ProtectedRoute/>}>
              <Route path="/pm1-particles" element={<Pm1Particles />} />
              <Route path="/pm2_5-particles" element={<Pm2_5Particles />} />
              <Route path="/pm10-particles" element={<Pm10Particles />} />
              <Route path="/mumbai" element={<MumbaiParticles />} />
              <Route path="/kerala" element={<KeralaParticles />} />
              <Route path="/delhi" element={<DelhiParticles />} />
              <Route path="/windy-days" element={<MostWindy />} />
              </Route>                         
            </Route>
          </Routes>
        </ThemeProvider>
        </GoogleOAuthProvider >
      </BrowserRouter>
    </div>
  );
}

export default App;
