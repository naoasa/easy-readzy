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
  const form = document.getElementById('new_book_form');
  let isSubmitting = false; // フォームが送信中であるか判定するため(二重送信防止用)

  // 目標テキストの文字数カウント
  const goalTextarea = document.getElementById('goal_text');
  const goalCountDisplay = document.getElementById('goal_text_count');

  if (goalTextarea && goalCountDisplay) {
    const updateGoalCount = () => {
      const currentLength = goalTextarea.value.length;
      const maxLength = 500;
      goalCountDisplay.textContent = currentLength;

      // 文字数が上限に近づいたら色を変更
      if (currentLength > maxLength * 0.9) {
        goalCountDisplay.parentElement.classList.add('warning');
      } else {
        goalCountDisplay.parentElement.classList.remove('warning');
      }
    };

    goalTextarea.addEventListener('input', updateGoalCount);
    goalTextarea.addEventListener('keyup', updateGoalCount);
    updateGoalCount(); // 初期表示
  }

  // 目標追加ボタンをクリックした時にテキストエリアの文字をgoalTextに格納
  addGoalButton.addEventListener('click', () => {
    const goalText = document.getElementById('goal_text').value;

    if (goalText.trim() !== '') {
      const goalItem = document.createElement('div');
      goalItem.className = 'goal_item';

      const textCard = document.createElement('div');
      textCard.className = 'text_card';
      textCard.textContent = goalText;

      goalItem.appendChild(textCard);
      goalsList.appendChild(goalItem);

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
    // 既に送信中の場合は処理を中断
    if (isSubmitting) {
      return;
    }

    const locationValue = document.getElementById('modal_location_input').value.trim();
    if (!locationValue) {
      alert('本の保管場所を入力してください。');
      return;
    }

    // 送信フラグを立てる(二重送信防止用)
    isSubmitting = true;

    // 送信中の場合はボタンを無効化(二重送信防止用)
    const confirmSaveButton = document.getElementById('confirm_save');
    confirmSaveButton.disabled = true;

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
    // 保存モーダル表示かつ送信中でない場合
    if (saveModal.style.display === 'flex' && !isSubmitting) {
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

  // フォームのsubmitイベントでも二重送信を防ぐ
  form.addEventListener('submit', (event) => {
    if (isSubmitting) {
      event.preventDefault();
      return false;
    }
    isSubmitting = true;
  });
});
