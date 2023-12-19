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
        request.post('https://www.diaosi.online/trans/trans/transLangulage', {form: {postData}}, (err, _, body) => {
            if(err){
                reject(err);
                return;
            }
            body = JSON.parse(body);
            const { trans_result} = body;
            if(body.code === 1 && trans_result?.length){
                resolve({...body, fromStr: trans_result[0].src, toStr: trans_result[0].dst});
                return;
            }
            reject(body);
            window.showErrorMessage('翻译出错: ' + body.msg);
        });
      } catch (error) {
        window.showErrorMessage('翻译出错');
        reject(error);
      }
  });
};
