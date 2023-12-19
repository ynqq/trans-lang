import { transServe } from './serve';
import { TRANS_AUTO_HUMP_NAME, TRANS_NAME } from './utils/const';
import { getSelectText, replaceSelectText } from './utils/editor';
import { getAllSettings } from './utils/setting';
import { ExtensionContext, commands, window } from 'vscode';
import { canTrans } from './utils/trans';
import { saveCount, showInStatusBar } from './count';

export function activate(context: ExtensionContext) {

	getAllSettings();
	showInStatusBar(context);
	
	let disposable = commands.registerCommand(TRANS_NAME, async () => {
		const selectText = getSelectText();
		if(selectText === ''){
			return;
		}
		if(selectText !== false){
			const {can, max, nowLen} = await canTrans(selectText);
			if(can){
				const {toStr} = await transServe(selectText);
				replaceSelectText({dst: toStr});
				saveCount(context, nowLen);
			}else{
				window.showErrorMessage(`单次翻译上限。单次最大翻译长度为${max}。本次翻译长度为${nowLen}`);
			}
		}
	});

	context.subscriptions.push(disposable);

	const autoHumpDis = commands.registerCommand(TRANS_AUTO_HUMP_NAME, async () => {
		const selectText = getSelectText();
		if(selectText === ''){
			return;
		}
		if(selectText !== false){
			const {can, max, nowLen} = await canTrans(selectText);
			if(can){
				const {toStr, to} = await transServe(selectText);
				replaceSelectText({dst: toStr, autoHump: to === 'en'});
				saveCount(context, nowLen);
			}else{
				window.showErrorMessage(`单次翻译上限。单次最大翻译长度为${max}。本次翻译长度为${nowLen}`);
			}
		}
	});

	context.subscriptions.push(autoHumpDis);
}

export function deactivate() {}
