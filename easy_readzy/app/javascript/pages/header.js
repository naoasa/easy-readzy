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
  const suggestionsContainer = document.querySelector('#search_suggestions');
  let suggestTimeout;
  let currentSuggestions = [];

  // サジェストを取得する関数
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      hideSuggestions();
      return;
    }

    try {
      const response = await fetch(`/books/suggest?query=${encodeURIComponent(query)}`);
      const suggestions = await response.json();
      currentSuggestions = suggestions;
      displaySuggestions(suggestions);
    } catch (error) {
      console.error('サジェスト取得エラー:', error);
      hideSuggestions();
    }
  };

  // サジェストを表示する関数
  const displaySuggestions = (suggestions) => {
    if (!suggestionsContainer) return;

    if (suggestions.length === 0) {
      hideSuggestions();
      return;
    }

    suggestionsContainer.innerHTML = suggestions.map((book, index) => `
      <div class="suggestion_item" data-index="${index}" data-google-books-id="${book.id}">
        ${book.thumbnail ? `<img src="${book.thumbnail}" alt="${book.title}" class="suggestion_thumbnail">` : ''}
        <div class="suggestion_info">
          <div class="suggestion_title">${escapeHtml(book.title)}</div>
          <div class="suggestion_author">${escapeHtml(book.authors)}</div>
        </div>
      </div>
    `).join('');

    suggestionsContainer.classList.remove('hidden');

    // サジェスト項目のクリックイベント
    suggestionsContainer.querySelectorAll('.suggestion_item').forEach((item) => {
      item.addEventListener('click', () => {
        const googleBooksId = item.dataset.googleBooksId;
        const form = searchInput.closest('form');
        if (form) {
          // 検索ページにリダイレクト（サジェストのタイトルで検索）
          const title = item.querySelector('.suggestion_title').textContent;
          searchInput.value = title;
          form.submit();
        }
      });
    });
  };

  // サジェストを非表示にする関数
  const hideSuggestions = () => {
    if (suggestionsContainer) {
      suggestionsContainer.classList.add('hidden');
      suggestionsContainer.innerHTML = '';
    }
  };

  // HTMLエスケープ関数
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

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

      if (searchInput.value.trim().length >= 2) {
        fetchSuggestions(searchInput.value.trim());
      }
    });

    // フォーカスが外れたらクラスを削除し、枠線をもとに戻す
    // setTimeoutで遅延を入れて、バツボタンのクリックイベントが先に発火するようにする
    searchInput.addEventListener('blur', () => {
      blurTimeout = setTimeout(() => {
        searchBox.classList.remove('header_search_focus');
        toggleClearButton();
        hideSuggestions();
      }, 200); // サジェストクリックを待つため少し長めに
    });

    // 入力時にバツボタンの表示/非表示を更新
    searchInput.addEventListener('input', () => {
      toggleClearButton();

      // 既存のタイマーをクリア
      clearTimeout(suggestTimeout);

      const query = searchInput.value.trim();

      // 300ms後にサジェストを取得（デバウンス）
      suggestTimeout = setTimeout(() => {
        fetchSuggestions(query);
      }, 300);
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
        clearTimeout(suggestTimeout);
        searchInput.value = '';
        searchInput.focus(); // クリア後もフォーカスを維持
        toggleClearButton();
        hideSuggestions();
      });
    }

    // キーボード操作（矢印キー、Enterキー）
    searchInput.addEventListener('keydown', (event) => {
      if (!suggestionsContainer || suggestionsContainer.classList.contains('hidden')) {
        return;
      }

      const items = suggestionsContainer.querySelectorAll('.suggestion_item');
      const currentIndex = Array.from(items).findIndex(item => item.classList.contains('selected'));

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          items.forEach(item => item.classList.remove('selected'));
          if (items[nextIndex]) {
            items[nextIndex].classList.add('selected');
            items[nextIndex].scrollIntoView({ block: 'nearest' });
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items.forEach(item => item.classList.remove('selected'));
          if (items[prevIndex]) {
            items[prevIndex].classList.add('selected');
            items[prevIndex].scrollIntoView({ block: 'nearest' });
          }
          break;
        case 'Enter':
          if (currentIndex >= 0 && items[currentIndex]) {
            event.preventDefault();
            items[currentIndex].click();
          }
          break;
        case 'Escape':
          hideSuggestions();
          break;
      }
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
