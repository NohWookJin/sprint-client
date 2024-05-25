import { useNavigate } from "react-router-dom";
import Reveal from "./Reveal";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-[60px]">
      <div>
        <Reveal>
          <h1 className="font-bold text-[45px] pb-[5px]">
            루틴 관리 서비스, <span className="text-[#3a7ce1]">SRPINT</span>
          </h1>
        </Reveal>
        <Reveal>
          <h2 className="text-[25px] font-semibold pb-[20px]">
            <span className="text-[#3a7ce1]">SPRINT</span>를 통해 블로그와
            투두리스트를 이용해보세요.
          </h2>
        </Reveal>
        <Reveal>
          <p>
            스프린트를 사용해 반복되는 루틴을 생성하고, 분석을 통해 성장할 수
            있어요. 🏃
          </p>
        </Reveal>
        <div className="pt-[30px]">
          <Reveal>
            <button
              onClick={() => navigate("/login")}
              className="px-[20px] py-[10px]  shadow-2xl transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 rounded-[8px] bg-[#3a7ce1] text-white"
            >
              SPRINT →
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
