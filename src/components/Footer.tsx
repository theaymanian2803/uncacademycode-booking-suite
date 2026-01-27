import { Link } from "react-router-dom";
import { Code2, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gradient-bg">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">UncAcademyCode</span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Premium SaaS templates and custom development solutions to bring your vision to life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Book Session
              </button>
              <button
                onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                FAQ
              </button>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="mailto:uncacademycode@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                uncacademycode@gmail.com
              </a>
              <a
                href="mailto:sberechou@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                sberechou@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} UncAcademyCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
