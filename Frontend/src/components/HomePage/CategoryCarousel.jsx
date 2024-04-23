
function CarItem({ name }) {
  return <div className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-black text-center">{name}</div>;
}

function CarouselItem({ name }) {
  return (
    <div className="hidden duration-700 ease-in-out" data-carousel-item>
      <div className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-black text-center">{name}</div>
    </div>
  );
}

export default function CategoryCarousel() {
  const categories = ["Embroidery", "Decor", "Gifts", "Jewellery", "Books", "Crafts", "Fashion", "Music", "Clothing", "Sports", "Crafts"];
  return (
    <>
      <div id="controls-carousel" className="relative my-2" data-carousel="static">
        <div className="relative h-8 overflow-hidden rounded-lg md:h-96">
          {categories.map((category, idx) => (
            <CarouselItem key={idx} name={category} />
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-2 h-2 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-2 h-2 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
}
