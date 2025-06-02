document.addEventListener('DOMContentLoaded', () => {
  // 「マイ本棚から削除」ボタン
  const showModalButton = document.getElementById('show_delete_modal');
  // モーダル本体
  const modal = document.getElementById('delete_book_modal');
  // キャンセルボタン
  const cancelButton = document.getElementById('cancel_delete');

  // モーダルの表示/非表示
  if (showModalButton && modal && cancelButton) {
    showModalButton.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    cancelButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
});
