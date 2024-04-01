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
}: RoutineBlogDetailViewProps) => {
  return (
    <section>
      <div className="flex flex-col gap-[10px]">
        <h1 className="font-semibold text-[34px]">{title}</h1>
        <span className="opacity-[0.6]">{date}</span>
      </div>
      <div
        className="mt-[50px]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

export default RoutineBlogDetailView;
