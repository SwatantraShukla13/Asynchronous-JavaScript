const clickButton = document.getElementById("button");

const displayDiv = document.getElementById("display");
const buttondiv = document.querySelector(".buttonDiv");

clickButton.addEventListener("click", function (e) {
    e.preventDefault();
    buttondiv.classList.add("movedButton"); // Adding movedButton class to move the button up

    displayDiv.style.display = "block"; // Show the hidden output block
    displayDiv.innerHTML = "<p>Result will be available after 5 sec....</p>"; // Show waiting message

    async function fetchData() {
        try {
            const result = await fetch('https://dummyjson.com/posts'); // Fetching data from API
            if (!result.ok) { // Check if the result is valid
                throw new Error(`Request failed with status: ${result.status}`);
            }
            const data = await result.json();
            return data; // Return the data to the caller
        } catch (err) {
            console.error("Error fetching data:", err); // Log error for debugging
            displayDiv.textContent = `Error: ${err.message}`; // Display error message in UI
        }
    }

    // Call fetchData function and handle the result or error
    fetchData().then(data => {
        if (data) {
            // Extract titles and format them into a string
            const titles = data.posts.map(post => post.title).join('<br>');
            displayDiv.innerHTML = `<p>${titles}</p>`; // Display the formatted titles
        }
    }).catch(message => {
        displayDiv.textContent = message; // Display any error message
    });
});
