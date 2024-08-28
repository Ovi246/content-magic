import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface TemplateCardProps {
  template: {
    name: string;
    desc: string;

    icon: IconType;

    slug: string;
  };
}
const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <Link href={`/dashboard/${template.slug}`}>
      <div className="bg-white w-full rounded-lg h-[200px] py-4 px-4 text-center flex flex-col justify-center">
        <template.icon className="w-12 h-12 mx-auto"></template.icon>
        <h2 className="font-semibold mt-5">{template.name}</h2>
      </div>
    </Link>
  );
};

export default TemplateCard;
