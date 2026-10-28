import re,sys
text=open(sys.argv[1],encoding='utf-8').read()
watch=[w for w in (sys.argv[2].split(',') if len(sys.argv)>2 else []) if w]
ENDS=set('いきしてりみびちにもとがで')
REACT=re.compile(r'答えなかった|答えず|返事をしなかった|何も言わ(?:ず|なかった)|黙って|黙った|口を閉じ|言いかけ(?:て、やめ|た)|顔を上げなかった|振り向かなかった|振り返らなかった|動かなかった|(?:それ以上|何も)(?:は)?(?:言わ|訊か|聞か)なかった|何も訊かず')
LINK=['それから','しばらく','やがて']
NEG=r'(?:ない|なかった|ません|ではなく|でもない|ず(?=[、。])|ん(?=[。、」な]))'
CONTRA=r'^(?:だが|しかし|けれど|けれども|でも|それでも|ただ|代わりに|むしろ)'
VOICE=re.compile(r'おる|おった|おらん|[^いせ]ん(?=[。、」]|のでな|のです|かね|な」)|よう(?=似|分か|知|来)|なすっ|じゃろ|とる|とった|ですな|でしてな|たまえ')
def sents(s): return [x for x in re.split(r'(?<=[。！？」])',s) if x.strip()]
def triples(s):
    out=[]
    for sent in sents(s):
        segs=[x for x in sent.split('、') if x.strip()]
        for i in range(len(segs)-2):
            a,b=segs[i].strip(),segs[i+1].strip()
            if a and b and a[-1]==b[-1] and a[-1] in ENDS:
                out.append(sent.strip()); break
        if re.search(r'([^、。も]{1,8}も){3}',sent): out.append(sent.strip())
    return list(dict.fromkeys(out))
def negturns(s):
    ss=[x.strip() for x in sents(s)]; out=[]
    for i,x in enumerate(ss):
        if re.search(r'ではない|ではなく|のではなかった|でもない',x): out.append(('XではなくY',x))
        if re.search(r'ても[^。」]*'+NEG,x): out.append(('〜ても〜ない',x))
        if re.search(NEG+r'[^。」]*[^ら]が、',x): out.append(('否定＋が、',x))
        if re.search(r'[^せ]ず、',x): out.append(('〜ず、〜',x))
        if re.search(r'^(?:だが|しかし)[^。]*'+NEG,x): out.append(('だが＋否定',x))
        if i+1<len(ss) and re.search(NEG+r'[。」]?$',x):
            n=ss[i+1].lstrip('「')
            if re.search(CONTRA,n) or re.search(r'だけ[がは]',n): out.append(('否定。→逆接',x+n))
            elif re.search(r'^[^。]{0,6}(?:は|が)',n) and len(x)<20: out.append(('否定。→肯定の言い直し?',x+n))
    return out
scenes=re.split(r'\n-{3,}\n',text)
total={w:0 for w in watch+LINK}; rtotal=0; ntotal=0
for i,s in enumerate(scenes,1):
    paras=[p.strip() for p in s.split('\n') if p.strip() and not p.lstrip().startswith('#')]
    narr=[p for p in paras if not p.startswith(('「','『'))]
    one=[p for p in narr if len(re.findall(r'[。！？]',p))<=1]
    neg=negturns(s); tri=triples(s); react=REACT.findall(s)
    voice=[(m.group(),p) for p in paras if p.startswith('「') for m in VOICE.finditer(p)]
    rtotal+=len(react); ntotal+=len(neg)
    print(f'--- 場面{i}: 段落{len(paras)} 一行段落{len(one)} 否定→逆接候補{len(neg)} 三つ並び候補{len(tri)} 沈黙の反応{len(react)}')
    for k,n in neg: print(f'   否定[{k}]:',n[:70])
    for t in tri: print('   三つ?:',t[:60])
    for m in REACT.finditer(s): print('   反応:',s[max(0,m.start()-15):m.end()+5].replace('\n',' '))
    for w,p in voice: print(f'   口調[{w}]:',p[:50])
    for w in watch+LINK:
        c=s.count(w); total[w]+=c
        if c: print(f'   {w}: {c}')
    print('   場面末:',paras[-1][:40] if paras else '')
print('=== 合計:',total); print('=== 沈黙:',rtotal); print('=== 否定候補:',ntotal)
