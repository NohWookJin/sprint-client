import { useEffect, useState } from "react";
import { getProfile, ProfileResponse } from "../../API/getProfile";
import { onChangeBadge } from "../../lib/changeBadgeColor";
import { calculateDaysSinceCreated } from "../../lib/timeFormatChange";

const badgeDescriptions: { [key: string]: string } = {
  WELCOME: "🎉 웰컴 뱃지",
  VIP: "🎉 가입일 30일 유저 뱃지",
  BEGINNER: "🎉 1일 이상 연속으로 특정 루틴 목표 달성",
  AMATEUR: "🎉 5일 이상 연속으로 특정 루틴 목표 달성",
  PRO: "🎉 10일 이상 연속으로 특정 루틴 목표 달성",
  LEGEND: "🎉 30일 이상 연속으로 특정 루틴 목표 달성",
  HUNGER: "🎉 1개 이상의 루틴 생성",
  SATIETY: "🎉 3개 이상의 루틴 생성",
  FULLNESS: "🎉 5개 이상의 루틴 생성",
};

const Profile = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [userLevel, setUserLevel] = useState("/Assets/level1.png");
  const [loading, setLoading] = useState(true);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const onChangeProfile = (user_level: string) => {
    switch (user_level) {
      case "lv1":
        return "/assets/level1.webp";
      case "lv2":
        return "/assets/level2.webp";
      case "lv3":
        return "/assets/level3.webp";
      case "lv4":
        return "/assets/level4.webp";
      default:
        return "/assets/level1.webp";
    }
  };

  const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };

  const formatLevel = (user_level: string) => {
    const levelNumber = user_level.replace("lv", "");
    return `Lv. ${levelNumber}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProfile();
      if (res) {
        setProfile(res);
        const level = onChangeProfile(res.level);
        setUserLevel(level);
        preloadImage(level);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="flex items-center gap-[30px] mb-[90px]">
      <div className="max-w-[180px] min-w-[180px] cursor-pointer relative">
        {loading ? (
          <div className="rounded-[50%] w-[180px] h-[180px] bg-gray-200 animate-pulse"></div>
        ) : (
          <>
            <img
              fetchpriority="high"
              className="rounded-[50%] w-[180px] h-[180px] shadow-blue-glow hover:shadow-blue-glow-hover transition-shadow duration-300 ease-in-out"
              src={userLevel}
              alt="profile-image"
            />
            <div className="absolute bottom-[10px] shadow-lg border border-gray-300 right-[8px] z-[99] text-white bg-[#E0E349] rounded-[50%] px-[6px] py-[9px] flex items-center justify-center">
              <span className="text-[12px]">
                {formatLevel(profile?.level as string)}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-[17.5px] mb-[10px]">
        <div className="flex gap-[10px] items-center">
          <span className="font-bold text-[18px] text-[#3A7CE1]">
            오늘도 성장을 위해 SPRINT 해볼까요?
          </span>
        </div>
        <div className="flex flex-col gap-[5px]">
          <span className="text-[18px] font-semibold">SPRINTER</span>
          <div className="border-none bg-[#3A7CE1] cursor-pointer font-bold max-w-[60px] flex items-center justify-center rounded-[12px] py-[3px] shadow-lg border border-gray-300 transform transition-all duration-300 ease-in-out hover:scale-105">
            <span className="text-[13px] text-[white]">
              <span className="pr-[2px] font-semibold">
                {calculateDaysSinceCreated(profile?.createdAt as string)}
              </span>
              <span>KM</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[5px]">
          <span className="text-[18px] font-semibold">SPRINTER BADGES</span>
          <div className="flex flex-wrap gap-[7px] max-h-[60px] relative">
            {profile?.badges && (
              <>
                {profile.badges.map((item, index) => (
                  <div
                    className={`border-none text-[13px] cursor-pointer font-bold w-fit flex items-center justify-center rounded-[12px] py-[3px] px-[10px]  ${onChangeBadge(
                      item
                    )} shadow-lg border border-gray-300 transform transition-all duration-300 ease-in-out hover:scale-105`}
                    key={index}
                    onMouseEnter={() => setHoveredBadge(item)}
                    onMouseLeave={() => setHoveredBadge(null)}
                  >
                    {item}
                  </div>
                ))}
              </>
            )}
            {hoveredBadge && (
              <div
                className="absolute whitespace-nowrap max-w-max left-[175px] bg-black text-white text-[12px] rounded py-1 px-2 mb-1"
                style={{
                  bottom:
                    profile?.badges && profile.badges.length > 4
                      ? "60px"
                      : "31px",
                }}
              >
                {badgeDescriptions[hoveredBadge]}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
