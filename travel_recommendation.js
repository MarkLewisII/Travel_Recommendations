let travelData = []; // store data globally

// Fetch JSON data
fetch('./travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load JSON file.");
    }
    return response.json();
  })
  .then(data => {
    travelData = data; // save for later use in handleSearch
    console.log("Data loaded:", travelData);
  })
  .catch(error => {
    console.error("Error:", error);
  });

function handleSearch(query) {
  // normalize query (case-insensitive)
  const searchTerm = query.trim().toLowerCase();

  // find substring matches
  let matches = [];

  if (Array.isArray(travelData)) {
    matches = travelData.filter(item => 
      JSON.stringify(item).toLowerCase().includes(searchTerm)
    );
  } else if (typeof travelData === "object") {
    // if JSON is object with keys
    Object.keys(travelData).forEach(key => {
      if (key.toLowerCase().includes(searchTerm) || 
          JSON.stringify(travelData[key]).toLowerCase().includes(searchTerm)) {
        matches.push({ key, value: travelData[key] });
      }
    });
  }

  // display results in the div
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = ""; // clear old results

  if (matches.length === 0) {
    resultsDiv.innerHTML = "<p>No matches found.</p>";
  } else {
    matches.forEach(match => {
      const p = document.createElement("p");
      p.textContent = typeof match === "object" ? JSON.stringify(match) : match;
      resultsDiv.appendChild(p);
    });
  }
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