document.addEventListener('DOMContentLoaded', () => {
  const addGoalButton = document.getElementById('add_goal'); // 目標追加ボタン
  const goalsList = document.getElementById('goals_list'); // 目標たちを挿入するdiv要素
  const clearGoalText = document.getElementById('clear_goal_text'); // 目標テキストの取り消しボタン
  const saveToBookshelfButton = document.getElementById('save_to_bookshelf'); // 本棚に保存するボタン

  // 目標追加ボタンをクリックした時にテキストエリアの文字をgoalTextに格納
  addGoalButton.addEventListener('click', () => {
    const goalText = document.getElementById('goal_text').value;

    if (goalText.trim() !== '') {
      const goalItem = document.createElement('div'); // div要素を作成
      goalItem.className = 'goal_item'; // div要素にclass="goal_item"を追加
      goalItem.textContent = goalText; // div要素のテキストはテキストエリアから取得したものとする
      // goalItem => <div class="goal_item">これは目標です。</div>
      goalsList.appendChild(goalItem); // div要素内にアイテムを挿入
      document.getElementById('goal_text').value = ''; // 要素を取得し直して、テキストエリアを空にする

      // 目標が1つ以上ある場合に保存ボタンを表示(ブロック要素にする)
      document.getElementById('save_to_bookshelf').style.display = 'block';
    }
  });

  // 入力中の目標テキストを一気に消すボタン
  clearGoalText.addEventListener('click', () => {
    document.getElementById('goal_text').value = '';
  });

  // 本棚への保存(ロジックはあとで実装)
  saveToBookshelfButton.addEventListener('click', () => {
    // 保存処理を実装(保存には「場所(location)が不可欠」)
    alert('保存が完了しました');
  });
});
