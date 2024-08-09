document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');
    const imagePopup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const closePopup = document.getElementById('closePopup');

    newPostBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const caption = document.getElementById('caption').value;
        const mediaFiles = document.getElementById('mediaFile').files;

        if (mediaFiles.length === 0) return;

        const post = document.createElement('div');
        post.className = 'post';

        // Create and append username with Discord link
        const userElem = document.createElement('p');
        userElem.className = 'username';
        const userLink = document.createElement('a');
        userLink.href = `https://discord.com/users/${username}`; // Replace with actual Discord ID if available
        userLink.textContent = `Posted by ${username}`;
        userLink.target = '_blank'; // Open link in new tab
        userElem.appendChild(userLink);
        post.appendChild(userElem);

        const postContent = document.createElement('div');
        postContent.className = 'post-content';

        // Process each file
        Array.from(mediaFiles).forEach((mediaFile) => {
            const fileReader = new FileReader();

            fileReader.onload = function(e) {
                const mediaURL = e.target.result;

                if (mediaFile.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = mediaURL;
                    img.addEventListener('click', () => {
                        popupImage.src = mediaURL;
                        imagePopup.style.display = 'flex';
                    });
                    postContent.appendChild(img);
                } else if (mediaFile.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = mediaURL;
                    video.controls = true;
                    postContent.appendChild(video);
                }
            };

            fileReader.readAsDataURL(mediaFile);
        });

        post.appendChild(postContent);

        // Create and append caption
        const captionElem = document.createElement('p');
        captionElem.textContent = caption;
        post.appendChild(captionElem);

        postsContainer.appendChild(post);
        modal.style.display = 'none';
        postForm.reset();
    });

    closePopup.addEventListener('click', () => {
        imagePopup.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === imagePopup) {
            imagePopup.style.display = 'none';
        }
    });
});
