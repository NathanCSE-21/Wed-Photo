const itemsPerPage = 12; // Number of images to display per page
const totalImages = 219; // Total number of images
let currentPage = 1; // Current page

function fetchImages(page) {
  const imageContainer = document.getElementById('image-container');
  const paginationContainer = document.querySelector('.pagination');

  // Store the buttons HTML in variables
  const prevButtonHTML = '<button id="prev-btn">Back</button>';
  const nextButtonHTML = '<button id="next-btn">Next</button>';

  // Clear previous content
  imageContainer.innerHTML = '';
  paginationContainer.innerHTML = prevButtonHTML + nextButtonHTML;

  // Calculate start and end index of images to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  // Generate image elements and append them to the image container
  for (let i = startIndex; i < endIndex && i < totalImages; i++) {
    const imageLink = document.createElement('a');
    imageLink.href = `photos/image${i + 1}.jpg`;
    imageLink.download = `image${i + 1}.jpg`;
    imageContainer.appendChild(imageLink);

    const image = document.createElement('img');
    image.classList.add('image');
    image.src = `photos/image${i + 1}.jpg`;
    image.alt = `Image ${i + 1}`;
    imageContainer.appendChild(image);
  }

  // Generate Next and Back buttons
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');

  // Enable/disable buttons based on current page
  prevButton.disabled = page === 1;
  nextButton.disabled = page === Math.ceil(totalImages / itemsPerPage);

  // Event listener for previous button
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchImages(currentPage);
    }
  });

  // Event listener for next button
  nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(totalImages / itemsPerPage)) {
      currentPage++;
      fetchImages(currentPage);
    }
  });
}

// Initialize the page with the first set of images (page 1)
fetchImages(currentPage);
