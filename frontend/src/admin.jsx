import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav";

function Admin() {
  const [product, setproduct] = useState({
    name: "",
    price: "",
    image: null,
    quantity: "",
    color: "#000000",
    items: "default",
  });

  const navigate = useNavigate();

  function change(e) {
    const { name, value } = e.target;
    setproduct({ ...product, [name]: value });
  }

  async function postdata(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("items", product.items);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("image", product.image);
    formData.append("color", product.color);

    await axios.post("http://localhost:5000/addprod", formData, {
      withCredentials: true,
    });
  }

  useEffect(() => {
    async function isadmin() {
      try {
        const res = await axios.post(
          "http://localhost:5000/isadmin",
          "heyy",
          { withCredentials: true }
        );
        if (res.data == "user doesnt exist") {
          navigate("/");
        }
      } catch (err) {
        navigate("/");
      }
    }
    isadmin();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-x-hidden">
      {/* NAV */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0F1C]/80 backdrop-blur-xl">
        <Nav />
      </div>

      <div className="px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto max-w-[1500px]">
          {/* TOP SECTION */}
          <div className="mb-6 sm:mb-8">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-sky-300/75">
              Admin Panel
            </p>

            <h1 className="mt-1.5 sm:mt-2 text-[1.6rem] sm:text-3xl lg:text-[2.2rem] font-semibold tracking-[-0.03em] text-white">
              Add new product
            </h1>
          </div>

          {/* MAIN LAYOUT */}
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-6 xl:gap-8 items-start">
            {/* FORM CARD */}
            <div className="rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 lg:p-7 border border-white/10 bg-[#10182B] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white">
                  Product Details
                </h2>
                <p className="mt-2 text-sm text-white/55">
                  Fill the information below to add a new drink to your store.
                </p>
              </div>

              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                encType="multipart/form-data"
                onSubmit={postdata}
              >
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/35">
                    Product Name
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#0C1324] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                    type="text"
                    name="name"
                    onChange={change}
                    placeholder="Enter product name"
                    value={product.name}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/35">
                    Price
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#0C1324] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    onChange={change}
                    value={product.price}
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/35">
                    Quantity
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#0C1324] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    onChange={change}
                    value={product.quantity}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/35">
                    Category
                  </label>
                  <select
                    className="w-full rounded-2xl border border-white/10 bg-[#0C1324] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                    name="items"
                    onChange={change}
                    value={product.items}
                  >
                    <option value="default">Select category</option>
                    <option value="energy drink">energy drink</option>
                    <option value="soft drinks">soft drinks</option>
                    <option value="cold drinks">cold drinks</option>
                    <option value="no suger">no suger</option>
                    <option value="premium range">premium range</option>
                  </select>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/35">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0C1324] px-4 py-3">
                    <input
                      className="h-10 w-14 cursor-pointer rounded-lg border-none bg-transparent p-0"
                      type="color"
                      onChange={change}
                      name="color"
                      value={product.color}
                    />
                    <span className="text-sm text-white/55">{product.color}</span>
                  </div>
                </div>

                {/* Upload */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/35">
                    Product Image
                  </label>

                  <div className="rounded-2xl border border-dashed border-white/15 bg-[#0C1324] px-4 py-5">
                    <input
                      className="w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#0A0F1C]"
                      type="file"
                      onChange={(e) =>
                        setproduct({ ...product, image: e.target.files[0] })
                      }
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="md:col-span-2 pt-2">
                  <button className="w-full rounded-[18px] bg-white px-5 py-3.5 text-sm font-semibold text-[#0A0F1C] transition hover:bg-sky-100">
                    Submit Product
                  </button>
                </div>
              </form>
            </div>

            {/* SIDE PREVIEW PANEL */}
            <div className="rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 border border-white/10 bg-[#10182B] shadow-[0_18px_50px_rgba(0,0,0,0.28)] xl:sticky xl:top-28">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-sky-300/75">
                Preview
              </p>

              <h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white">
                Product Summary
              </h2>

              <div className="mt-6 rounded-[24px] overflow-hidden border border-white/10 bg-[#0C1324]">
                {/* IMAGE PREVIEW */}
                <div className="h-[240px] flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.10),_transparent_35%),linear-gradient(180deg,#0E1628_0%,#10182B_100%)]">
                  {product.image ? (
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="preview"
                      className="max-h-full max-w-full object-contain p-6"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full flex items-center justify-center text-xs font-medium bg-white/5 border border-white/10 text-white/50">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">
                    {product.name || "Product name"}
                  </h3>

                  <p className="mt-2 text-sm capitalize text-white/55">
                    {product.items === "default" ? "Category" : product.items}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl font-bold bg-gradient-to-r from-white via-sky-200 to-violet-300 bg-clip-text text-transparent">
                      ₹ {product.price || "0"}
                    </p>

                    <span className="rounded-full px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 text-white/70">
                      Qty: {product.quantity || 0}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                      Selected Color
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full border border-white/10"
                        style={{ backgroundColor: product.color }}
                      />
                      <span className="text-sm text-white/55">
                        {product.color}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/55">
                This panel gives a quick visual summary of the product before
                submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;