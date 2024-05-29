function onClickHandler(ev) {
    var el = window._protected_reference = document.createElement("INPUT");
    el.type = "file";
    el.accept = "image/*";
    el.multiple = "multiple"; // remove to have a single file selection

    el.addEventListener('change', function(ev2) {
        if (el.files.length) {
            let images = [];

            // Loop through the selected files
            for (let i = 0; i < el.files.length; i++) {
                let file = el.files[i];
                let reader = new FileReader();

                reader.onload = function(e) {
                    let imgURL = e.target.result;

                    // Create a new slide
                    let newSlide = document.createElement('div');
                    newSlide.classList.add('slide');
                    newSlide.style.backgroundImage = `url('${imgURL}')`;

                    // Create a delete button
                    let deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-btn');
                    deleteButton.innerText = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        deleteImage(imgURL);
                        newSlide.remove();
                    });

                    newSlide.appendChild(deleteButton);

                    // Append new slide to the container-slider
                    document.querySelector('.container-slider').appendChild(newSlide);

                    // Save image data to array
                    images.push(imgURL);

                    // Save images to localStorage after the last file is processed
                    if (i === el.files.length - 1) {
                        saveImagesToLocalStorage(images);
                        slidesPlugin();
                    }
                };

                reader.readAsDataURL(file);
            }
        }

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

function saveImagesToLocalStorage(images) {
    let storedImages = JSON.parse(localStorage.getItem('slides')) || [];
    storedImages = storedImages.concat(images);
    localStorage.setItem('slides', JSON.stringify(storedImages));
}

function loadImagesFromLocalStorage() {
    let storedImages = JSON.parse(localStorage.getItem('slides')) || [];
    storedImages.forEach(imgURL => {
        let newSlide = document.createElement('div');
        newSlide.classList.add('slide');
        newSlide.style.backgroundImage = `url('${imgURL}')`;

        // Create a delete button
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteImage(imgURL);
            newSlide.remove();
        });

        newSlide.appendChild(deleteButton);

        // Append new slide to the container-slider
        document.querySelector('.container-slider').appendChild(newSlide);
    });

    slidesPlugin();
}

function deleteImage(imageURL) {
    let storedImages = JSON.parse(localStorage.getItem('slides')) || [];
    storedImages = storedImages.filter(img => img !== imageURL);
    localStorage.setItem('slides', JSON.stringify(storedImages));
}

function slidesPlugin(activeSlide = 0) {
    const slides = document.querySelectorAll('.slide');

    if (slides.length > 0) {
        slides[activeSlide].classList.add('active');
    }

    for (const slide of slides) {
        slide.addEventListener('click', () => {
            clearActiveClasses();
            slide.classList.add('active');
        });
    }

    function clearActiveClasses() {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
    }
}

// Load images from localStorage when the page loads
window.onload = function() {
    loadImagesFromLocalStorage();
};
