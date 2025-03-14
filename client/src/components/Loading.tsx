export default function Loading({ height }: { height: string }) {
  return (
    <div className={`${height} flex items-center justify-center`}>
      <span className="loading loading-ring loading-lg" />
    </div>
  );
}
