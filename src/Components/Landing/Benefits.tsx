import { useEffect } from "react";
import Reveal from "./Reveal";

const Benefits = () => {
  const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };

  useEffect(() => {
    preloadImage("/assets/Landing/growImage.webp");
    preloadImage("/assets/todoType.webp");
    preloadImage("/assets/blogType.webp");
    preloadImage("/assets/Landing/detailAnalysisImage.webp");
    preloadImage("/assets/Landing/detailAnalysisImage2.webp");
    preloadImage("/assets/Landing/MainAnalysisImage.webp");
    preloadImage("/assets/Landing/todayRoutineImage.webp");
  }, []);

  return (
    <section className="pt-[100px] relaitve">
      <div>
        <Reveal>
          <h1 className="font-bold text-[30px]">
            😄 성장 요소와 함께 즐겨보세요
          </h1>
        </Reveal>
        <Reveal>
          <div className="w-[260px] h-[20px] right-0 absolute top-[-40px] border-b border-grey"></div>
        </Reveal>
        <Reveal>
          <div className="pt-[15px] font-semibold">
            <span>
              • 뱃지를 모아 레벨을 올려보세요. 레벨을 올리면 캐릭터가 성장해요.
            </span>
          </div>
        </Reveal>
        <Reveal>
          <div className="p-[15px] mt-[15px] border border-[1.5px] border-grey rounded-[12px] overflow-hidden">
            <img
              fetchpriority="high"
              className="object-contain"
              src="/assets/Landing/growImage.webp"
              alt="grow-image"
            />
          </div>
        </Reveal>
      </div>
      <div className="pt-[90px]">
        <Reveal>
          <h1 className="font-bold text-[30px]">✍️ 기록의 재미를 느껴보세요</h1>
        </Reveal>
        <Reveal>
          <div className="w-[300px] h-[20px] right-0 absolute top-[-40px] border-b border-grey"></div>
        </Reveal>
        <Reveal>
          <div className="pt-[15px] font-semibold">
            <span>
              • 블로그와 투두리스트를 이용해 사용자님의 루틴을 관리해보세요.
            </span>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex gap-[30px] pt-[20px]">
            <div className="border border-[1.5px] border-grey rounded-[12px] overflow-hidden">
              <img
                fetchpriority="high"
                className="w-[320px] p-[15px]"
                src="/assets/todoType.webp"
                alt="whole-todo-image"
              />
            </div>
            <div className="border border-[1.5px] border-grey  rounded-[12px] overflow-hidden">
              <img
                fetchpriority="high"
                className="w-[320px] p-[15px]"
                src="/assets/blogType.webp"
                alt="whole-blog-image"
              />
            </div>
          </div>
        </Reveal>
      </div>
      <div className="pt-[90px]">
        <Reveal>
          <h1 className="font-bold text-[30px]">🧐 분석해 드릴게요</h1>
        </Reveal>
        <Reveal>
          <div className="w-[400px] h-[20px] right-0 absolute top-[-40px] border-b border-grey"></div>
        </Reveal>
        <Reveal>
          <div className="pt-[15px] font-semibold">
            <span>• 상세 페이지에서 사용자님의 루틴을 분석해드려요.</span>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex gap-[30px] pt-[20px]">
            <div className="rounded-[6px] overflow-hidden border-[1.5px] border-grey ">
              <img
                fetchpriority="high"
                className="w-[310px] p-[15px]"
                src="/assets/Landing/detailAnalysisImage.webp"
                alt="detailAnalysisImage1"
              />
            </div>
            <div className="rounded-[6px] overflow-hidden border-[1.5px] border-grey ">
              <img
                fetchpriority="high"
                className="w-[310px] p-[15px]"
                src="/assets/Landing/detailAnalysisImage2.webp"
                alt="detailAnalysisImage2"
              />
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="pt-[20px] font-semibold">
            <span>• 메인 페이지에서 사용자님의 모든 루틴을 분석해드려요.</span>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex gap-[30px] pt-[20px]">
            <div className="rounded-[6px] overflow-hidden border-[1.5px] border-grey ">
              <img
                fetchpriority="high"
                className="w-[310px] p-[15px]"
                src="/assets/Landing/MainAnalysisImage.webp"
                alt="MainAnalysisImage"
              />
            </div>
          </div>
        </Reveal>
      </div>
      <div className="pt-[90px]">
        <Reveal>
          <h1 className="font-bold text-[30px]">
            📢 오늘 해야할 루틴을 알려드려요
          </h1>
        </Reveal>
        <Reveal>
          <div className="w-[230px] h-[20px] right-0 absolute top-[-40px] border-b border-grey"></div>
        </Reveal>
        <Reveal>
          <div className="pt-[15px] font-semibold">
            <span>• 메인페이지에서 사용자님의 오늘 루틴을 알려드려요. </span>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex gap-[30px] pt-[20px]">
            <div className="rounded-[6px] overflow-hidden border-[1.5px] border-grey ">
              <img
                fetchpriority="high"
                className="w-[310px] p-[15px]"
                src="/assets/Landing/todayRoutineImage.webp"
                alt="todayRoutineImage"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Benefits;
