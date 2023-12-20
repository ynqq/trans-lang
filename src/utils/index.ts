import dayjs from "dayjs";

export function getRandomStr(num = 0) {
    let str = 'abcdefghijklmnopqrxtuvwxyz';
    str = str + str.toLocaleUpperCase() + '0123456789';
    const strList = str.split('');
    return new Array(num).fill('').map(() => strList[Math.floor(Math.random() * strList.length)]).join('');
}

export const getNowDate = () => {
    return dayjs().format('YYYY/MM/DD');
};
export const getNowDateObj = () => {
    const d = dayjs();
    return {
        y: d.year(),
        m: d.month() + 1,
        d: d.date()
    };
};
export const toHump = (str: string) => {
    const strList = str.split(' ');
    let [f, ...other] = strList;
    other = other.map(item => {
        const [s, ...o] = item;
        return `${s.toLocaleUpperCase()}${o.join('')}`;
    });
    return `${f.toLocaleLowerCase()}${other.join('')}`;
};
