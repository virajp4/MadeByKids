import React from "react";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

import product3 from "../../assets/product3.jpg";
import product2 from "../../assets/product2.jpg";

export default function Product({ rating = 4 }) {
  const product = useLoaderData();

  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-6">
          <div id="default-carousel" className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center relative" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-xl md:h-96">
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src={product2}
                  alt="Product"
                  className="rounded object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                />
              </div>
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src={product3}
                  alt="Product"
                  className="rounded object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                />
              </div>
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-3 rtl:space-x-reverse">
              {["", ""].map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="w-3 h-3 rounded-full border-2"
                  aria-current="true"
                  aria-label={`Slide ${idx}`}
                  data-carousel-slide-to={idx}
                ></button>
              ))}
            </div>
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <i className="fa-solid fa-angle-left"></i>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <i className="fa-solid fa-angle-right"></i>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800">{product.productName}</h2>
            <h4 className="text-lg font-semibold text-gray-800">By <span className="underline">Vishal</span></h4>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">₹{product.productPrice}</p>
            </div>
            <div className="flex space-x-2 mt-4">
              {Array.from({ length: rating }).map((_, idx) => (
                <i key={idx} className="fa-solid fa-star"></i>
              ))}
              {Array.from({ length: 5 - rating }).map((_, idx) => (
                <i key={idx + 5} className="fa-regular fa-star"></i>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">About</h3>
              <p className="space-y-3 list-disc mt-4 text-sm text-gray-800">{product.productDetails}</p>
              <button type="button" className="w-full mt-8 px-4 py-2 bg-gray-800 text-white font-bold rounded">
                Add to cart
              </button>
            </div>
            <div className="mt-8 max-w-md">
              <h3 className="text-lg font-bold text-gray-800">Reviews(10)</h3>
              <div className="flex items-start mt-8">
                <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
                <div className="ml-3">
                  <h4 className="text-sm font-bold">Javed Malik</h4>
                  <div className="flex space-x-1 mt-1">
                    <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <p className="text-xs !ml-2 font-semibold">20 mins ago</p>
                  </div>
                  <p className="text-xs mt-4">
                    Amazing painting, I love it. The colors are so vibrant and the quality is top-notch. I would definitely recommend this to anyone
                    who is looking for a good painting to fill their wall space.
                  </p>
                </div>
              </div>
              <button type="button" className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded">
                Read all reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const prodId = params.productId;
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shop/${prodId}`);
  if (response.status !== 200) {
    throw new Error("Failed to load product");
  }
  const product = response.data.product;
  return product;
}
