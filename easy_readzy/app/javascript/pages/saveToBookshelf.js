// flashメッセージを表示する関数
function showFlashMessage(message) {
  const flash = document.getElementById('js_flash');
  flash.textContent = message;
  flash.style.display = 'flex';
  // 透明化クラスを外す
  flash.classList.remove('fade-out');
  // 2秒後にフェードアウト
  setTimeout(() => {
    flash.classList.add('fade-out');
    // アニメーション終了後に非表示
    setTimeout(() => {
      flash.style.display = 'none';
      flash.classList.remove('fade-out'); // 次回のためにリセット
    }, 500); // CSSのtransitionと同じ時間
  }, 2000);
}

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

      // フラッシュメッセージを表示
      showFlashMessage('目標が本に追加されました\n本棚への保存は完了していません');

      // 目標が1つ以上ある場合に保存ボタンを表示(ブロック要素にする)
      document.getElementById('save_to_bookshelf').style.display = 'block';
    }
  });

  // 入力中の目標テキストを一気に消すボタン
  clearGoalText.addEventListener('click', () => {
    document.getElementById('goal_text').value = '';
  });

  // locationモーダルを出す
  saveToBookshelfButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('save_modal').style.display = 'flex';
  });

  // locationモーダルの「キャンセル」
  document.getElementById('cancel_save').addEventListener('click', () => {
    document.getElementById('save_modal').style.display = 'none';
  });

  // locationモーダルの「保存を完了する」
  document.getElementById('confirm_save').addEventListener('click', () => {
    const form = document.getElementById('new_book_form');
    const locationValue = document.getElementById('modal_location_input').value.trim();
    if (!locationValue) {
      alert('本の保管場所を入力してください。');
      return;
    }

    // location を hidden input としてセット
    let locInput = form.querySelector('input[name="location"]');
    if (locInput) {
      locInput.value = locationValue;
    } else {
      const hiddenLoc = document.createElement('input');
      hiddenLoc.type = 'hidden';
      hiddenLoc.name = 'location';
      hiddenLoc.value = locationValue;
      form.appendChild(hiddenLoc);
    }

    // goals[] hidden input を再構築
    form.querySelectorAll('input[name="goals[]"]').forEach(el => el.remove());
    document.querySelectorAll('.goal_item').forEach(item => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'goals[]';
      input.value = item.textContent;
      form.appendChild(input);
    });

    form.submit();
  });

  // Enterキー押下での保存機能
  document.addEventListener('keydown', (event) => {
    const saveModal = document.getElementById('save_modal');
    // モーダルが表示されている(= display: flex;)時のみ処理を実行
    if (saveModal.style.display === 'flex') {
      if (event.key === 'Enter') {
        event.preventDefault();
        // 保管場所の入力チェック
        const locationValue = document.getElementById('modal_location_input').value.trim();
        if (!locationValue) {
          alert('本の保管場所を入力してください。');
          return;
        }
        // confirm_saveボタンのクリック
        document.getElementById('confirm_save').click();
      }
    }
  });
});
