document.addEventListener('DOMContentLoaded', () => {
  // 文字数カウント機能を追加する関数
  const setupCharacterCount = (textarea, countDisplay) => {
    if (!textarea || !countDisplay) return;

    const updateCount = () => {
      const currentLength = textarea.value.length;
      const maxLength = parseInt(textarea.getAttribute('maxlength')) || 5000;
      countDisplay.textContent = currentLength;

      // 文字数が上限に近づいたら色を変更
      const countContainer = countDisplay.parentElement;
      if (currentLength > maxLength * 0.9) {
        countContainer.classList.add('warning');
      } else {
        countContainer.classList.remove('warning');
      }
    };

    textarea.addEventListener('input', updateCount);
    textarea.addEventListener('keyup', updateCount);
    updateCount(); // 初期表示
  };

  // 既存のoutput_textテキストエリアに文字数カウントを設定
  document.querySelectorAll('textarea[name="output[output_text]"]').forEach(textarea => {
    const countDisplay = textarea.parentElement.querySelector('.output_text_count');
    if (countDisplay) {
      setupCharacterCount(textarea, countDisplay);
    }
  });

  // 「アウトプット作成」ボタンのクリックでフォーム表示/非表示
  document.querySelectorAll('.create_output_btn').forEach(button => {
    button.addEventListener('click', () => {
      // .goal_item内の.output_formを取得
      const goalItem = button.closest('.goal_item');
      const form = goalItem.querySelector('.output_form');
      if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        // フォーム表示時に文字数カウントを設定
        const textarea = form.querySelector('textarea[name="output[output_text]"]');
        const countDisplay = form.querySelector('.output_text_count');
        if (textarea && countDisplay) {
          setupCharacterCount(textarea, countDisplay);
        }
      } else {
        form.style.display = 'none';
      }
    });
  });

  // クリアボタンのクリックでテキストエリアをクリア
  document.querySelectorAll('#clear_output_text').forEach(clearBtn => {
    clearBtn.addEventListener('click', () => {
      const form = clearBtn.closest('.output_form');
      const textarea = form.querySelector('textarea');
      if (textarea) {
        textarea.value = '';
        // 文字数カウントを更新
        const countDisplay = form.querySelector('.output_text_count');
        if (countDisplay) {
          countDisplay.textContent = '0';
          const countContainer = countDisplay.parentElement;
          countContainer.classList.remove('warning');
        }
      }
    });
  });
});
