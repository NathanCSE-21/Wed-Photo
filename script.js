const imageContainer = document.getElementById("image-container");
const paginationContainer = document.getElementById("pagination");

const imagesPerPage = 12; // Number of images to display per page
let currentPage = 1;
let images = [];

// Fetch images from the "photos" folder
fetchImages();

// Function to fetch images from the "photos" folder
function fetchImages() {
  // Make an AJAX request or fetch API call to retrieve image URLs from the server
  // You can use server-side technologies like Node.js, PHP, etc., to read the images from the folder and send them as a response
  // For demonstration purposes, we'll use a static array of image URLs

  // Replace this with your server-side logic to retrieve image URLs
  const imageUrls = [
    "photos/image1.jpg",
    "photos/image2.jpg",
    "photos/image3.jpg",
    // Add more image URLs here
  ];

  images = imageUrls;
  renderImages();
}

// Function to render the images on the page
function renderImages() {
  // Clear the image container
  imageContainer.innerHTML = "";

  // Calculate the starting and ending indexes of the current page
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  // Slice the array of images based on the current page
  const currentImages = images.slice(startIndex, endIndex);

  // Loop through the current images and create HTML elements to display them
  currentImages.forEach((imageUrl) => {
    const imageItem = document.createElement("div");
    imageItem.classList.add("image-item");

    const image = document.createElement("img");
    image.src = imageUrl;

    imageItem.appendChild(image);
    imageContainer.appendChild(imageItem);
  });

  // Render pagination
  renderPagination();
}

// Function to render the pagination
function renderPagination() {
  // Clear the pagination container
  paginationContainer.innerHTML = "";

  // Calculate the total number of pages based on the number of images
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Create pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("page-button");

    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderImages();
    });

    paginationContainer.appendChild(pageButton);
  }
}
