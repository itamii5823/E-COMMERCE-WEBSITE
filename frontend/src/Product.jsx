import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav";

function Products() {
  const navigate = useNavigate();

  const [products, setproduct] = useState([]);
  const [quantity, setquantity] = useState(1);
  const [number, setnumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "soft drinks",
    "cold drinks",
    "no suger",
    "premium range",
    "energy drinks",
  ];

  useEffect(() => {
    const getdata = async () => {
      const data = await axios.get("http://localhost:5000/getdata");
      setproduct(data.data);
    };
    getdata();
  }, []);

  async function senddata(e, prodid, quantity, num) {
    e.preventDefault();
    setnumber(number + 1);

    await axios.post(
      "http://localhost:5000/addtocart",
      {
        prodid,
        quantity,
        num,
      },
      { withCredentials: true }
    );
  }

  let filteredProducts = [];

  if (selectedCategory === "All") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter((item) => {
      return item.items === selectedCategory;
    });
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-x-hidden">
      {/* NAV */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0F1C]/80 backdrop-blur-xl">
        <Nav />
      </div>

      <div className="px-3 sm:px-5 lg:px-8 py-5 sm:py-7">
        <div className="mx-auto max-w-[1500px]">
          {/* TOP BAR */}
          <div className="mb-5 sm:mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-sky-300/75">
                Collection
              </p>
              <h1 className="mt-1.5 sm:mt-2 text-[1.6rem] sm:text-3xl lg:text-[2.2rem] font-semibold tracking-[-0.03em] text-white">
                Products
              </h1>
            </div>

            <div className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm text-white/70 backdrop-blur">
              {filteredProducts.length} products
            </div>
          </div>

          {/* CATEGORY BAR */}
          <div className="mb-6 sm:mb-8 rounded-[20px] sm:rounded-[24px] border border-white/10 bg-[#10182B]/80 p-2.5 sm:p-3 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="flex gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3.5 sm:px-5 py-2.5 text-[11px] sm:text-sm capitalize border transition-all duration-300
                  ${
                    selectedCategory === cat
                      ? "bg-white text-[#0A0F1C] border-white shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                      : "bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCTS */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#10182B] p-8 sm:p-12 text-center">
              <h2 className="text-lg sm:text-2xl font-semibold text-white">
                No products found
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/55">
                Try another category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6 xl:gap-7">
              {filteredProducts.map((items, index) => (
                <div
                  key={items._id || index}
                  className="group overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/10 bg-[#10182B] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]"
                >
                  {/* IMAGE SECTION */}
                  <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.10),_transparent_35%),linear-gradient(180deg,#0E1628_0%,#10182B_100%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-white/[0.04] to-transparent" />

                    {/* category badge */}
                    <div className="absolute left-2.5 sm:left-4 top-2.5 sm:top-4 z-10 rounded-full border border-white/10 bg-black/20 px-2 sm:px-3 py-1 text-[9px] sm:text-[11px] font-medium capitalize text-white/75 backdrop-blur max-w-[70%] truncate">
                      {items.items}
                    </div>

                    <div className="h-[150px] sm:h-[280px] lg:h-[300px] flex items-center justify-center px-3 sm:px-8 pt-10 sm:pt-14 pb-4 sm:pb-6">
                      <img
                        className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-[1.05]"
                        src={"http://localhost:5000" + items.imageurl}
                        alt={items.name}
                      />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-3 sm:p-5">
                    {/* name + price */}
                    <div className="space-y-2">
                      <div className="min-w-0">
                        <h2 className="truncate text-[0.95rem] sm:text-[1.3rem] font-semibold tracking-[-0.02em] text-white">
                          {items.name}
                        </h2>
                        <p className="mt-1 text-[11px] sm:text-sm capitalize text-white/50 truncate">
                          {items.items}
                        </p>
                      </div>

                      <p className="text-[1rem] sm:text-[1.45rem] font-semibold bg-gradient-to-r from-white via-sky-200 to-violet-300 bg-clip-text text-transparent">
                        ₹ {items.rate}
                      </p>
                    </div>

                    {/* QUANTITY PANEL */}
                    <div className="mt-3 sm:mt-4 rounded-[14px] sm:rounded-[22px] border border-white/10 bg-white/[0.04] p-2.5 sm:p-4 backdrop-blur">
                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <p className="text-[9px] sm:text-xs uppercase tracking-[0.2em] text-white/35">
                            Quantity
                          </p>
                          <p className="mt-1 text-[11px] sm:text-sm text-white/55">
                            Available: {items.quantity}
                          </p>
                        </div>

                        <input
                          className="w-full rounded-xl border border-white/10 bg-[#0C1324] px-2 sm:px-3 py-2 text-center text-sm text-white outline-none transition focus:border-sky-400"
                          type="number"
                          max={items.quantity}
                          min={1}
                          defaultValue={1}
                          onChange={(e) => {
                            setquantity(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    {/* BUTTON */}
                    <button
                      className="mt-3 sm:mt-4 w-full rounded-[14px] sm:rounded-[18px] bg-white px-3 sm:px-5 py-2.5 sm:py-3 text-[12px] sm:text-sm font-semibold text-[#0A0F1C] transition hover:bg-sky-100"
                      onClick={(e) => senddata(e, items._id, quantity, number)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;