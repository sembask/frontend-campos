import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { Campo } from "./pages/campo";
import { Preenchimento } from "./pages/preenchimento";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Routes>
            <Route path="/" element={<Campo />} />
            <Route path="/preenchimento" element={<Preenchimento />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}
