import type { CategoriesItem } from "../../API/routines";
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
  const { name, routineType, id } = item;

  const navigate = useNavigate();

  const onClickedCategory = () => {
    onClickCategory(item.id);
    if (item.id === 0) {
      navigate(`/`);
    } else {
      navigate(`/routine/${item.id}`, { state: { routineType, id } });
    }
  };

  const isSelected = selectedCategory ? "text-[#3a7ce1]" : "";

  return (
    <button
      className={`text-[16.5px] font-semibold ${isSelected}`}
      onClick={onClickedCategory}
    >
      {name}
    </button>
  );
};

export default CategoryItem;
