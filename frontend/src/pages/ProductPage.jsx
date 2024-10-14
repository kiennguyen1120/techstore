import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Image, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${params.id}`);
      setProduct(data);
    }

    fetchProduct();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              width={400}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-bold mb-4">{product.brand}</p>
            <p className="text-xl font-bold mb-4">{product.category}</p>

            <div className="flex items-center mb-4">
              <p className="text-xl font-bold mr-2">Rating:</p>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
            <p className="text-2xl font-bold mb-4">${product.price}</p>
            <div className="flex items-center mb-4">
              <p className="text-xl font-bold mr-2">Status:</p>
              <p className="text-xl  mr-2">
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <p className="mb-6">{product.description}</p>
            <div className="flex items-center space-x-4 mb-6">
              <Button
                variant="outline"
                size="icon"
                // onClick={() => updateQuantity(quantity - 1)}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                // onClick={() => updateQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" disabled={product.countInStock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>

        <Card className="mt-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {/* {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="mb-4 pb-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                      <span className="ml-2 font-bold">{review.user}</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))} */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-8">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <div className="mb-4">
                <label htmlFor="rating" className="block mb-2">
                  Rating
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-0"
                      //   onClick={() =>
                      //     setNewReview({ ...newReview, rating: star })
                      //   }
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block mb-2">
                  Comment
                </label>
                <Textarea
                  id="comment"
                  //   value={newReview.comment}
                  //   onChange={(e) =>
                  //     setNewReview({ ...newReview, comment: e.target.value })
                  //   }
                  rows={4}
                  required
                />
              </div>
              <Button type="submit">Submit Review</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default ProductPage;
