import { readFileSync } from "fs";
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

export const getAllSettings = async () => {
    if(!configJsonData.read){
        try {
            const configData =  readFileSync(_resolve(CONFIG_FILE));
            Object.assign(configJsonData, JSON.parse(configData.toString()), {read: true});
        } catch (error) {
            window.showErrorMessage(`未设置${CONFIG_FILE}`);
        }
    }
    return configJsonData;
};