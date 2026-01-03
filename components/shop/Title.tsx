import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
type TitleProps = {
  title: string;
  description?: string;
  visibleButton?: boolean;
  href?: string;
};

const Title = ({
  title,
  description,
  visibleButton = false,
  href = "",
}: TitleProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
      <Link
        href={href}
        className="flex items-center gap-5
       text-sm mt-2 text-slate-600"
      >
        <p className="max-w-lg text-center">{description}</p>
        {visibleButton && (
          <Button
            variant="link"
            className="text-[#0d97d9] flex items-center gap-1 cursor-pointer hover:text-[#0b80ba]"
          >
            View more <ArrowRight size={14} />
          </Button>
        )}
      </Link>
    </div>
  );
};

export default Title;
