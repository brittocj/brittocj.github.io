// Navbar scroll effect
$(window).scroll(function() {
  if ($(this).scrollTop() > 80) {
    $('#tmNav').addClass('scrolled');
  } else {
    $('#tmNav').removeClass('scrolled');
  }
});

// Form submission (Google Apps Script)
document.getElementById('discovery-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();

  const recaptcha = grecaptcha.getResponse();
  if (!recaptcha) {
    alert('Please complete the reCAPTCHA verification.');
    return;
  }

  const formData = new FormData(this);
  formData.append('g-recaptcha-response', recaptcha);

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyZ-Pm1c6l7uoGO4a9ubo9WMStSIrhLOFQJRaxfV1Ad0XChgvzuJIfOZ8vnCGydbCQzjQ/exec',
      { method: 'POST', body: formData }
    );

    if (response.ok) {
      alert('Thank you! Your questionnaire has been submitted successfully.\nWe will get back to you soon.');
      this.reset();
      grecaptcha.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    console.error(err);
    alert('Sorry, there was an error submitting the form. Please try again.');
    grecaptcha.reset();
  }
});
