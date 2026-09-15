import { FaArrowLeft } from "react-icons/fa";
import { Button } from "../../atoms";

export function BackButton  ({ onClick })  {
  return (
    <Button
      onClick={onClick}
      className="flex items-center text-purple-600 hover:text-purple-800 py-5"
    >
      <FaArrowLeft className="mr-2" />
      Geri Dön
    </Button>
  );
};

