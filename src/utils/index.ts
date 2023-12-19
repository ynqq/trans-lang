export function getRandomStr(num = 0) {
    let str = 'abcdefghijklmnopqrxtuvwxyz';
    str = str + str.toLocaleUpperCase() + '0123456789';
    const strList = str.split('');
    return new Array(num).fill('').map(() => strList[Math.floor(Math.random() * strList.length)]).join('');
}

export const getNowDate = () => {
    return new Date().toLocaleDateString();
};