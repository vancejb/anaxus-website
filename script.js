document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the last active tab from localStorage, default to 'home' if not set
  const lastSection = localStorage.getItem('activeSection') || 'home';
  loadContent(lastSection); // Load the last section on page load

  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // Prevent page reload
      const section = link.getAttribute('data-section');
      loadContent(section);

      // Save the selected section in localStorage
      localStorage.setItem('activeSection', section);
    });
  });
});

function loadContent(section) {
  const contentDiv = document.getElementById('content');

  // Display a loading indicator while content is being fetched
  contentDiv.innerHTML = `
    <div class="loading">
      <p>Loading...</p>
    </div>
  `;

  // Fetch the section content from its respective HTML file
  fetch(`${section}.html`)
    .then(response => response.text())
    .then(data => {
      contentDiv.innerHTML = data; // Replace the loading indicator with content
    })
    .catch(error => {
      console.error('Error loading section:', error);
      contentDiv.innerHTML = '<p>Failed to load content. Please try again.</p>';
    });
}