let travelData = {}; // store data globally

// Fetch JSON data
fetch('./travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load JSON file.");
    }
    return response.json();
  })
  .then(data => {
    travelData = data;
    console.log("Data loaded:", travelData);
  })
  .catch(error => {
    console.error("Error:", error);
  });

function handleSearch(query) {
  const searchTerm = query.trim().toLowerCase();
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = ""; // clear old results

  let matches = [];

  // --- Search in countries -> cities ---
  if (travelData.countries) {
    travelData.countries.forEach(country => {
      country.cities.forEach(city => {
        if (
          city.name.toLowerCase().includes(searchTerm) ||
          city.description.toLowerCase().includes(searchTerm)
        ) {
          matches.push(city);
        }
      });
    });
  }

  // --- Search in temples ---
  if (travelData.temples) {
    travelData.temples.forEach(temple => {
      if (
        temple.name.toLowerCase().includes(searchTerm) ||
        temple.description.toLowerCase().includes(searchTerm)
      ) {
        matches.push(temple);
      }
    });
  }

  // --- Search in beaches ---
  if (travelData.beaches) {
    travelData.beaches.forEach(beach => {
      if (
        beach.name.toLowerCase().includes(searchTerm) ||
        beach.description.toLowerCase().includes(searchTerm)
      ) {
        matches.push(beach);
      }
    });
  }

  // --- Display results ---
  if (matches.length === 0) {
    resultsDiv.innerHTML = "<p>No matches found.</p>";
    return;
  }

  matches.forEach(match => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    card.innerHTML = `
      <img src="${match.imageUrl}" alt="${match.name}">
      <div class="result-content">
        <h3>${match.name}</h3>
        <p>${match.description}</p>
        <button class="visit-btn">Visit</button>
      </div>
    `;

    resultsDiv.appendChild(card);
  });
}


// fetch('./travel_recommendation_api.json')
// .then(response => {
//     if (!response.ok) {
//         throw new Error("Failed to load JSON file.");
//     }
//     return response.json();
// })
// .then(data=>{
//     if(Array.isArray(data)) {
//         data.forEach((item, index) => {
//             console.log(`Item ${index}:`, item);
//         });
//     } else {
//         Object.keys(data).forEach(key => {
//             console.log(`key: ${key}, value:`, data[key]);
//         });
//     }
// })
// .catch(error => {
//     console.error("Error:", error);
// });

// function handleSearch(query) {
//     console.log("Search value:", query);
//     console.log(resultsList);
// }