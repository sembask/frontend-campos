import { useTheme } from "@/context/theme-provider";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-semibold">Teste Técnico</h1>

            <nav className="hidden md:flex space-x-6 ml-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Campos
              </Link>
              <Link
                to="/preenchimento"
                className="hover:text-primary transition-colors"
              >
                Preenchimentos
              </Link>
            </nav>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden ml-2"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col space-y-2 mt-2 border-t pt-2">
            <Link
              to="/"
              className="hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Campos
            </Link>
            <Link
              to="/preenchimento"
              className="hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Preenchimentos
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
