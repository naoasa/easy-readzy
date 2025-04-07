document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header_search_input'); // 入力フィールド
  const searchBox = document.querySelector('.header_search'); // 検索ボックス

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
});
