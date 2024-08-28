"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contentTemplates } from "@/lib/content-templates";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import Editor from "./_components/rich-editor";
import { chatSession } from "@/lib/gemini-ai";
import axios from "axios";

interface templateSlugProps {
  templateSlug: string;
}
const TemplatePage = ({ params }: { params: templateSlugProps }) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [aiOutput, setAiOutput] = useState<string>("");
  const selectedTemplate = contentTemplates.find(
    (item) => item.slug === params.templateSlug
  );

  if (!selectedTemplate) {
    return <Loader />;
  }

  const generateContentAI = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const dataset = {
        title: formData.get("title"),
        description: formData.get("description"),
      };

      const selectedPrompt = selectedTemplate.aiPrompt;

      const finalPrompt = JSON.stringify(dataset) + "," + selectedPrompt;

      const result = await chatSession.sendMessage(finalPrompt);

      setAiOutput(result.response.text());

      setIsLoading(false);

      const result1 = await axios.post("/api/generate", {
        title: dataset.title,
        description: result.response.text(),
        templateUsed: selectedTemplate,
      });

      console.log(result1);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (formData: FormData) => {
    generateContentAI(formData);
  };

  return (
    <div className="mx-5 py-2">
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <h2 className="font-medium">{selectedTemplate.name}</h2>
      </div>
      <form action={onSubmit}>
        {selectedTemplate.form.map((form) => {
          return (
            <div
              key={selectedTemplate.slug}
              className="flex flex-col gap-4 p-5 mt-5 bg-white"
            >
              <label>{form.label}</label>
              {form.field === "input" ? (
                <div className="mt-5">
                  <Input name="title" />
                </div>
              ) : (
                <div className="mt-5">
                  <Textarea name="description" />
                </div>
              )}
            </div>
          );
        })}
        <Button className="mt-5" type="submit">
          {isLoading ? <Loader className="animate-spin" /> : "Generate Content"}
        </Button>
      </form>

      <div className="my-10">
        <Editor value={isLoading ? "Generating " : aiOutput} />
      </div>
    </div>
  );
};

export default TemplatePage;
