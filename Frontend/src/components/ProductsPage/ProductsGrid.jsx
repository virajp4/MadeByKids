import ProductGridItem from "./ProductGridItem";
import CategoryCheckbox from "../partials/CategoryCheckbox";

export default function ProductsGrid({ limit = 2, showCart = true, products }) {
  return (
    <div className="">
      <div className="px-6 my-4">
        <form className="max-w-lg mx-auto">
          <div className="flex">
            <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only ">
              Categories
            </label>
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdownBgHover"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
              type="button"
            >
              All categories{" "}
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="dropdownBgHover" className="z-10 hidden w-48 bg-white rounded-lg shadow ">
              <ul className="p-3 space-y-1 text-sm text-gray-700 " aria-labelledby="dropdownBgHoverButton">
                <CategoryCheckbox />
              </ul>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
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
      <div className="p-4 sm:px-5 sm:py-5 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((prod, idx) => {
            if (idx < limit) return <ProductGridItem key={idx} productId={prod["productId"]} {...prod} showCart={showCart} />;
          })}
        </div>
      </div>
    </div>
  );
}
