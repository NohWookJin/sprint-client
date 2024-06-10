import { useEffect, useRef } from "react";
import ChatBot from "react-chatbotify";

interface Params {
  userInput: string;
  injectMessage: (message: string) => Promise<void>;
}

const Chatbot = () => {
  const helpOptions = [
    "회원정보 조회/변경",
    "레벨 올리기",
    "프로필 이미지 변경",
    "루틴 생성",
    "루틴 수정",
    "루틴 삭제",
    "기타",
  ];

  const flow = {
    start: {
      message:
        "SPRINT 챗봇입니다. 도움이 필요하신가요? 아래에서 궁금한 점을 눌러주세요.",
      options: helpOptions,
      path: "process_options",
    },
    show_options: {
      message: "도움이 필요하신 주제를 선택해주세요:",
      options: helpOptions,
      path: "process_options",
    },
    prompt_again: {
      message: "다른 도움이 필요하신가요?",
      options: helpOptions,
      path: "process_options",
    },
    unknown_input: {
      message: "죄송해요, 이해하지 못했어요 😢! 다른 주제를 선택해 주세요.",
      options: helpOptions,
      path: "process_options",
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params: Params) => {
        let responseMessage = "";
        switch (params.userInput) {
          case "회원정보 조회/변경":
            responseMessage =
              "현재 회원정보를 조회, 변경할 수 있는 방법은 없어요. 추후 업데이트될 예정이에요.";
            break;
          case "레벨 올리기":
            responseMessage =
              "레벨은 루틴을 열심히 하다보면 얻게 되는 뱃지의 개수에 따라 올라가도록 설정되어 있어요!";
            break;
          case "프로필 이미지 변경":
            responseMessage =
              "프로필 이미지는 따로 설정할 수 없어요. 대신 레벨에 따라 이미지가 변경되도록 되어 있으니 기대해주세요.";
            break;
          case "루틴 생성":
            responseMessage =
              "루틴은 카테고리(전체)의 우측 상단의 루틴 생성 버튼을 통해 만들 수 있어요. 대신 루틴이 5개 만들어진다면, 생성 버튼이 사라지니 주의해주세요. (5개 루틴일 때, 1개를 삭제하면 다시 생성 버튼 활성화돼요)";
            break;
          case "루틴 수정":
            responseMessage =
              "홈페이지의 제일 상단 루틴 설정을 통해 루틴의 이름을 변경할 수 있어요.";
            break;
          case "루틴 삭제":
            responseMessage =
              "홈페이지의 제일 상단 루틴 설정을 통해 루틴을 삭제할 수 있어요. 한 번 삭제되면 복구할 수 없으니 주의해주세요.";
            break;
          case "기타":
            responseMessage =
              "jinn98@kakao.com 메일로 문의 사항을 주세요. 빠른 시일 내로 답변 드릴게요.";
            break;
          default:
            return "unknown_input";
        }
        await params.injectMessage(responseMessage);
        return "prompt_again";
      },
    },
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  });

  return (
    <div
      ref={chatContainerRef}
      style={{ height: "500px", overflowY: "scroll" }}
    >
      <ChatBot
        options={{
          theme: { embedded: false },
          chatHistory: { storageKey: "example_faq_bot" },
          header: { title: "SPRINT 챗봇", avatar: "/assets/level1.webp" },
          notification: { disabled: true },
          tooltip: { text: "궁금한 점이 있으신가요?" },
          chatButton: {
            icon: "/assets/level1.webp",
          },
        }}
        flow={flow}
      />
    </div>
  );
};

export default Chatbot;
