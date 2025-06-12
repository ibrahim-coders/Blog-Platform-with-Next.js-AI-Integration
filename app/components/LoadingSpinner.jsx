export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center text-center min-h-screen">
      <div className="w-8 h-8 sm:w-10 sm:h-10  border-4 border-emerald-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
