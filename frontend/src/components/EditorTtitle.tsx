import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const extensions = [StarterKit];
const content = "Title";
type EditorTitleProps = {
  setTitle: (title: string) => void;
};
export const EditorTitle: React.FC<EditorTitleProps> = ({ setTitle }) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "m-5 focus:outline-none m-0 text-2xl md:text-3xl text-stone-950 w-full ",
      },
    },
    onUpdate({ editor }) {
      const title = editor.getHTML();
      setTitle(title);
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};
