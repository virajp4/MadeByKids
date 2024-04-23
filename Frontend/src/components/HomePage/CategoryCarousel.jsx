import { useEffect, useState } from "react";

function CarouselItem({ name }) {
  return (
    <div className="hover:cursor-pointer duration-700 ease-in-out flex justify-center items-center rounded-lg px-3 py-3 shadow-md shadow-black	">
      <div className="block w-full text-black text-center">{name}</div>
    </div>
  );
}

export default function CategoryCarousel({ visibleItems }) {
  const categories = ["Embroidery", "Decor", "Gifts", "Jewellery", "Books", "Crafts", "Fashion", "Music", "Clothing", "Sports"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [curr, setCurr] = useState([]);

  const updateCurr = () => {
    const items = [];
    for (let i = 0; i < visibleItems; i++) {
      items.push(categories[(currentIndex + i) % categories.length]);
    }
    setCurr(items);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  useEffect(() => {
    updateCurr();
  }, [currentIndex]);

  return (
    <>
      <div id="controls-carousel" className="relative my-2">
        <div className="relative h-10 p-1 overflow-hidden rounded-lg flex justify-evenly">
          {curr.map((category, idx) => (
            <CarouselItem key={idx} name={category} />
          ))}
        </div>
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
    </>
  );
}
