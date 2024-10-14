import { Star, StarHalf } from "lucide-react";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1; // Tính giá trị ngôi sao hiện tại

        return (
          <span key={index}>
            {value >= starValue ? (
              <Star fill="yellow" strokeWidth={0} /> // Ngôi sao đầy
            ) : value >= starValue - 0.5 ? (
              <StarHalf fill="yellow" strokeWidth={0} /> // Ngôi sao nửa
            ) : (
              <Star fill="none" strokeWidth={0} /> // Ngôi sao rỗng
            )}
          </span>
        );
      })}
      {text && <span className="text-sm ml-2">{text}</span>}{" "}
    </div>
  );
};

export default Rating;
