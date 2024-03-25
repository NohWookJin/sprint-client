import { useEffect, useState } from "react";
import { getProfile, MainProfileItems } from "../../API/getProfile";
import Image from "../../Dummy/assets/level1.png";

const Profile = () => {
  const [profile, setProfile] = useState<MainProfileItems | null>(null);

  const onChangeBadge = (badge_name: string) => {
    switch (badge_name) {
      case "BEGINNER":
        return "bg-[#E0E349]";
      case "VIP":
        return "bg-[red]";
      default:
        return "bg-[#3A7CE1]";
    }
  };

  useEffect(() => {
    const data = getProfile();

    if (data) setProfile(data.profile);
  }, []);

  if (profile) {
    return (
      <section className="flex items-center gap-[30px] mb-[100px]">
        <div className="max-w-[180px]">
          <img className="rounded-[50%]" src={Image} alt="profile-image" />
        </div>
        <div className="flex flex-col gap-[17.5px] mb-[3px]">
          <div className="flex gap-[10px] items-center">
            <span className="font-semibold text-[22px]">
              오늘도 성장을 위해 SPRINT 해볼까요?
            </span>
            <button className="text-[14px] opacity-[0.4] mt-[2px]">
              출석하기
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-[18px] font-semibold">SPRINTER</span>
            <div className="bg-[#3A7CE1] max-w-[60px] flex items-center justify-center rounded-[12px] py-[3px]">
              <span className="text-[14px] text-[white]">
                <span className="pr-[2px]">{profile.start_with}</span>
                <span>KM</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-[18px] font-semibold">SPRINTER BADGE</span>
            <div className="flex gap-[7px] ">
              {profile.badge.map((item, index) => (
                <div
                  className={`text-[14px] text-[white] bg-[#3A7CE1] w-fit flex items-center justify-center rounded-[12px] py-[3px] px-[10px] ${onChangeBadge(
                    item
                  )}`}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Profile;
