document.addEventListener('DOMContentLoaded', () => {
  const flash = document.querySelector('.flash');
  const closeFlash = document.getElementById('close_flash');

  if (flash) {
    // 5秒後にフェードアウト
    setTimeout(() => {
      flash.classList.add('fade-out');
    }, 5000); // 5秒後にfade-outクラスを追加

    // バツ印をクリックで即時フェードアウト
    if (closeFlash) {
      closeFlash.addEventListener('click', () => {
        flash.classList.add('fade-out');
      });
    }
  }
});
