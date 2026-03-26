import ornamentImg from "@/assets/arabic-ornament.png";

const OrnamentDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full flex justify-center my-6 ${className}`}>
    <img
      src={ornamentImg}
      alt=""
      className="w-full max-w-2xl h-8 object-contain opacity-60"
      loading="lazy"
      width={800}
      height={32}
    />
  </div>
);

export default OrnamentDivider;
