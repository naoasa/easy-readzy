document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header_search_input'); // 入力フィールド
  const searchBox = document.querySelector('.header_search'); // 検索ボックス
  const userIcon = document.querySelector('.header_user_icon'); // ユーザーアイコン
  const userMenuCard = document.querySelector('.header_user_menu_card'); // ユーザーメニューカード

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
});
