import { ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            TechStore
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-primary">
              Products
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to={"/cart"}>
              <Button variant="outline" size="icon" aria-label="Shopping Cart">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to={"/login"}>
              <Button variant="outline" size="icon" aria-label="Login">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
