import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav";

function Cart() {
  const [product, setproduct] = useState([]);
  const [total, settotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function getdata() {
      const res = await axios.post(
        "http://localhost:5000/cart",
        "hii",
        { withCredentials: true }
      );
      console.log(res.data.total);
      setproduct(res.data.cart);
      settotal(res.data.total);
    }
    getdata();
  }, []);

  async function removeproduct(e, product) {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/addtocartr",
      { product },
      { withCredentials: true }
    );
  }

  async function checkout() {
    const res = await axios.post(
      "http://localhost:5000/checkout",
      {},
      { withCredentials: true }
    );

    const cartItems = res.data.cart;
    const total = res.data.total;

    let message = "🛒 *New Order*\n\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `Qty: ${item.quantity}\n`;
      message += `Price: ₹${item.product.rate}\n\n`;
    });

    message += `💰 *Total: ₹${total}*\n\n`;

    const url = `https://wa.me/919166967313?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = url;
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-x-hidden">
      {/* NAV */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0F1C]/80 backdrop-blur-xl">
        <Nav />
      </div>

      <div className="px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto max-w-[1500px]">
          {/* TOP SECTION */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-sky-300/75">
                Checkout
              </p>
              <h1 className="mt-1.5 sm:mt-2 text-[1.6rem] sm:text-3xl lg:text-[2.2rem] font-semibold tracking-[-0.03em] text-white">
                Your cart
              </h1>
            </div>

            <div className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm text-white/70 backdrop-blur">
              {product.length} item{product.length !== 1 ? "s" : ""}
            </div>
          </div>

          {product.length === 0 ? (
            <div className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#10182B] p-8 sm:p-12 text-center">
              <h2 className="text-lg sm:text-2xl font-semibold text-white">
                Your cart is empty
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/55">
                Add some drinks to continue.
              </p>

              <button
                onClick={() => navigate("/prod")}
                className="mt-5 rounded-[16px] bg-white px-5 py-3 text-sm font-semibold text-[#0A0F1C] transition hover:bg-sky-100"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-5 xl:gap-6 items-start">
              {/* LEFT: CART ITEMS */}
              <div className="space-y-4">
                {product.map((items, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/10 bg-[#10182B] shadow-[0_14px_35px_rgba(0,0,0,0.24)]"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* IMAGE */}
                      <div className="relative w-full sm:w-[180px] border-b sm:border-b-0 sm:border-r border-white/10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.10),_transparent_35%),linear-gradient(180deg,#0E1628_0%,#10182B_100%)]">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent" />

                        <div className="h-[170px] sm:h-[170px] flex items-center justify-center px-4 py-4">
                          <img
                            className="max-h-full max-w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.32)]"
                            src={"http://localhost:5000" + items.product.imageurl}
                            alt={items.product.name}
                          />
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 p-4 sm:p-5">
                        <div className="flex h-full flex-col justify-between gap-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <h2 className="text-[1.05rem] sm:text-[1.25rem] font-semibold tracking-[-0.02em] text-white">
                                {items.product.name}
                              </h2>

                              <p className="mt-2 text-sm text-white/55">
                                Quantity: {items.quantity}
                              </p>
                            </div>

                            <div className="shrink-0">
                              <p className="text-[1.05rem] sm:text-[1.3rem] font-semibold bg-gradient-to-r from-white via-sky-200 to-violet-300 bg-clip-text text-transparent">
                                ₹ {items.product.rate}
                              </p>
                            </div>
                          </div>

                          {/* ACTION ROW */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-[16px] sm:rounded-[18px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
                            <div>
                              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/35">
                                Cart Item
                              </p>
                              <p className="mt-1 text-xs sm:text-sm text-white/55">
                                Ready to remove or continue checkout
                              </p>
                            </div>

                            <button
                              onClick={(e) => removeproduct(e, items.product._id)}
                              className="w-full sm:w-auto rounded-[14px] bg-[#ef4444] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#dc2626]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: SUMMARY */}
              <div className="xl:sticky xl:top-28">
                <div className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#10182B] p-5 sm:p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-sky-300/75">
                    Order Summary
                  </p>

                  <h2 className="mt-2 text-2xl sm:text-[2rem] font-semibold tracking-[-0.03em] text-white">
                    Total
                  </h2>

                  <div className="mt-6 rounded-[20px] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Cart value</span>
                      <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-sky-200 to-violet-300 bg-clip-text text-transparent">
                        ₹ {total}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={checkout}
                    className="mt-6 w-full rounded-[18px] bg-white px-5 py-3.5 text-sm font-semibold text-[#0A0F1C] transition hover:bg-sky-100"
                  >
                    Checkout
                  </button>

                  <p className="mt-4 text-xs sm:text-sm text-white/45 leading-6">
                    Your order summary will be prepared and sent through
                    WhatsApp checkout.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;