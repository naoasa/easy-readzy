document.addEventListener('DOMContentLoaded', () => {
  // 「アウトプット作成」ボタンのクリックでフォーム表示/非表示
  document.querySelectorAll('.create_output_btn').forEach(button => {
    button.addEventListener('click', () => {
      // .goal_item内の.output_formを取得
      const goalItem = button.closest('.goal_item');
      const form = goalItem.querySelector('.output_form');
      if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
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
      if (textarea) textarea.value = '';
    });
  });
});
