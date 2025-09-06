const BackgroundFooter = () => {
  return (
    <div className="relative text-blue-300 overflow-hidden">
      {/* Faint Background Text */}
      <div className="flex justify-center items-center z-0 pointer-events-none">
        <h1 className="text-blue-300/70 text-[8vw] font-bold  leading-none whitespace-nowrap text-center">
          NURTURE CHILDCARE
        </h1>
      </div>

      {/* Overlayed Copyright */}
      <div className=" z-10 flex flex-col justify-center items-center ">
        <span className="bg-white/10 backdrop-blur-md text-md px-4 py-2 rounded-full font-medium text-slate-600">
          © 2025 Nurture Childcare. All Rights Reserved.
        </span>
        <span className="bg-white/10 backdrop-blur-md text-sm px-4 rounded-full font-medium text-slate-600">
          Designed with <span className="text-red-500">❤</span> by Vedic Vaibhav
        </span>
      </div>
    </div>
  );
};

export default BackgroundFooter;
