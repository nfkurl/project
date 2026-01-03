// Very small JS for the simple school project site.

// Put current year in footers
document.querySelectorAll('#year').forEach(function(el){
  el.textContent = new Date().getFullYear();
});

// Simple contact form behavior (demo)
var form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = (document.getElementById('name') || {}).value.trim() || '';
    var email = (document.getElementById('email') || {}).value.trim() || '';
    var phone = (document.getElementById('phone') || {}).value.trim() || '';
    var subject = (document.getElementById('subject') || {}).value.trim() || '';
    var message = (document.getElementById('message') || {}).value.trim() || '';
    var note = document.getElementById('contactNote');
    var submit = document.getElementById('contactSubmit');

    // Basic validation
    if (!name || !email || !subject || !message) {
      note.style.color = 'red';
      note.textContent = 'Please complete all required fields.';
      return;
    }

    // Simulate sending
    submit.disabled = true;
    var originalText = submit.textContent;
    submit.textContent = 'Sending...';
    note.style.color = '#666';
    note.textContent = 'Sending message — please wait.';

    setTimeout(function(){
      // Demo success behaviour: reset form and show confirmation
      note.style.color = 'green';
      note.textContent = 'Thank you, ' + name + '. Your message was received.';
      form.reset();
      submit.disabled = false;
      submit.textContent = originalText;
    }, 900);
  });
}

// Mark the current nav link (basic)
var links = document.querySelectorAll('nav a');
links.forEach(function(a){
  try {
    if (location.pathname.endsWith(a.getAttribute('href'))) {
      a.style.fontWeight = '700';
    }
  } catch(e){}
});

// Simple lightbox for gallery
;(function(){
  var gallery = document.querySelector('.gallery');
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = lightbox && lightbox.querySelector('.lightbox-image');
  var lightboxCaption = lightbox && lightbox.querySelector('.lightbox-caption');
  var closeBtn = lightbox && lightbox.querySelector('.lightbox-close');

  if (!gallery || !lightbox) return;

  gallery.addEventListener('click', function(e){
    var img = e.target.closest('img');
    if (!img) return;
    var src = img.getAttribute('src');
    var caption = img.dataset.caption || img.alt || '';
    openLightbox(src, caption);
  });

  function openLightbox(src, caption){
    lightboxImage.src = src;
    lightboxImage.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
  }

  lightbox.addEventListener('click', function(e){
    if (e.target === lightbox || e.target === closeBtn) closeLightbox();
  });

  document.addEventListener('keydown', function(e){
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
  });
})();

// Activate festival card when page opened with a hash (e.g., festivals.html#homowo)
;(function(){
  function activateCardFromHash(){
    var id = (location.hash || '').replace('#','');
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    document.querySelectorAll('.festival-card').forEach(function(c){ c.classList.remove('active'); });
    target.classList.add('active');
    // smooth scroll into view
    try { target.scrollIntoView({behavior:'smooth', block:'start'}); } catch(e){}
  }

  window.addEventListener('hashchange', activateCardFromHash);
  window.addEventListener('load', activateCardFromHash);
})();

// Ensure homepage videos attempt to play and support hover play/pause
;(function(){
  var vids = document.querySelectorAll('.card-media video');
  if (!vids.length) return;

  vids.forEach(function(v){
    // try to play (some browsers allow muted autoplay)
    try { v.play().catch(function(){}); } catch(e){}

    v.addEventListener('mouseenter', function(){
      try { v.play().catch(function(){}); } catch(e){}
    });

    v.addEventListener('mouseleave', function(){
      try { v.pause(); } catch(e){}
    });
  });
})();