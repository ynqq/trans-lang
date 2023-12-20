import { getSign } from "./sign";
import { isChinese } from "../utils/reg";
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

export const transServe = async (str: string): Promise<ITransServeValue> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { query, appid, salt, sign } = await getSign(str);
      let from = "en",
        to = "zh";
      if (isChinese(str)) {
        from = "zh";
        to = "en";
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
