document.addEventListener('DOMContentLoaded', () => {
  // 「マイ本棚から削除」ボタン
  const showModalButton = document.getElementById('show_delete_modal');
  // モーダル本体
  const modal = document.getElementById('delete_book_modal');
  // キャンセルボタン
  const cancelButton = document.getElementById('cancel_delete');
  // ダイアログ本体
  const dialogCard = document.getElementById('delete_book_dialog');

  // モーダルの表示/非表示
  if (showModalButton && modal && cancelButton) {
    showModalButton.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    // キャンセルボタンで非表示
    cancelButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // ダイアログ外クリックで非表示
    modal.addEventListener('click', (e) => {
      // クリックしたのがダイアログ本体でない時は閉じる
      if (!dialogCard.contains(e.target)) {
        modal.style.display = 'none';
      }
    });

    // Escキーで非表示
    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'flex' && e.key === 'Escape') {
        modal.style.display = 'none';
      }
    });
  }
});
