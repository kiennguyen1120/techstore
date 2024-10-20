import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../actions/cartActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CreditCard,
  Image,
  ImageMinus,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const CartPage = () => {
  const params = useParams();
  const productId = params.id;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //   console.log(queryParams);

  const quantity = Number(queryParams.get("quantity"));
  //   console.log(quantity);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const checkoutHandler = () => {
    console.log("Checkout");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell>
                      <Link to={`/products/${item.product}`}>
                        <img
                          src={`http://127.0.0.1:8000${item.image}`}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                      </Link>
                    </TableCell>

                    <TableCell className="font-medium">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            item.quantity > 1 &&
                            dispatch(
                              updateQuantity(item.product, item.quantity - 1)
                            )
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1" // Số lượng tối thiểu là 1
                          value={item.quantity}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value >= 1) {
                              dispatch(updateQuantity(item.product, value)); // Dispatch action thay đổi số lượng
                            }
                          }}
                          className="w-16 text-center"
                          aria-label={`Quantity of ${item.name}`}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            dispatch(
                              updateQuantity(item.product, item.quantity + 1)
                            )
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCartHandler(item.product)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <Button variant="outline" asChild>
                <Link to="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-2xl font-bold mb-4">
                Total: ${calculateTotal().toFixed(2)}
              </p>
              <Button
                size="lg"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler()}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
