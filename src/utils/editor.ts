import { Selection, window } from "vscode";

export const getSelectText = () => {
    const editor = window.activeTextEditor;
  if (!editor) {
    return false;
  }
  const lineText = editor.document.getText(
    editor.selection
  );
  return lineText;
};

interface ReplaceParams {
  dst: string
}

export const replaceSelectText = ({ dst }: ReplaceParams) => {
  // 替换选中文本
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }
  editor.edit((editBuilder) => {
    const position = editor.selection;
    let newPosition: Selection | null = null;

    newPosition = newPosition || position;
    editBuilder.replace(newPosition, `${dst}`);
  });
};