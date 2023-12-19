import { ExtensionContext, StatusBarAlignment, StatusBarItem, window } from "vscode";
import { getNowDate } from "../utils";

export const saveCount = (context: ExtensionContext, strLen: number) => {
    const todayData = getTodayCount(context);
    context.workspaceState.update(getNowDate(), {
        count: todayData.count + 1,
        strLength: todayData.strLength + strLen
    });
    showInStatusBar(context);
};

export const getTodayCount = (context: ExtensionContext) => {
    return context.workspaceState.get(getNowDate(), {
        count: 0,
        strLength: 0
    });
};

let statusBar: StatusBarItem ;
export const showInStatusBar = (context: ExtensionContext) => {
    statusBar = statusBar || window.createStatusBarItem(StatusBarAlignment.Right, 100);
    const  {count, strLength} = getTodayCount(context);
    statusBar.text = `翻译${count}, 长度${strLength}`;
    statusBar.show();
};