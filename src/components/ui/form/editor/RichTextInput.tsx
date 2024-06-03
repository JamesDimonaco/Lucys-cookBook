import React, { useEffect, useState } from "react";
import RichEditor from "./RichEditor";

interface RichTextInputProps {
  name: string;
  content: string;
  onChange: (content: string) => void;
}

const RichTextInput: React.FC<RichTextInputProps> = ({
  name,
  content,
  onChange,
}) => {
  const [editorContent, setEditorContent] = useState(
    content || "<p>Start typing here...</p>"
  );

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
    onChange(newContent);
  };

  return (
    <div>
      <input type="hidden" name={name} value={editorContent} />
      <RichEditor content={editorContent} onChange={handleEditorChange} />
    </div>
  );
};

export default RichTextInput;
