export const isChinese = (selectText: string) => {
    return /[\u4e00-\u9fa5]/.test(selectText);
};