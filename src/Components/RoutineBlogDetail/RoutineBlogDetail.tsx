import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RoutineBlogDetailBlog from "./RoutineBlogDetailBlog";
// import RoutineTodoDetailAnalysis from "../RotineTodoDetail/RoutineTodoDetailAnalysis";
import RoutineBlogDetailPast from "./RoutineBlogDetailPast";

import { getRoutineBlog, Response } from "../../API/getRoutineBlog";

interface RoutineBlogDetailProps {
  routineId: number;
}

const RoutineBlogDetail = ({ routineId }: RoutineBlogDetailProps) => {
  const [data, setData] = useState<Response | null>(null);

  const navigate = useNavigate();

  const onClickNewItem = () => {
    navigate(`/routine/${routineId}/new`, { state: { routineId } });
  };

  useEffect(() => {
    const res = getRoutineBlog();
    setData(res);
    // getRoutineTodo(routineId);  추후 API
  }, [routineId]);

  if (data) {
    return (
      <section>
        <h1 className="text-[28px] font-bold text-[#3A7CE1] pb-[5px]">
          {data.name}
        </h1>
        <div className="pb-[20px] font-semibold text-[20px]">
          <div className="flex justify-between items-center">
            <span>{data.date}, 오늘의 블로그</span>
            <span
              onClick={onClickNewItem}
              className="text-[16px] cursor-pointer mt-[-3px]"
            >
              + 작성하기
            </span>
          </div>
        </div>
        <RoutineBlogDetailBlog blog={data.blog} routineId={routineId} />
        {/* <RoutineTodoDetailAnalysis name={data.name} analysis={data.analysis} /> */}
        <RoutineBlogDetailPast
          name={data.name}
          past={data.past}
          routineId={routineId}
        />
      </section>
    );
  }
};

export default RoutineBlogDetail;
