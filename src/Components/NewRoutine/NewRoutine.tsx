import NewRoutineForm from "./NewRoutineForm";

const NewRoutine = () => {
  return (
    <section className="h-[100vh]">
      <h1 className="pb-[50px] text-[28px] font-bold text-[#3A7CE1]">
        루틴 생성
      </h1>
      <NewRoutineForm />
    </section>
  );
};

export default NewRoutine;
