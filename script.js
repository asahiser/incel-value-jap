// --- 設定項目 ---
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
const results = {
    "理想家": { description: "生への肯定感が高く、人間への信頼を失っていないタイプ。世界や人間性の理想を信じ、より良い社会を目指そうとします。時に現実とのギャップに悩むこともありますが、その前向きさがあなたの強みです。" },
    "野心家": { description: "生への肯定感が高く、強い上昇志向を持っています。人間嫌いの側面は、他者をライバルとみなし、競争を勝ち抜くためのエネルギーに変換されます。目標達成のためなら手段を厭わない危うさも秘めています。" },
    "生存者": { description: "人間社会に一定の距離を置きつつも、自己の生は強く肯定しているタイプ。集団に依存せず、自らのスキルや知識を頼りに現実世界を生き抜こうとします。クールで現実的な視点が特徴です。" },
    "被抑圧者": { description: "生への肯定感が低く、他者からの評価に敏感です。人間関係に希望を持ちたいと願う一方で、傷つくことを恐れています。自己肯定感を育むことが、現状を打破する鍵となるでしょう。" },
    "喪失者": { description: "生への肯定感を失い、人間社会に対しても虚無的な視線を向けています。かつて持っていたかもしれない希望や理想を諦め、静かに世界を傍観している状態です。無気力感に支配されやすい傾向があります。" },
    "ごろつき": { description: "生への肯定感が低く、その不満を他者や社会への攻撃性として表出させるタイプ。世界は敵であるとみなし、破壊的な衝動に駆られることがあります。根底には、満たされない承認欲求が渦巻いています。" }
};

// --- プログラム本体 ---

// HTMLの要素を取得
const startButton = document.getElementById('start-button');
const questionArea = document.getElementById('question-area');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultArea = document.getElementById('result-area');
const resultType = document.getElementById('result-type');
const resultDescription = document.getElementById('result-description');
// ★追加：新しい要素を取得
const progressCounter = document.getElementById('progress-counter');
const finalScoresDisplay = document.getElementById('final-scores');

let currentQuestionIndex = 0;
let scores = { vitality: 0, misanthropy: 0 };

// 診断開始ボタンの処理
startButton.addEventListener('click', startDiagnosis);

function startDiagnosis() {
    startButton.classList.add('hidden');
    answerButtons.classList.remove('hidden');
    // ★追加：進捗カウンターを表示
    progressCounter.classList.remove('hidden');
    showQuestion();
}

// 質問と進捗を表示する関数
function showQuestion() {
    questionText.textContent = `Q${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].text}`;
    // ★追加：進捗カウンターを更新
    progressCounter.textContent = `残り ${questions.length - currentQuestionIndex} 問`;
}

// 回答ボタンの処理
answerButtons.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.answer-btn');
    if (!clickedButton) return;

    const answer = clickedButton.dataset.answer;
    const effect = questions[currentQuestionIndex].effect;
    
    let multiplier = 0;
    switch (answer) {
        case 'agree': multiplier = 1; break;
        case 'somewhat_agree': multiplier = 0.5; break;
        case 'somewhat_disagree': multiplier = -0.5; break;
        case 'disagree': multiplier = -1; break;
    }

    scores.vitality += effect.vitality * multiplier;
    scores.misanthropy += effect.misanthropy * multiplier;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// 最終結果とスコアを表示する関数
function showResult() {
    questionArea.classList.add('hidden');
    answerButtons.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const finalType = determineType(scores);
    resultType.textContent = finalType;
    resultDescription.textContent = results[finalType].description;

    // ★追加：最終スコアを表示
    // 小数点第一位まで表示するように四捨五入
    const finalVitality = Math.round(scores.vitality * 10) / 10;
    const finalMisanthropy = Math.round(scores.misanthropy * 10) / 10;
    finalScoresDisplay.textContent = `生への肯定感: ${finalVitality} / 人間嫌悪: ${finalMisanthropy}`;
}

// タイプを決定する関数
function determineType(finalScores) {
    const { vitality, misanthropy } = finalScores;
    
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
