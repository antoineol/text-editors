import { BlockNoteView, useBlockNote } from '@blocknote/react';
import { FC, memo } from 'react';
import "@blocknote/core/style.css";

interface Props {}

export const BlockNote: FC<Props> = memo(function BlockNote(props) {
  const {} = props;
  const editor = useBlockNote({
    onEditorContentChange: (editor) => {
      // Log the document to console on every update
      // console.log(editor.getJSON());
      // console.log(editor);
    },
  });

  return <BlockNoteView editor={editor} />;
});