import axios from "axios";
import React, { useState } from "react";
import Nav from "./components/nav";

function Search() {
  const [search, newsearch] = useState("");
  const [prod, setprod] = useState("");
  const [quant, setquant] = useState(1);

  async function datasend(e) {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/search",
      { search },
      { withCredentials: true }
    );
    setprod(res.data);
  }

  async function button(e, prodid) {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/addtosearch",
      { prod, quant },
      { withCredentials: true }
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-x-hidden">
      {/* NAV */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0F1C]/80 backdrop-blur-xl">
        <Nav />
      </div>

      <div className="px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto max-w-[1400px]">
          {/* TOP SECTION */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-sky-300/75">
                Search
              </p>
              <h1 className="mt-1.5 sm:mt-2 text-[1.6rem] sm:text-3xl lg:text-[2.2rem] font-semibold tracking-[-0.03em] text-white">
                Find your drink
              </h1>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="rounded-[22px] sm:rounded-[28px] border border-white/10 bg-[#10182B]/80 p-3 sm:p-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <form
              className="flex items-center gap-2 sm:gap-3"
              onSubmit={datasend}
            >
              <div className="flex-1 flex items-center rounded-[18px] sm:rounded-[22px] border border-white/10 bg-white/[0.04] px-3 sm:px-5 py-2.5 sm:py-3.5">
                <img
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain opacity-60 mr-3"
                  src="/search.png"
                  alt="search"
                />

                <input
                  className="w-full bg-transparent outline-none text-sm sm:text-base text-white placeholder:text-white/35"
                  type="text"
                  placeholder="Search drinks..."
                  value={search}
                  onChange={(e) => newsearch(e.target.value)}
                />
              </div>

              <button className="shrink-0 rounded-[18px] sm:rounded-[22px] bg-white px-4 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-[#0A0F1C] transition hover:bg-sky-100">
                Search
              </button>
            </form>
          </div>

          {/* RESULT SECTION */}
          <div className="mt-8 sm:mt-10">
            {!prod ? (
              <div className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#10182B] p-8 sm:p-12 text-center">
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <img
                    className="w-7 h-7 sm:w-9 sm:h-9 object-contain opacity-60"
                    src="/search.png"
                    alt="search"
                  />
                </div>

                <h2 className="mt-5 text-lg sm:text-2xl font-semibold text-white">
                  Search for a drink
                </h2>
                <p className="mt-2 text-sm sm:text-base text-white/55 max-w-xl mx-auto">
                  Find soft drinks, cold drinks, premium beverages and more from
                  your store collection.
                </p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-full max-w-[380px] sm:max-w-[430px] group overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#10182B] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]">
                  {/* IMAGE */}
                  <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.10),_transparent_35%),linear-gradient(180deg,#0E1628_0%,#10182B_100%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-white/[0.04] to-transparent" />

                    <div className="h-[240px] sm:h-[300px] flex items-center justify-center px-5 sm:px-8 pt-10 sm:pt-12 pb-5 sm:pb-6">
                      <img
                        className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-[1.05]"
                        src={"http://localhost:5000" + prod.imageurl}
                        alt={prod.name}
                      />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 sm:p-6">
                    <div className="space-y-2">
                      <h1 className="text-[1.2rem] sm:text-[1.45rem] font-semibold tracking-[-0.02em] text-white">
                        {prod.name}
                      </h1>

                      <p className="text-[1.2rem] sm:text-[1.55rem] font-semibold bg-gradient-to-r from-white via-sky-200 to-violet-300 bg-clip-text text-transparent">
                        ₹ {prod.rate}
                      </p>
                    </div>

                    {/* QUANTITY PANEL */}
                    <div className="mt-4 sm:mt-5 rounded-[18px] sm:rounded-[22px] border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur">
                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/35">
                            Quantity
                          </p>
                        </div>

                        <input
                          className="w-full rounded-xl border border-white/10 bg-[#0C1324] px-3 py-2.5 text-center text-sm sm:text-base text-white outline-none transition focus:border-sky-400"
                          type="number"
                          value={quant}
                          onChange={(e) => setquant(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* BUTTON */}
                    <button
                      className="mt-4 sm:mt-5 w-full rounded-[16px] sm:rounded-[18px] bg-white px-5 py-3 sm:py-3.5 text-sm font-semibold text-[#0A0F1C] transition hover:bg-sky-100"
                      onClick={(e) => button(e, prod._id)}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;