document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header_search_input'); // 入力フィールド
  const searchBox = document.querySelector('.header_search'); // 検索ボックス
  const userIcon = document.querySelector('.header_user_icon'); // ユーザーアイコン
  const userMenuCard = document.querySelector('.header_user_menu_card'); // ユーザーメニューカード
  const openLogoutDialogButton = document.querySelector('.header_user_logout_btn'); // ログアウトダイアログを表示するボタン
  const logoutButton = document.querySelector('.dialog_logout_btn'); // ログアウトボタン
  const cancelButton = document.querySelector('.dialog_cancel_btn'); // キャンセルボタン
  const dialogOverlay = document.querySelector('.dialog_overlay'); // ダイアログオーバーレイ
  const dialogCard = document.querySelector('.dialog_card'); // ダイアログカード

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
      if (event.key === 'Escape' && dialogOverlay) {
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
    const clearButton = document.querySelector('.header_search_clear_btn'); // バツボタン
    let blurTimeout; // blurイベントの遅延用タイマー

    // バツボタンの表示/非表示を制御する関数
    const toggleClearButton = () => {
      if (searchInput.value.length > 0 && document.activeElement === searchInput) {
        clearButton.classList.remove('hidden');
      } else {
        clearButton.classList.add('hidden');
      }
    };

    // フォーカス時にクラスを追加し、枠線を青色に変更
    searchInput.addEventListener('focus', () => {
      searchBox.classList.add('header_search_focus');
      toggleClearButton();
    });

    // フォーカスが外れたらクラスを削除し、枠線をもとに戻す
    // setTimeoutで遅延を入れて、バツボタンのクリックイベントが先に発火するようにする
    searchInput.addEventListener('blur', () => {
      blurTimeout = setTimeout(() => {
        searchBox.classList.remove('header_search_focus');
        toggleClearButton();
      }, 10); // 10ms遅延
    });

    // 入力時にバツボタンの表示/非表示を更新
    searchInput.addEventListener('input', () => {
      toggleClearButton();
    });

    // バツボタンをクリックした時に入力フィールドをクリア
    if (clearButton) {
      clearButton.addEventListener('mousedown', (event) => {
        event.preventDefault(); // blurイベントを防ぐ
        event.stopPropagation(); // イベントの伝播を止める
      });

      clearButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(blurTimeout); // 遅延されたblurイベントをキャンセル
        searchInput.value = '';
        searchInput.focus(); // クリア後もフォーカスを維持
        toggleClearButton();
      });
    }
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
      if (event.key === 'Escape' && userMenuCard) {
        userMenuCard.classList.remove('visible');
      }
    });
  }

  // ログアウトボタンが表示されている状態で、Enterキーが押された場合、ログアウトボタンをクリックしたことにする
  document.addEventListener('keydown', (event) => {
    if (logoutButton && event.key === 'Enter' && dialogOverlay &&
      // ダイアログオーバーレイ(半透明の黒かぶせ)のclassにhiddenがない場合
      !dialogOverlay.classList.contains('hidden')) {
      event.preventDefault();
      logoutButton.click(); // ログアウトボタンをクリック
    }
  });
});
