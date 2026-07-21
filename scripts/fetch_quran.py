import urllib.request
import json
import random

try:
    print('Fetching Arabic Quran...')
    req_ar = urllib.request.Request('https://api.alquran.cloud/v1/quran/quran-uthmani', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_ar) as response:
        ar_data = json.loads(response.read())

    print('Fetching Bengali Translation...')
    req_bn = urllib.request.Request('https://api.alquran.cloud/v1/quran/bn.bengali', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_bn) as response:
        bn_data = json.loads(response.read())

    print('Processing data...')
    verses = []
    
    surahs_ar = ar_data['data']['surahs']
    surahs_bn = bn_data['data']['surahs']
    
    for i in range(len(surahs_ar)):
        surah_ar = surahs_ar[i]
        surah_bn = surahs_bn[i]
        
        for j in range(len(surah_ar['ayahs'])):
            text_ar = surah_ar['ayahs'][j]['text']
            text_bn = surah_bn['ayahs'][j]['text']
            verse_num = surah_bn['ayahs'][j]['numberInSurah']
            surah_num = surah_bn['number']
            
            translation = f"{text_bn} ({surah_num}:{verse_num})"
            
            verses.append({
                'arabic': text_ar,
                'translation': translation
            })

    random.seed(42)
    random.shuffle(verses)
    
    with open('js/verses.json', 'w', encoding='utf-8') as f:
        json.dump(verses, f, ensure_ascii=False)
    print(f'Successfully saved {len(verses)} verses to js/verses.json!')
except Exception as e:
    print('Error:', e)
