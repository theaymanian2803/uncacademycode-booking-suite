import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";

interface HeaderProps {
  onBookNowClick: () => void;
}

const Header = ({ onBookNowClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 rounded-xl gradient-bg">
              <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold gradient-text">UncAcademyCode</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("process")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Book Session
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              FAQ
            </button>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={onBookNowClick}
              className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity font-semibold px-6"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("process")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Book Session
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                FAQ
              </button>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                About Us
              </Link>
              <Button
                onClick={() => {
                  onBookNowClick();
                  setIsMenuOpen(false);
                }}
                className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity font-semibold w-full mt-2"
              >
                Book Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
