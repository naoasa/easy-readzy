document.addEventListener('DOMContentLoaded', () => {
  const flash = document.querySelector('.flash');
  if (flash) {
    setTimeout(() => {
      flash.classList.add('fade-out');
    }, 5000); // 5秒後にfade-outクラスを追加
  }
});
