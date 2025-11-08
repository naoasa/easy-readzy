document.addEventListener('DOMContentLoaded', () => {
  const showEditLocationFormButton = document.getElementById('show_edit_location_form');
  const editLocationForm = document.getElementById('edit_location_form');
  const locationDisplay = document.getElementById('location_display');
  const cancelEditLocationButton = document.getElementById('cancel_edit_location');

  // 編集フォームの表示/非表示
  if (showEditLocationFormButton && editLocationForm) {
    showEditLocationFormButton.addEventListener('click', () => {
      if (editLocationForm.style.display === 'none' || editLocationForm.style.display === '') {
        editLocationForm.style.display = 'block';
        // フォーム表示時にフォーカス
        const locationInput = editLocationForm.querySelector('input[name="location"]');
        if (locationInput) {
          locationInput.focus();
        }
      } else {
        editLocationForm.style.display = 'none';
      }
    });
  }

  // キャンセルボタンでフォームを非表示
  if (cancelEditLocationButton && editLocationForm) {
    cancelEditLocationButton.addEventListener('click', (e) => {
      e.preventDefault();
      editLocationForm.style.display = 'none';
    });
  }
});
