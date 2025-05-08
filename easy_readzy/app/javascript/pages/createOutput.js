document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.create_output_btn').forEach(button => {
    button.addEventListener('click', () => {
      const form = button.nextElementSibling;
      if(form.style.display === 'none') {
        form.style.display = 'block';
      } else {
        form.style.display = 'none';
      }
    });
  });
});
