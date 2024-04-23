const prods = [
  {
    name: "Product 1",
    price: "10.99",
  },
  {
    name: "Product 2",
    price: "20.99",
  },
  {
    name: "Product 3",
    price: "30.99",
  },
  {
    name: "Product 4",
    price: "40.99",
  },
];

const categories = [
  "Embroidery",
  "Decor",
  "Gifts",
  "Jewellery",
  "Books",
  "Crafts",
  "Fashion",
  "Music",
  "Clothing",
  "Sports",
  "Crafts",
];

function Cats({ name }) {
  return (
    <li>
      <button
        type="button"
        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {name}
      </button>
    </li>
  );
}

function Product({ name, price }) {
  return (
    <>
      <article className="relative">
        <div className="aspect-square overflow-hidden bg-black"></div>
        <div className="mt-4 flex items-start justify-between">
          <div className="">
            <h3 className="text-xs font-semibold sm:text-sm md:text-base">
              <a href="#" title="" className="cursor-pointer">
                {name}
                <span className="absolute" aria-hidden="true"></span>
              </a>
            </h3>
          </div>
          <div className="text-right">
            <p className="text-xs font-normal sm:text-sm md:text-base">
              ${price}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export default function ProductsGrid({ limit }) {
  return (
    <div className="">
      <div className="px-6 mb-3">
        <form className="max-w-lg mx-auto">
          <div className="flex">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Your Email
            </label>
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
            >
              All categories{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {categories.map((c, idx) => (
                  <Cats key={idx} name={c} />
                ))}
              </ul>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <section className="bg-white pt-2 pb-6 text-gray-700 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {prods.map((prod, idx) => {
              if (idx < limit) return <Product key={idx} {...prod} />;
            })}
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center">
        <div className=" w-50 px-16 py-3 bg-yellow-300 border border-0.5 border-black rounded-full">
          Start Shopping
        </div>
      </div>
    </div>
  );
}
