import { useEffect, useState, useRef } from "react";

function CarouselItem({ name }) {
  return (
    <div className="inline-block px-3">
      <div className="w-32 h-8 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out text-sm flex justify-center items-center">
        {name}
      </div>
    </div>
  );
}

export default function CategoryCarousel() {
  const categories = ["Embroidery", "Decor", "Gifts", "Clothing", "Accessories", "Art", "Crafts", "Toys"];

  const [curr, setCurr] = useState([]);
  const carouselRef = useRef(null);

  const updateCurr = () => {
    const items = [];
    for (let i = 0; i < categories.length * 1; i++) {
      items.push(categories[i % categories.length]);
    }
    setCurr(items);
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 150; // Adjust the value as needed
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 150; // Adjust the value as needed
    }
  };

  useEffect(() => {
    updateCurr();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div id="controls-carousel" className="relative my-2 w-[60%]">
        <div className="flex overflow-x-auto py-4 scroll-smooth" style={{ scrollbarWidth: "none" }} ref={carouselRef}>
          <div className="flex flex-nowrap lg:mx-20 mx-8">
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
              onClick={handlePrev}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-1 group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            {curr.map((category, index) => (
              <div key={index} className="inline-block px-1 md:px-3">
                <CarouselItem name={category} />
              </div>
            ))}
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
              onClick={handleNext}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-1 group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
