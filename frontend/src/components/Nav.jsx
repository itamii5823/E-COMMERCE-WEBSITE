import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Products", path: "/prod" },
    { name: "Search", path: "/search" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <div className="px-3 sm:px-5 lg:px-8 py-3">
      <nav className="w-full max-w-[1500px] mx-auto rounded-[20px] sm:rounded-[24px] border border-white/10 bg-[#10182B]/85 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          {/* Logo */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => navigate("/prod")}
              className="text-left"
            >
              <h1 className="text-[1.2rem] sm:text-[1.55rem] font-semibold tracking-[-0.03em] text-white">
                Drinkstore
              </h1>
              <p className="mt-0.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-sky-300/70">
                Premium beverages
              </p>
            </button>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`shrink-0 rounded-full px-4 sm:px-5 py-2.5 text-[12px] sm:text-sm font-medium transition-all duration-300 border
                    ${
                      active
                        ? "bg-white text-[#0A0F1C] border-white shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                        : "bg-white/[0.04] text-white/75 border-white/10 hover:bg-white/[0.08] hover:text-white"
                    }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;