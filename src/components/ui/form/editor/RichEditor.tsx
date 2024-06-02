import React from "react";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";

import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";
import MenuBar from "./MenuBar";

interface RichEditorProps {
  content: string;
}

const RichEditor: React.FC<RichEditorProps> = ({ content }) => {
  const extensions = [
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
    CharacterCount.configure({
      limit: 10000,
    }),
  ];
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};

export default RichEditor;
