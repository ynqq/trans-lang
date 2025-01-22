import { env, Selection, window } from "vscode";
import { toHump } from ".";

export const getSelectText = async () => {
  const editor = window.activeTextEditor;
  if (!editor) {
    return false;
  }
  const lineText = editor.document.getText(editor.selection);
  if (lineText === "") {
    return await env.clipboard.readText();
  }
  return lineText;
};

interface ReplaceParams {
  dst: string;
  autoHump?: boolean;
}

export const replaceSelectText = ({ dst, autoHump }: ReplaceParams) => {
  // 替换选中文本
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }
  editor.edit((editBuilder) => {
    const position = editor.selection;
    let newPosition: Selection | null = null;

    newPosition = newPosition || position;
    let str = dst;
    if (autoHump) {
      str = toHump(str);
    }
    editBuilder.replace(newPosition, `${str}`);
  });
};
