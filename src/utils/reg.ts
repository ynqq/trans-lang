export const isChinese = (selectText: string) => {
    return /[\u4e00-\u9fa5]/.test(selectText);
};
export const isJapanese = (selectText: string) => {
    return /[\u0800-\u4e00]/.test(selectText);
};