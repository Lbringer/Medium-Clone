import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];
const content = "Type here...";
type EditorInputProps = {
  setContent: (content: string) => void;
};
export const EditorInput: React.FC<EditorInputProps> = ({ setContent }) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "m-5 focus:outline-none m-0 mt-10 text-sm md:text-base text-stone-950 w-full h-20 ",
      },
    },
    onUpdate({ editor }) {
      const content = editor.getHTML();
      setContent(content);
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};
