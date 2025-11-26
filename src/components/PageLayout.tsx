import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="flex-grow pt-16"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default PageLayout;
