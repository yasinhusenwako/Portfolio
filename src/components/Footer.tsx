import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/yasinhusenwako"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/yasin-husen-79a3a5364/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:yhusen636@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://t.me/uppdate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Telegram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.886 1.524.182.082.359.17.532.264.316-.12.617-.245.904-.373 1.407-.629 2.815-1.26 4.222-1.889 1.102-.493 2.205-.986 3.308-1.479.468-.197.94-.396 1.413-.592.116-.049.277-.13.38-.169-.003.005-.007.009-.01.013-.003.003-.005.007-.008.01l-6.782 6.782c-.395.395-.791.79-1.186 1.186-.556.556-.556 1.455 0 2.011.556.556 1.455.556 2.011 0 .395-.395.79-.791 1.186-1.186l6.782-6.782c.003-.003.007-.005.01-.008.004-.003.008-.007.013-.01-.039.103-.12.264-.169.38-.196.473-.395.945-.592 1.413-.493 1.103-.986 2.206-1.479 3.308-.629 1.407-1.26 2.815-1.889 4.222-.128.287-.253.588-.373.904.094.173.182.35.264.532.515 1.611 1.008 3.276 1.524 4.886.488.726 1.318 1.647 2.286.919.569-.483.754-1.053.901-1.473a405.15 405.15 0 0 1 1.09-2.849c.612-1.591 1.41-3.656 2.21-5.724l3.33-8.609c.137-.354.22-.708.215-1.022-.01-.607-.432-1.098-.96-1.222z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground text-center flex items-center gap-2">
              © {currentYear} Yasin Husen. Built with <Heart size={14} className="text-primary" /> and React
            </p>
            <a
              href="/admin/login"
              className="text-xs text-muted-foreground/30 hover:text-primary transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
