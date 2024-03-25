import CategoryItem from "./CategoryItem";
import { useEffect, useState } from "react";
import { getCategory, Categories } from "../../API/getCategory";
import { useParams } from "react-router-dom";

const Category = () => {
  const params = useParams();

  const [categories, setCategories] = useState<Categories | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const onClickCategory = (category_id: number) => {
    setSelectedCategory(category_id);
  };

  useEffect(() => {
    if (params.id !== undefined) {
      setSelectedCategory(Number(params.id));
    } else {
      setSelectedCategory(0);
    }
    const data = getCategory();
    if (data) setCategories(data);
  }, [params.id]);

  if (categories !== null) {
    return (
      <section className="flex items-center justify-between  border-b border-[#d9d9d9] pb-[12px] mb-[50px]">
        <div className="flex items-center gap-[30px]">
          {categories.response.map((item) => (
            <CategoryItem
              key={item.id}
              item={item}
              selectedCategory={selectedCategory === item.id}
              onClickCategory={onClickCategory}
            />
          ))}
        </div>
        <div>
          <button className="font-semibold text-[16px]">+ 루틴 생성</button>
        </div>
      </section>
    );
  }
};

export default Category;
