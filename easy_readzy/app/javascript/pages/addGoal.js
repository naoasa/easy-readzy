document.addEventListener('DOMContentLoaded', () => {
  const showAddGoalFormButton = document.getElementById('show_add_goal_form');
  const addGoalForm = document.getElementById('add_goal_form');
  const goalTextarea = document.getElementById('goal_goal_text');
  const goalCountDisplay = document.getElementById('goal_text_count_show');
  const clearGoalTextButton = document.getElementById('clear_goal_text_show');

  // 目標追加フォームの表示/非表示
  if (showAddGoalFormButton && addGoalForm) {
    showAddGoalFormButton.addEventListener('click', () => {
      if (addGoalForm.style.display === 'none' || addGoalForm.style.display === '') {
        addGoalForm.style.display = 'block';
        // フォーム表示時にフォーカス
        if (goalTextarea) {
          goalTextarea.focus();
        }
      } else {
        addGoalForm.style.display = 'none';
      }
    });
  }

  // 文字数カウント機能
  const updateGoalCount = () => {
    if (!goalTextarea || !goalCountDisplay) return;

    const currentLength = goalTextarea.value.length;
    const maxLength = 500;
    goalCountDisplay.textContent = currentLength;

    // 文字数が上限に近づいたら色を変更
    const countContainer = goalCountDisplay.parentElement;
    if (currentLength > maxLength * 0.9) {
      countContainer.classList.add('warning');
    } else {
      countContainer.classList.remove('warning');
    }
  };

  if (goalTextarea && goalCountDisplay) {
    // 入力制限: 500文字を超えないようにする
    goalTextarea.addEventListener('input', (e) => {
      const maxLength = 500;
      if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
      updateGoalCount();
    });

    goalTextarea.addEventListener('keyup', updateGoalCount);
    updateGoalCount(); // 初期表示
  }

  // クリアボタンのクリックでテキストエリアをクリア
  if (clearGoalTextButton && goalTextarea) {
    clearGoalTextButton.addEventListener('click', () => {
      goalTextarea.value = '';
      updateGoalCount();
    });
  }
});
