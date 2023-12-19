import  md5 from 'md5';
import { getRandomStr } from '../utils';
import { getAllSettings } from '../utils/setting';

export const getSign = async (query: string) => {
    const { APPID, KEY } = await getAllSettings();
    const salt = getRandomStr(4);
    const str = `${APPID}${query}${salt}${KEY}`;
    const sign = md5(str);
    return {
        salt,
        appid: APPID,
        sign,
        query: encodeURIComponent(query)
    };
};