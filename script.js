document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const wallpapers = document.querySelectorAll('.wallpaper');
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popup-image');
    const popupInfo = document.getElementById('popup-info');
    const closePopup = document.querySelector('.close');

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            wallpapers.forEach(wallpaper => {
                const wallpaperCategories = wallpaper.getAttribute('data-category').split(' ');
                if (category === 'all' || wallpaperCategories.includes(category)) {
                    wallpaper.classList.remove('hidden');
                    setTimeout(() => {
                        wallpaper.style.opacity = '1';
                        wallpaper.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    wallpaper.style.opacity = '0';
                    wallpaper.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        wallpaper.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // Popup functionality
    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const wallpaperId = this.getAttribute('data-wallpaper-id');
            const wallpaperElement = this.closest('.wallpaper');
            const wallpaperImage = wallpaperElement.querySelector('img');
            const wallpaperTitle = wallpaperElement.querySelector('h3').textContent;
            const wallpaperSize = wallpaperElement.querySelector('.wallpaper-size').textContent;
            const wallpaperDescription = wallpaperElement.querySelector('p:not(.wallpaper-size)').textContent;

            popupImage.src = wallpaperImage.src;
            popupImage.alt = wallpaperTitle;
            popupInfo.innerHTML = `
                <h2>${wallpaperTitle}</h2>
                <p>${wallpaperSize}</p>
                <p>${wallpaperDescription}</p>
            `;
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closePopup.addEventListener('click', closePopupFunction);

    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            closePopupFunction();
        }
    });

    function closePopupFunction() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Download functionality
    document.querySelectorAll('.download-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const wallpaperElement = this.closest('.wallpaper');
            const wallpaperImage = wallpaperElement.querySelector('img');
            const wallpaperTitle = wallpaperElement.querySelector('h3').textContent;
            
            fetch(wallpaperImage.src)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = wallpaperTitle.replace(/\s+/g, '_') + '.jpg';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => console.error('Error downloading image:', error));
        });
    });
});