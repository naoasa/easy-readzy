document.addEventListener('DOMContentLoaded', () => {
  const clearOutputText = document.getElementById('clear_output_text'); // アウトプットテキストの取り消しボタン
  document.querySelectorAll('.create_output_btn').forEach(button => {
    button.addEventListener('click', () => {
      const form = button.nextElementSibling;
      if(form.style.display === 'none') {
        form.style.display = 'block';
      } else {
        form.style.display = 'none';
      }
    });
  });

  // アウトプットテキスト入力のクリアボタン
  clearOutputText.addEventListener('click', () => {
    document.getElementById('output_output_text').value = '';
  });
});
