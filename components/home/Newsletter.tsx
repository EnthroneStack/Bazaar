import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Title from "../shop/Title";

const Newsletter = () => {
  return (
    <div className="flex flex-col justify-center bg-primary-200 items-center px-4 py-20">
      <Title
        title="Join Newsletter"
        description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week."
        visibleButton={false}
      />

      <div className="w-full max-w-xl my-10 relative">
        <Input
          type="text"
          placeholder="Enter your email"
          className="rounded-full bg-slate-100 text-sm border-2 border-white ring ring-slate-200 outline-none pl-5 py-6"
        />
        <Button className="bg-primary text-white font-medium py-5 px-7 rounded-full absolute top-1/2 -translate-y-1/2 right-1 hover:scale-103 active:scale-95 transition cursor-pointer">
          Get Updates
        </Button>
      </div>
    </div>
  );
};

export default Newsletter;
