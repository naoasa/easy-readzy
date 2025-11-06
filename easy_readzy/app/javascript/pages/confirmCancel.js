document.addEventListener('DOMContentLoaded', () => {
  const cancel = document.getElementById('cancel_edit');
  if (!cancel) return;
  cancel.addEventListener('click', (e) => {
    if (!window.confirm('編集中の内容は保存されません。キャンセルして本の詳細に戻りますか？')) {
      e.preventDefault();
    }
  });
});
