import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import TaskItem from "@tiptap/extension-task-item";
import MenuBar from "./MenuBar";

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichEditor: React.FC<RichEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "list-disc",
          },
        },
        orderedList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "list-decimal",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "text-xl",
          },
        },
      }),
      TextStyle,
      Highlight,
      TaskItem,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichEditor;
