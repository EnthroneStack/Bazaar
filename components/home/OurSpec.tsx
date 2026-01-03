import { ourSpecsData } from "@/assets/assets";
import Title from "../shop/Title";

const OurSpec = () => {
  return (
    <section className="px-6 max-w-6xl mx-auto py-20">
      <Title
        title="Our Specifications"
        description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-10 mt-26">
        {ourSpecsData.map((spec, index) => {
          const bgColor =
            spec.title === "Free Shipping"
              ? "bg-primary-200"
              : spec.title === "7 Days easy Return"
              ? "bg-primary-100"
              : "bg-primary-900";

          return (
            <div
              key={index}
              className={`relative h-44 px-8 flex flex-col items-center justify-center w-full ${bgColor} text-center rounded-lg group border border-primary-100`}
            >
              <div
                className={`absolute left-1/2 -top-8 transform -translate-x-1/2 h-14 w-14 flex items-center justify-center rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ease-out ${
                  spec.title === "Free Shipping"
                    ? "bg-primary-900"
                    : spec.title === "7 Days easy Return"
                    ? "bg-primary-200"
                    : "bg-primary-100"
                }`}
              >
                <spec.icon className="text-white" size={26} />
              </div>

              <h3 className="text-slate-400 font-medium">{spec.title}</h3>
              <p className="text-sm text-white mt-3">{spec.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurSpec;
