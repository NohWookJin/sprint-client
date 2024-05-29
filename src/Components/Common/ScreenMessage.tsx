const ScreenMessage = () => {
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[999]">
      <div className="text-white text-center text-lg p-4 bg-black bg-opacity-70 rounded-lg">
        ✋ PC 혹은 태블릿으로 접속해주세요.
      </div>
    </div>
  );
};

export default ScreenMessage;
