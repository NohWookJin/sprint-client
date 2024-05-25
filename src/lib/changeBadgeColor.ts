export const onChangeBadge = (badge_name: string) => {
  switch (badge_name) {
    case "WELCOME":
      return "bg-[#E0E349] text-[#000000]";
    case "VIP":
      return "bg-[#FFD700] text-[#000000]";
    case "BEGINNER":
      return "bg-[#ADD8E6] text-[#000000]";
    case "AMATEUR":
      return "bg-[#87CEEB] text-[#000000]";
    case "PRO":
      return "bg-[#4682B4] text-[#FFFFFF]";
    case "LEGEND":
      return "bg-[#00008B] text-[#FFFFFF]";
    case "HUNGER":
      return "bg-[#FF6347] text-[#FFFFFF]";
    case "SATIETY":
      return "bg-[#FF4500] text-[#FFFFFF]";
    case "FULLNESS":
      return "bg-[#8B0000] text-[#FFFFFF]";
    default:
      return "bg-[#3A7CE1] text-[#FFFFFF]";
  }
};
