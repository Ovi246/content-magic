import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
}

const Editor = ({ value }: EditorProps) => {
  const ReactQuillDynamic = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
      }),
    []
  );
  return (
    <ReactQuillDynamic
      className="h-[350px] bg-white whitespace-pre-wrap pb-10"
      value={value}
    />
  );
};

export default Editor;
