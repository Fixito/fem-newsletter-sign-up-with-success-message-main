const form = document.querySelector('.newsletter__form');
const modalBtn = document.querySelector('.modal .btn');
const modalOverlay = document.querySelector('.modal__overlay');
const emailInput = document.querySelector('.newsletter__input');
const emailErrorField = document.querySelector('#email-error');
const modalEmail = document.querySelector('.modal__email');

form.setAttribute('novalidate', '');

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email } = Object.fromEntries(formData);

  const errors = {
    fieldErrors: {
      email: [],
    },
  };

  const isValidEmail =
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

  if (!email || !isValidEmail.test(email)) {
    errors.fieldErrors.email.push('Valid email required');
  }

  const hasErrors = Object.values(errors.fieldErrors).some(
    (fieldErrors) => fieldErrors.length
  );

  if (hasErrors) {
    emailErrorField.textContent = errors.fieldErrors.email.join(', ');
    emailInput.classList.add('invalid');
    emailInput.focus();
  } else {
    emailErrorField.textContent = '';
    emailInput.classList.remove('invalid');
    modalEmail.textContent = email;
    modalOverlay.classList.add('modal--active');
  }
};

form.addEventListener('submit', handleSubmit);

modalBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('modal--active');
});
