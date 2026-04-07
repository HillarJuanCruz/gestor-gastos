const Loading = () => {
  return (
    <div className="flex justify-center items-center ">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-second mx-auto"></div>
      <p className="mt-4 text-lg">Cargando gastos...</p>
    </div>
  </div>
  );
};

export default Loading;
