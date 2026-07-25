import { UNITS_DATA } from '../data/unitsData';

export function downloadAppAsHtml() {
  const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kids English Learning App - Offline Guide</title>
  <style>
    :root {
      --primary: #4f46e5;
      --primary-light: #e0e7ff;
      --sky: #0284c7;
      --text: #1e293b;
      --bg: #f8fafc;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 24px;
      padding: 30px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: var(--primary);
      margin: 0 0 10px 0;
      font-size: 28px;
    }
    .header p {
      color: #64748b;
      margin: 0;
      font-size: 14px;
    }
    .unit-card {
      background: #f1f5f9;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 25px;
      border: 1px solid #cbd5e1;
    }
    .unit-title {
      font-size: 20px;
      font-weight: bold;
      color: var(--sky);
      margin-top: 0;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #334155;
      margin: 15px 0 8px 0;
      border-left: 4px solid var(--primary);
      padding-left: 8px;
    }
    .vocab-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 10px;
      margin-bottom: 15px;
    }
    .vocab-item {
      background: white;
      padding: 10px 14px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: transform 0.1s;
    }
    .vocab-item:hover {
      transform: translateY(-2px);
      border-color: var(--primary);
    }
    .sentence-box {
      background: white;
      padding: 12px 16px;
      border-radius: 12px;
      margin-bottom: 8px;
      border: 1px solid #e2e8f0;
    }
    .sentence-q {
      font-weight: bold;
      color: #1e1b4b;
    }
    .sentence-a {
      color: #0369a1;
      margin-top: 4px;
    }
    .btn-speak {
      background: var(--primary-light);
      color: var(--primary);
      border: none;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      margin-left: 8px;
      font-weight: bold;
    }
    .btn-speak:hover {
      background: var(--primary);
      color: white;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; padding: 0; }
      .btn-speak { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎓 奇妙英语儿童发音与句型学习指南</h1>
      <p>点击任意单词或句型即可朗读（需浏览器支持语音合成）</p>
    </div>

    ${UNITS_DATA.map(unit => `
      <div class="unit-card">
        <h2 class="unit-title">📖 Unit ${unit.id}: ${unit.title}</h2>
        <p style="color:#64748b; font-size:13px; margin:-10px 0 15px 0;">${unit.subtitle}</p>

        <!-- Vocabulary -->
        <div class="section-title">核心词汇 (Vocabulary)</div>
        <div class="vocab-grid">
          ${unit.vocabNew.map(v => `
            <div class="vocab-item" onclick="speak('${v.word.replace(/'/g, "\\'")}')">
              <span style="font-size:22px;">${v.emoji || '✨'}</span>
              <div>
                <div style="font-weight:bold; font-size:14px;">${v.word}</div>
                <div style="font-size:12px; color:#64748b;">${v.translation}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Sentence Patterns -->
        <div class="section-title">重点句型 (Sentence Patterns)</div>
        ${unit.topicSentences.map(p => `
          <div class="sentence-box">
            <div class="sentence-q">
              ❓ Q: ${p.sampleQuestion || p.question}
              <button class="btn-speak" onclick="speak('${(p.sampleQuestion || p.question).replace(/'/g, "\\'")}')">🔊 播放</button>
            </div>
            <div class="sentence-a">
              💬 A: ${p.sampleAnswer || p.answer}
              <button class="btn-speak" onclick="speak('${(p.sampleAnswer || p.answer).replace(/'/g, "\\'")}')">🔊 播放</button>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  </div>

  <script>
    function speak(text) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Kids_English_Learning_Guide.html');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
