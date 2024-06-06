import { useEffect, useState } from "react";
import { Analysis, getAnalysisAll } from "../../API/getAnalysis";
import { useNavigate } from "react-router-dom";
import AnalysisItem from "./AnalysisItem";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

const AnalysiBox = () => {
  const [analysisData, setAnalysisData] = useState<Analysis[] | null>(null);

  const navigate = useNavigate();

  const isDark = useRecoilValue(themeState);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAnalysisAll();

      if (res) setAnalysisData(res);
    };

    fetchData();
  }, []);

  return (
    <section className="pb-8 mb-[20px]">
      <div className="font-bold pb-[10px]">
        <span className={`text-[23px] ${isDark ? "dark: text-white" : ""}`}>
          스프린터님의 루틴 기록이에요
        </span>
      </div>
      {analysisData === null || analysisData.length === 0 ? (
        <div
          onClick={() => navigate(`/routine/new`)}
          className="cursor-pointer"
        >
          <span
            className={`text-[15px] font-bold opacity-[0.6] ${
              isDark ? "dark: text-white" : ""
            }`}
          >
            아직 루틴이 없어요. 생성하시겠어요? 🖱️
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-5">
          {analysisData.map((item, index) => (
            <AnalysisItem key={index} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AnalysiBox;
