import EditorJS from "@editorjs/editorjs";
import type EditorJSType from "@editorjs/editorjs";
import { FC, memo, useEffect, useRef, useState } from "react";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "This is my awesome editor!",
      },
    },
  ],
};

interface Props {}

export const Editorjs: FC<Props> = memo(function Editorjs(props) {
  const {} = props;

  const [count, setCount] = useState(0);

  const editorRef = useRef<EditorJSType | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holderRef.current!,
        autofocus: true,
        placeholder: "Let's write an awesome story!",
        data: DEFAULT_INITIAL_DATA,
        onChange: async (/* api, event */) => {
          setCount((c) => c + 1);
          let content = await editor.saver.save();

          console.log(content);
        },
      });
      editorRef.current = editor;
    }
    return () => {
      // This code also cleans up when hot reloading, which reinitializes each time the code changes.
      // the `if` is to check if the initialization is finished.
      // In Strict mode, react runs useEffect twice immediately, before the editor finished the first initialization.
      // If editorRef.current, we have 2 instances of editor set.
      // Inspiration: https://dev.to/sumankalia/how-to-integrate-editorjs-in-reactjs-2l6l
      if (editorRef.current?.destroy) {
        editorRef.current?.destroy();
        editorRef.current = null;
      }
    };
  }, []);
  return (
    <>
      <div>
        Changed {count} time{count > 1 ? "s" : ""}
      </div>
      <div
        ref={holderRef}
        className="prose prose-img:m-0 max-w-full pl-16 pr-8"
      />
    </>
  );
});
