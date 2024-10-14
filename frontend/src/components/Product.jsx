import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";

const Product = ({ product }) => {
  return (
    <>
      <Card key={product._id} className="flex flex-col">
        <CardContent className="p-4">
          <Link to={`/products/${product._id}`}>
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          </Link>

          <h3 className="text-lg font-semibold mb-2">
            {" "}
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </h3>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />

          <p className="text-primary font-bold">${product.price}</p>
        </CardContent>
        {/* <CardFooter className="mt-auto">
          <Button className="w-full" asChild>
            <Link to={`/product/${product._id}`}>View Details</Link>
          </Button>
        </CardFooter> */}
      </Card>
    </>
  );
};
export default Product;
