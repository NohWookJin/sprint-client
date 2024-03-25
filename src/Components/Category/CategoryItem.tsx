import type { CategoriesItem } from "../../API/getCategory";
import { useNavigate } from "react-router-dom";

interface CategoryItemProps {
  item: CategoriesItem;
  onClickCategory: (category_id: number) => void;
  selectedCategory: boolean;
}

const CategoryItem = ({
  item,
  selectedCategory,
  onClickCategory,
}: CategoryItemProps) => {
  const { name } = item;

  const navigate = useNavigate();

  const onClickedCategory = () => {
    onClickCategory(item.id);
    if (item.id === 0) {
      navigate(`/`);
    } else {
      navigate(`/routine/${item.id}`);
    }
  };

  const isSelected = selectedCategory ? "text-[#3a7ce1]" : "";

  return (
    <button
      className={`max-w-[120px] truncate text-[18px] font-semibold ${isSelected}`}
      onClick={onClickedCategory}
    >
      {name}
    </button>
  );
};

export default CategoryItem;
