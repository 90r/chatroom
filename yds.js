const axios = require('axios');
var crypto = require('crypto');
md5_enc=function (x){
    var md5 = crypto.createHash('md5');
    return md5.update(x).digest('hex')
}
var r = function (e) {
    var t = md5_enc("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
        , r = "" + (new Date).getTime()
        , i = r + parseInt(10 * Math.random(), 10);
    return {
        ts: r,
        bv: t,
        salt: i,
        sign: md5_enc("fanyideskweb" + e + i + "Ygy_4c=r#e#4EX^NUGUc5")
    }
};



headers= {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
}

const params = new URLSearchParams();
params.append('smartresult', 'dict');
params.append('smartresult', 'rule');
msg='apple'
const response = axios.get('https://fanyi.youdao.com/', {
    headers:headers
}).then((res)=>{
    cookie=res.headers.get('set-cookie')[0].slice(0,47);
    console.log(cookie);
    header = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'OUTFOX_SEARCH_USER_ID=-1709407499@10.108.162.135; OUTFOX_SEARCH_USER_ID_NCOO=447178669.0320774; ___rl__test__cookies=1668777091983',
        'Origin': 'https://fanyi.youdao.com',
        'Referer': 'https://fanyi.youdao.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }
    header['Cookie']=cookie
    obj=r(msg)

    data = {
        'i': msg,
        'from': 'AUTO',
        'to': 'AUTO',
        'smartresult': 'dict',
        'client': 'fanyideskweb',
        'salt': obj["salt"],
        'sign': obj["sign"],
        'lts': obj["ts"],
        'bv': obj["bv"],
        'doctype': 'json',
        'version': '2.1',
        'keyfrom': 'fanyi.web',
        'action': 'FY_BY_REALTlME',
    }
    console.log(data)
    console.log(header)
    const response = axios.post(
        'https://fanyi.youdao.com/translate_o',
        new URLSearchParams(data),
        {
            params: params,
            headers:header
        }
    ).then((res)=>{
        console.log(res.data)
    });

});

