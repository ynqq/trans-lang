import { getSign } from "./sign";
import { isChinese, isJapanese } from "../utils/reg";
import request from 'request';
import { window } from "vscode";

interface ITransServeValue {
  code: number;
  msg: string;
  from: 'zh' | 'en';
  to: 'zh' | 'en';
  fromStr: string;
  toStr: string;
}

type TLanguage = 'jp' | 'en' | 'zh';

/**
 * #TODO 日->中 单个命令转不了( 。)这玩意算中文还是日文呢 
 * 翻译 
 * @param str 需要翻译的内容
 * @param toLangType 翻译到哪种语言 中->英 中->日 英->中 
 * @returns 
 */
export const transServe = async (str: string, toLangType: TLanguage = 'en'): Promise<ITransServeValue> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { query, appid, salt, sign } = await getSign(str);
      let from = toLangType,
        to = "zh";
      if (isChinese(str)) {
        from = "zh";
        to = toLangType;
      }
      const postData = {
        q: query,
        appid,
        salt,
        sign,
        from: from,
        to: to,
      };
      const url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${postData.q}&from=${postData.from}&to=${postData.to}&appid=${postData.appid}&salt=${postData.salt}&sign=${postData.sign}`;
      request.get(url, (err, _, body) => {
        if (err) {
          reject(err);
          return;
        }
        body = JSON.parse(body);
        const { trans_result } = body;
        if (!body.error_code || body.error_code === '52000') {
          return resolve({ ...body, code: 1, fromStr: trans_result[0].src, toStr: trans_result[0].dst });
        }
        reject(body);
        window.showErrorMessage('翻译出错: ' + body.error_code + '-' + body.error_msg);
      });
    } catch (error) {
      window.showErrorMessage('翻译出错');
      reject(error);
    }
  });
};
