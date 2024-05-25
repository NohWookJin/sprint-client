import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { editState } from "../../Store/editState";
import RoutineBlogDetailEditorEdit from "./RoutineBlogDetailEditorEdit";
import { deleteBlog } from "../../API/routinesBlog";
import { useEffect, useState } from "react";
import { BlogDetail, getRoutineBlogDetail } from "../../API/getRoutineBlog";

interface RoutineBlogDetailViewProps {
  id: number;
  title: string;
  content: string;
  date: string;
}

const RoutineBlogDetailView = ({ id, date }: RoutineBlogDetailViewProps) => {
  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null);
  const [isEdit, setIsEdit] = useRecoilState(editState);

  const { routineId } = useParams();
  const ROUTINE_ID = Number(routineId);

  const naviage = useNavigate();

  const onEditBlog = () => {
    setIsEdit(true);
  };

  const onRemoveBlog = async () => {
    const res = await deleteBlog(ROUTINE_ID, id);
    if (res) naviage(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoutineBlogDetail(ROUTINE_ID, id);

      if (res) setBlogDetail(res.blog);
    };

    fetchData();
  }, [ROUTINE_ID, id, isEdit]);

  return (
    <section>
      {isEdit && blogDetail ? (
        <>
          <RoutineBlogDetailEditorEdit
            routineId={ROUTINE_ID}
            id={blogDetail.id}
            title={blogDetail.title}
            content={blogDetail.content}
            date={date}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-[34px]">
                {blogDetail?.title as string}
              </h1>
              <div className="flex items-center gap-[7px] opacity-[0.6]">
                <span
                  className="text-[14px] cursor-pointer"
                  onClick={onEditBlog}
                >
                  수정
                </span>
                <span
                  className="text-[14px] cursor-pointer"
                  onClick={onRemoveBlog}
                >
                  삭제
                </span>
              </div>
            </div>
            <span className="opacity-[0.6]">{date}</span>
          </div>
          <div
            className="mt-[50px] pb-[100px]"
            dangerouslySetInnerHTML={{ __html: blogDetail?.content as string }}
          />
        </>
      )}
    </section>
  );
};

export default RoutineBlogDetailView;
