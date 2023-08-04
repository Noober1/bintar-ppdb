"use client";

import Skeleton from "@mui/material/Skeleton";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import React, { FC, useEffect, useState } from "react";
import { EditorProps } from "react-draft-wysiwyg";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <Skeleton height={150} width="100%" variant="rectangular" />,
  }
);

interface RichTextEditorProps {
  initialContent: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  initialContent,
  onChange,
}) => {
  const [editorState, seteditorState] = useState<EditorState>();

  useEffect(() => {
    let htmlToDraft = null;
    if (typeof window === "object") {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      htmlToDraft = require("html-to-draftjs").default;
      const contentBlock = htmlToDraft(initialContent);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        seteditorState(editorState);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Editor
      placeholder="Silahkan isi content disini"
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={(editorState) => {
        seteditorState(editorState);
        if (typeof onChange !== "undefined") {
          onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        }
      }}
    />
  );
};

export default RichTextEditor;
