import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { editState } from "../../Store/editState";
import RoutineBlogDetailEditorEdit from "./RoutineBlogDetailEditorEdit";
import { deleteBlog } from "../../API/routinesBlog";

interface RoutineBlogDetailViewProps {
  id: number;
  title: string;
  content: string;
  date: string;
}

const RoutineBlogDetailView = ({
  title,
  content,
  date,
  id,
}: RoutineBlogDetailViewProps) => {
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

  return (
    <section>
      {isEdit ? (
        <>
          <RoutineBlogDetailEditorEdit
            routineId={ROUTINE_ID}
            contentId={id}
            title={title}
            content={content}
            date={date}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-[34px]">{title}</h1>
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
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </>
      )}
    </section>
  );
};

export default RoutineBlogDetailView;
