function onClickHandler(ev) {
    var el = window._protected_reference = document.createElement("INPUT");
    el.type = "file";
    el.accept = "image/*";
    el.multiple = "multiple"; // remove to have a single file selection
    
    // (cancel will not trigger 'change')
    el.addEventListener('change', function(ev2) {
      // access el.files[] to do something with it (test its length!)
      
      // add first image, if available
      if (el.files.length) {
        document.getElementById('out').src = URL.createObjectURL(el.files[0]);
      }
  
  
      // test some async handling
      new Promise(function(resolve) {
        setTimeout(function() { console.log(el.files); resolve(); }, 1000);
      })
      .then(function() {
        // clear / free reference
        el = window._protected_reference = undefined;
      });
  
    });
  
    el.click(); // open
  }

  function slidesPlugin (activeSlide = 0) {
    const slides = document.querySelectorAll('.slide');

    slides[activeSlide].classList.add('active')
    
    for (const slide of slides) {
        slide.addEventListener('click', () => {
            clearActiveClasses()
            
            slide.classList.add('active')
        })
    }
    
    function clearActiveClasses() {
        slides.forEach((slide) => {
          slide.classList.remove('active')
        })
    }
}
 
slidesPlugin(3);