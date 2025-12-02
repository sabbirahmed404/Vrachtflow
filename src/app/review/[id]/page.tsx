export default function ReviewPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Review Page {params.id}</h1>
    </div>
  );
}
