// --- 設定項目 ---

// 1. 質問リスト
// 全27問。内容は変更ありません。
const questions = [
    { text: "自分の人生は、総体的に良いものだと考えている", effect: { vitality: 1, misanthropy: 0 } },
    { text: "恋愛や異性に対して、ポジティブなイメージを持っている", effect: { vitality: 1, misanthropy: -1 } },
    { text: "結局のところ、現代人は個人主義的で信頼できない", effect: { vitality: -1, misanthropy: 1 } },
    { text: "創作を含め、恋愛の話を聞くと、嫉妬や劣等感を覚えることが多い", effect: { vitality: -1, misanthropy: 1 } },
    { text: "新しいことに挑戦するのは、面倒よりもワクワクが勝る", effect: { vitality: 1, misanthropy: 0 } },
    { text: "大勢で集まるよりも、一人で過ごす方が不安が紛れる", effect: { vitality: 0, misanthropy: 1 } },
    { text: "自分に理想のパートナーが見つかるのだとすれば、それは自分の努力の成果だ", effect: { vitality: 1, misanthropy: -1 } },
    { text: "誠実であることで得られる利益よりも失うものの方が多い", effect: { vitality: -1, misanthropy: 1 } },
    { text: "人（特に異性）を心から信頼することは、とても難しいと感じる", effect: { vitality: 0, misanthropy: 1 } },
    { text: "自分には価値がある、と胸を張って言える", effect: { vitality: 1, misanthropy: -1 } },
    { text: "将来に対して、具体的な計画を持っている", effect: { vitality: 1, misanthropy: 0 } },
    { text: "創作内を含め、他人の充実した生活を見ると、強い疎外感を覚える", effect: { vitality: -1, misanthropy: 1 } },
    { text: "他人と自分を比較して落ち込むことは滅多にない", effect: { vitality: 1, misanthropy: -1 } },
    { text: "自分の容姿に、ある程度は満足している", effect: { vitality: 1, misanthropy: 0 } },
    { text: "現在でも友人や知人と呼べる人は数人いる", effect: { vitality: 1, misanthropy: -1 } },
    { text: "いわゆる「普通」の人生を送ることに強い憧れがある", effect: { vitality: 0, misanthropy: -1 } },
    { text: "社会的な成功は幸福に不可欠だと思う", effect: { vitality: 0, misanthropy: 1 } },
    { text: "自分の意見が他人と違っていても、堂々と主張できる", effect: { vitality: 1, misanthropy: 0 } },
    { text: "恋愛は人生において必須の要素だと感じる", effect: { vitality: 0, misanthropy: -1 } },
    { text: "何かに夢中になったり、趣味に没頭したりする時間がある", effect: { vitality: 1, misanthropy: 0 } },
    { text: "世の中の多くの人は、自分よりも幸せそうに見える", effect: { vitality: -1, misanthropy: 1 } },
    { text: "基本的に、人間の善意を信じている", effect: { vitality: 1, misanthropy: -1 } },
    { text: "自分の欠点や過去の失敗を、なかなか許すことができない", effect: { vitality: -1, misanthropy: 0 } },
    { text: "あらゆる人間の悩みは即物的なものに由来している", effect: { vitality: -1, misanthropy: 0 } },
    { text: "集団の中で、自分だけが浮いていると感じることがよくある", effect: { vitality: -1, misanthropy: 1 } },
    { text: "一つのことを深く探究するのが好きだ", effect: { vitality: 1, misanthropy: 0 } },
    { text: "たとえ友達やパートナーがいなくとも、自分の人生を楽しみ抜く自信がある", effect: { vitality: 1, misanthropy: 0 } }
];

// 2. 結果の定義
const results = {
    "理想家": { description: "誇り高きインセル。真理の存在や人間性の理想を信じ、ありうべく社会を構想する思索家。その理想の高さゆえに冷笑的なインセルコミュニティでは後ろ指をさされることも多い。" },
    "野心家": { description: "いわゆる侍。人との関わりを絶ち、自己を研鑽に一心不乱に投じる様は、まさしく現代の武士道精神を体現しているものだ。だが、その内側には競争的な一面も秘めているので冷静さを忘れないことが肝要だろう。" },
    "生存者": { description: "「持てる」インセル。あなたはまだ何も喪っていない。" },
    "被抑圧者": { description: "生への希望は持てないが、かといって革命を諦めていない革命家の卵。まず他者の目線から解放されることであなたらしさを取り戻そう。" },
    "喪失者": { description: "生への肯定感を失い、人間社会に対しても虚無的な視線を向けた冷笑家。かつて持っていたかもしれない希望や理想を諦め、静かに世界を傍観している状態にある。" },
    "ごろつき": { description: "狂犬。世界を敵とみなし、破壊的な衝動に駆られる可能性がある。" }
};


// --- プログラム本体 ---

const startButton = document.getElementById('start-button');
const questionArea = document.getElementById('question-area');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultArea = document.getElementById('result-area');
const resultType = document.getElementById('result-type');
const resultDescription = document.getElementById('result-description');

let currentQuestionIndex = 0;
let scores = { vitality: 0, misanthropy: 0 };

startButton.addEventListener('click', startDiagnosis);

function startDiagnosis() {
    startButton.classList.add('hidden');
    answerButtons.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    questionText.textContent = `Q${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].text}`;
}

// ★★★ 回答ボタンの処理を4択対応に更新 ★★★
answerButtons.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.answer-btn');
    if (!clickedButton) return;

    const answer = clickedButton.dataset.answer;
    const effect = questions[currentQuestionIndex].effect;
    
    let multiplier = 0;
    // 回答の選択肢に応じてスコアの変動倍率を決定
    switch (answer) {
        case 'agree':
            multiplier = 1;
            break;
        case 'somewhat_agree':
            multiplier = 0.5;
            break;
        case 'somewhat_disagree':
            multiplier = -0.5;
            break;
        case 'disagree':
            multiplier = -1;
            break;
    }

    // スコアを計算
    scores.vitality += effect.vitality * multiplier;
    scores.misanthropy += effect.misanthropy * multiplier;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionArea.classList.add('hidden');
    answerButtons.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const finalType = determineType(scores);
    resultType.textContent = finalType;
    resultDescription.textContent = results[finalType].description;
}

function determineType(finalScores) {
    const { vitality, misanthropy } = finalScores;
    
    // 4択化によりスコアの振れ幅が変わるため、境界値を微調整
    const vitalityThreshold = 2;
    const misanthropyThresholdHigh = 6;
    const misanthropyThresholdLow = -4;

    if (vitality >= vitalityThreshold) {
        if (misanthropy >= misanthropyThresholdHigh) return "野心家";
        if (misanthropy <= misanthropyThresholdLow) return "理想家";
        return "生存者";
    } else {
        if (misanthropy >= misanthropyThresholdHigh) return "ごろつき";
        if (misanthropy <= misanthropyThresholdLow) return "被抑圧者";
        return "喪失者";
    }
}
