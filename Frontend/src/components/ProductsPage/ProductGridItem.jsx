import { Link, useRouteLoaderData } from "react-router-dom";
import CartButton from "../partials/CartButton";
import product2 from "../../assets/product2.jpg";

export default function ProductGridItem({ product, showCart = true }) {
  const token = useRouteLoaderData("root");
  const { productName, productPrice, productId } = product;
  return (
    <div className="">
      <Link to={`/shop/${productId}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80">
          <img
            src={product2}
            alt="Front of men&#039;s Basic Tee in black."
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
      </Link>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className=""></span>
            {productName}
          </h3>
          <p className="mt-1 text-sm text-gray-500">Black</p>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{productPrice}</p>
      </div>
      {showCart && token && <CartButton productId={productId} />}
    </div>
  );
}
