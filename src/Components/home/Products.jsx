import { useLoaderData } from "react-router-dom";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { GoGitCompare } from "react-icons/go";
import { AiOutlineShopping } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/amazonSlice";

const Products = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.amazon.query);
  const { data } = useLoaderData();
  const productData = data;

  return (
    <div className="max-w-screen-2xl mx-auto grid lgl:grid-cols-4 mdl:grid-cols-3 grid-cols-1 gap-6 px-4">
      {productData
        .filter((item) => item.title.toLowerCase().includes(query))
        .map((product) => (
          <div
            key={product.id}
            className="bg-white h-auto border-[1px] border-gray-200 py-8  hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4 rounded-sm"
          >
            <span className="absolute top-2 right-2 text-xs capitalize italic text-gray-500 ">
              {product.category}
            </span>
            <div
              className="w-full h-auto flex items-center justify-center relative group"
              key={product.id}
            >
              <img
                className="w-52 h-64 object-contain"
                src={product.image}
                alt={product.title}
              />
              <ul className="w-full h-36 bg-gray-100 absolute -bottom-[159px] group-hover:bottom-0 duration-700 flex flex-col items-end justify-center gap-2 px-2 border-l border-r">
                <li className="productLi">
                  Compare{" "}
                  <span>
                    <GoGitCompare />
                  </span>
                </li>
                <li className="productLi">
                  Add to Cart{" "}
                  <span>
                    <AiOutlineShopping />
                  </span>
                </li>
                <li className="productLi">
                  View Details{" "}
                  <span>
                    <BsArrowRightCircle />
                  </span>
                </li>
                <li className="productLi">
                  Add to Wish List{" "}
                  <span>
                    <AiOutlineHeart />
                  </span>
                </li>
              </ul>
            </div>
            <div className="px-4 z-10 bg-white">
              <div className="flex items-center justify-between ">
                <h2 className="tracking-wide text-md text-amazon_blue font-medium font-sans">
                  {product.title.substring(0, 20)}
                </h2>
                <p className="text-sm">${product.price}</p>
              </div>
              <div>
                <p className="text-xs leading-4 mt-1">
                  {product.description.substring(0, 91)}...
                </p>
                <div className="flex mt-2">
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                </div>
              </div>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      description: product.description,
                      price: product.price,
                      category: product.category,
                      image: product.image,
                      quantity: 1,
                    })
                  )
                }
                className="w-full text-base font-medium bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-200 hover:to-yellow-500  py-1.5 rounded-md mt-3"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
