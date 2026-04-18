import json
import requests
from tqdm import tqdm
from loguru import logger

new_data = []

try:
    rep = requests.post("https://weitao6.cn/api/mysite/webnav/list", json={"search": ""}).json()

    for item in tqdm(rep['data'], desc='Tag', unit='个', position=0):
        name = item['tag']
        tmp_body = []
        for ib in tqdm(item['body'], desc="Tag Data", unit='条', position=1, leave=False):
            tmp_body.append({
                "name": ib['name'],
                "link": ib['weburl'],
                "imgUrl": ib['imgurl'],
                "desc": ib['tooltip']
            })
        new_data.append({
            "name": name,
            "data": tmp_body
        })

    with open('./new_websites_data.json', 'w', encoding='utf-8') as f:
        f.write(json.dumps(new_data, indent=4, ensure_ascii=False))
except Exception as e:
    logger.warning(str(e))