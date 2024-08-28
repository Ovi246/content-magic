"use client";

import React, { useEffect, useState } from "react";
import { contentTemplates } from "@/lib/content-templates";
import TemplateCard from "./template-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FilteredButton = () => {
  const items = [
    {
      name: "All",
    },
    {
      name: "Youtube",
    },
    {
      name: "Instagram",
    },
    {
      name: "Tiktok",
    },
    {
      name: "Linkedin",
    },
    {
      name: "Tweet",
    },
  ];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {items.map((item) => (
        <Button
          onClick={() => handleSearch(item.name)}
          size="sm"
          key={item.name}
          variant="outline"
          className="mr-2"
        >
          {item.name}
        </Button>
      ))}
    </>
  );
};

const TemplateList = () => {
  const [templates, setTemplates] = useState(contentTemplates);
  const params = useSearchParams();
  const category = params.get("category");

  useEffect(() => {
    if (category === "All") {
      setTemplates(contentTemplates);
    } else if (category) {
      const filteredTemplates = contentTemplates.filter(
        (template) => template.category === category
      );
      setTemplates(filteredTemplates);
    } else {
      setTemplates(contentTemplates);
    }
  }, [category]);

  return (
    <div className="flex flex-col">
      <div className="m-5">
        <FilteredButton />
      </div>
      <div className="grid cols-1 md:grid-cols-3 gap-4 mx-5 mt-5">
        {templates.length > 0 &&
          templates.map((template) => (
            <TemplateCard template={template} key={template.name} />
          ))}
      </div>
    </div>
  );
};

export default TemplateList;
