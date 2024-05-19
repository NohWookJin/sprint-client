import CategoryItem from "./CategoryItem";
import { useEffect, useState } from "react";
import { getCategory, Categories } from "../../API/routines";
import { useParams, Link, useLocation } from "react-router-dom";

const Category = () => {
  const params = useParams();
  const location = useLocation();

  const [categories, setCategories] = useState<Categories | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isNewRoutine, SetIsNewRoutine] = useState<boolean>(false);

  const onClickCategory = (category_id: number) => {
    setSelectedCategory(category_id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategory();
        if (data) setCategories(data);

        if (params.id !== undefined) {
          setSelectedCategory(Number(params.id));
          if (location.pathname.includes("detail")) {
            const splitSegments = location.pathname.split("/");
            setSelectedCategory(Number(splitSegments[2]));
          }
        }
        if (params.id === undefined) {
          setSelectedCategory(0);
        }
        if (params.id === undefined && location.pathname === "/routine/new") {
          setSelectedCategory(null);
          SetIsNewRoutine(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [params.id, location.pathname]);

  if (categories !== null) {
    return (
      <section className="flex items-center justify-between border-b border-[#d9d9d9] pb-[12px] mb-[50px]">
        <div className="flex items-center gap-[30px]">
          {categories.map((item) => (
            <CategoryItem
              key={item.id}
              item={item}
              selectedCategory={selectedCategory === item.id}
              onClickCategory={onClickCategory}
            />
          ))}
        </div>
        {categories.length <= 5 && (
          <Link to="/routine/new">
            <button
              className={`font-semibold text-[16px] ${
                isNewRoutine ? "text-[#3a7ce1]" : ""
              }`}
            >
              + 루틴 생성
            </button>
          </Link>
        )}
      </section>
    );
  }
};

export default Category;
