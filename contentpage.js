const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Fetch movie data from the centralized JSON file
fetch('movies.json')
    .then(response => response.json())
    .then(movies => {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            searchResults.innerHTML = ''; // Clear previous results

            if (query.length > 0) {
                movies.forEach(movie => {
                    const title = movie.title.toLowerCase();
                    const details = movie.details.toLowerCase();

                    // Check if the query matches the title or details
                    if (title.includes(query) || details.includes(query)) {
                        const resultItem = document.createElement('div');
                        resultItem.classList.add('result-item');
                        resultItem.innerHTML = `
                            <a href="${movie.link}" class="result-link">
                                <div class="result-content">
                                    <div class="result-poster">
                                        <img src="${movie.poster}" alt="${movie.title}">
                                    </div>
                                    <div class="result-details">
                                        <div class="movie-name">${movie.title}</div>
                                        <div class="movie-description">${movie.details}</div>
                                    </div>
                                </div>
                            </a>
                        `;
                        searchResults.appendChild(resultItem);
                    }
                });

                // If no results, show a message
                if (searchResults.innerHTML === '') {
                    searchResults.innerHTML = '<p class="no-results">No results found. Please check the name again.</p>';
                }
            }
        });
    })
    .catch(error => console.error('Error loading movie data:', error));
