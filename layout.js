import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "Education", path: createPageUrl("Education") },
    { name: "Disaster Prediction", path: createPageUrl("DisasterPrediction") },
    { name: "Gallery", path: createPageUrl("Gallery") }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">🌍</span>
              </div>
              <div>
                <h1 className="text-white text-lg font-light tracking-wider">ISS CUPOLA</h1>
                <p className="text-cyan-400 text-xs">Observatory System</p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-1 backdrop-blur-sm bg-white/5 rounded-full p-1 border border-white/10">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`px-6 py-2 rounded-full text-sm font-light tracking-wide transition-all ${
                        isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white/90"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-2 text-white/60 text-sm"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-light">Live</span>
            </motion.div>

            <div className="md:hidden flex flex-col gap-1">
              <div className="w-6 h-0.5 bg-white/70" />
              <div className="w-6 h-0.5 bg-white/70" />
              <div className="w-6 h-0.5 bg-white/70" />
            </div>
          </div>
        </div>

        <div className="md:hidden border-t border-white/10 bg-black/50">
          <div className="flex justify-around py-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-xs font-light ${
                    isActive ? "text-cyan-400" : "text-white/60"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}