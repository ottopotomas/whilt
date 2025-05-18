import CommentSection from "../../../components/CommentSection";

type Props = {
  params: {
    id: string;
  };
};

export default function TilPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="p-4">
      <CommentSection tilId={id} />
    </div>
  );
}
