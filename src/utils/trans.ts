import { getAllSettings } from "./setting";

export const canTrans = async (str: string) => {
    const { maxTrans } = await getAllSettings();
    return {
        can: maxTrans >= str.length, 
        max: maxTrans,
        nowLen: str.length
    };
};