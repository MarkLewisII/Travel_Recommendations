fetch('./travel_recommendation_api.json')
.then(response => {
    if (!response.ok) {
        throw new Error("Failed to load JSON file.");
    }
    return response.json();
})
.then(data=>{
    if(Array.isArray(data)) {
        data.forEach((item, index) => {
            console.log(`Item ${index}:`, item);
        });
    } else {
        Object.keys(data).forEach(key => {
            console.log(`key: ${key}, value:`, data[key]);
        });
    }
})
.catch(error => {
    console.error("Error:", error);
});