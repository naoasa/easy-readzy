document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header_search_input'); // 入力フィールド
  const searchBox = document.querySelector('.header_search'); // 検索ボックス
  const userIcon = document.querySelector('.header_user_icon'); // ユーザーアイコン
  const userMenuCard = document.querySelector('.header_user_menu_card'); // ユーザーメニューカード
  const openLogoutDialogButton = document.querySelector('.header_user_logout_btn'); // ログアウトダイアログを表示するボタン
  const logoutButton = document.querySelector('.dialog_logout_btn'); // ログアウトボタン
  const cancelButton = document.querySelector('.dialog_cancel_btn'); // キャンセルボタン
  const dialogOverlay = document.querySelector('.dialog_overlay'); // ダイアログオーバーレイ
  const dialogCard = document.querySelector('.logout_dialog_card'); // ダイアログカード

  if (openLogoutDialogButton) {
    // ログアウトボタンをクリックした時にダイアログを表示し、ユーザーメニューカードを非表示にする
    openLogoutDialogButton.addEventListener('click', (event) => {
      event.preventDefault(); // デフォルトの動作をキャンセル
      dialogOverlay.classList.remove('hidden');
      userMenuCard.classList.remove('visible');
    });

    // キャンセルボタンをクリックした時にダイアログを非表示にする
    cancelButton.addEventListener('click', () => {
      dialogOverlay.classList.add('hidden');
    });

    // Escキーを押した時にダイアログを非表示にする(=> class: hiddenを追加する)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        dialogOverlay.classList.add('hidden');
      }
    });

    // ダイアログの外をクリックした時にダイアログを非表示にする(=> class: hiddenを追加する)
    document.addEventListener('click', (event) => {
      if (dialogOverlay && !dialogCard.contains(event.target) && !openLogoutDialogButton.contains(event.target)) {
        dialogOverlay.classList.add('hidden');
      }
    });
  }

  if (searchInput && searchBox) {
    // フォーカス時にクラスを追加し、枠線を青色に変更
    searchInput.addEventListener('focus', () => {
      searchBox.classList.add('header_search_focus');
    });

    // フォーカスが外れたらクラスを削除し、枠線をもとに戻す
    searchInput.addEventListener('blur', () => {
      searchBox.classList.remove('header_search_focus');
    });
  }

  if (userIcon && userMenuCard) {
    // ユーザーアイコンをクリックした時にメニューを表示する(=> class: visibleを追加する)
    userIcon.addEventListener('click', () => {
      userMenuCard.classList.toggle('visible');
    });

    // 要素外をクリックした時にメニューを非表示にする(=> class: visibleを削除する)
    document.addEventListener('click', (event) => {
      if (!userMenuCard.contains(event.target) && !userIcon.contains(event.target)) {
        userMenuCard.classList.remove('visible');
      }
    });

    // Escキーを押した時にメニューを非表示にする(=> class: visibleを削除する)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        userMenuCard.classList.remove('visible');
      }
    });
  }

  // ログアウトボタンが表示されている状態で、Enterキーが押された場合、ログアウトボタンをクリックしたことにする
  document.addEventListener('keydown', (event) => {
    if (logoutButton && event.key === 'Enter') {
      event.preventDefault();
      logoutButton.click(); // ログアウトボタンをクリック
    }
  });
});
