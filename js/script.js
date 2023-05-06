const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const imgPerPage = 20;

let currentImg = 0;

// Fetch images from photos folder
fetch("/photos")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, "text/html");
    const imgElements = htmlDoc.querySelectorAll("img");

    // Loop through the image elements and add the lazy loading attribute
    imgElements.forEach(img => {
      img.setAttribute("loading", "lazy");
    });

    // Append the image elements to the gallery div
    gallery.append(...imgElements);

    // Show the initial images
    showImages(currentImg);

    // Pagination
    prevBtn.addEventListener("click", () => {
      if (currentImg > 0) {
        currentImg -= imgPerPage;
        showImages(currentImg);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentImg < imgElements.length - imgPerPage) {
        currentImg += imgPerPage;
        showImages(currentImg);
      }
    });
  });

// Display images
function showImages(currentIndex) {
  const images = document.querySelectorAll("img");

  images.forEach(image => {
    image.style.display = "none";
  });

  for (let i = currentIndex; i < currentIndex + imgPerPage; i++) {
    if (images[i]) {
      images[i].style.display = "block";
    }
  }
}
