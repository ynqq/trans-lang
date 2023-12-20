import { ExtensionContext, MarkdownString, StatusBarAlignment, StatusBarItem, window } from "vscode";
import { getNowDate, getNowDateObj } from "../utils";

export const saveCount = (context: ExtensionContext, strLen: number) => {
    const todayData = getTodayCount(context);
    context.globalState.update(getNowDate(), {
        count: todayData.count + 1,
        strLength: todayData.strLength + strLen
    });
    showInStatusBar(context);
};
interface ICountValue {
    count: number;
    strLength: number;
}
export const getNowMonthCount = (context: ExtensionContext) => {
    const { y, m } = getNowDateObj();
    const allKeys = context.globalState.keys();
    const countResult: Record<string, ICountValue> = {};
    allKeys.forEach(key => {
        const [yy, mm, _dd] = key.split('/');
        if(+yy === +y && +mm === +m){
            countResult[key] = context.globalState.get<ICountValue>(key)!;
        }
    });
    let allCount = 0, allLeng = 0;
    for(let i in countResult){
        allCount += countResult[i].count;
        allLeng += countResult[i].strLength;
    }
    return {
        data: countResult,
        allCount,
        allLeng
    };
};

export const getTodayCount = (context: ExtensionContext) => {
    return context.globalState.get(getNowDate(), {
        count: 0,
        strLength: 0
    });
};

let statusBar: StatusBarItem ;
export const showInStatusBar = (context: ExtensionContext) => {
    statusBar = statusBar || window.createStatusBarItem(StatusBarAlignment.Right, 100);
    const  {count, strLength} = getTodayCount(context);
    statusBar.text = `今日翻译${count}次, 长度${strLength}`;
    const { allCount, allLeng } = getNowMonthCount(context);
    statusBar.tooltip = new MarkdownString(`本月翻译<span style="color: #ff0000">${allCount}</span>次, 长度${allLeng}`);
    statusBar.show();
};