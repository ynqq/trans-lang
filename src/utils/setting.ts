/**
 * 优先使用trans.config.json
 * 其次 settings.json
 */
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { window, workspace } from "vscode";
import { CONFIG_FILE } from "./const";

interface IConfigValue {
    read: boolean;
    APPID: string;
    KEY: string;
    maxTrans: number; // 单次可以翻译的最大长度
}
const configJsonData: IConfigValue = {read: false, maxTrans: 100} as IConfigValue;

let rootPath = '';
const setRootPath = () => {
    if(workspace){
        rootPath = workspace.workspaceFolders?.[0]?.uri?.fsPath || '';
    }
};
const getRootPath = () => {
    if(rootPath === ''){
        setRootPath();
    }
    return rootPath;
};

export const _resolve = (...paths: string[]) => {
    return resolve(getRootPath(), ...paths);
};

const getSettingData = () => {
        // 获取setting.json
        const settingData = workspace.getConfiguration("trans-lang");
        const result:IConfigValue = {} as IConfigValue;
        if(settingData.get('APPID')){
            result.APPID = settingData.get('APPID')!;
        }
        if(settingData.get('KEY')){
            result.KEY = settingData.get('KEY')!;
        }
        if(settingData.get('maxTrans')){
            result.maxTrans = +settingData.get('maxTrans')!;
        }
        return result;
};

export const getAllSettings = async () => {
    if(!configJsonData.read){
        try {
            const settingData = getSettingData();
            Object.assign(configJsonData, settingData);
            if(existsSync(_resolve(CONFIG_FILE))){
                const configData = readFileSync(_resolve(CONFIG_FILE));
                Object.assign(configJsonData, JSON.parse(configData.toString()));
            }
            if(!configJsonData.APPID || !configJsonData.KEY){
                throw new Error('noSet');
            }
            configJsonData.read = true;
        } catch (error: any) {
            if(error.message === 'noSet'){
                window.showErrorMessage(`未设置APPID或者KEY`);
            }else{
                window.showErrorMessage('初始化转换报错');
            }
        }
    }
    return configJsonData;
};