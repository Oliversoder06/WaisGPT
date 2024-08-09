const gptInput = document.querySelector(".gptinput");
const outputCont = document.querySelector(".outputCont");
const handleLoading = document.querySelector(".loader");

gptInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && gptInput.value.trim().length > 0) {
        const value = gptInput.value.trim();

        // Clear the input field immediately
        gptInput.value = "";

        // Create a new div for the input and output
        const interactionDiv = document.createElement("div");
        interactionDiv.classList.add("interaction");

        const extraDiv = document.createElement("div");
        extraDiv.classList.add("input");
        interactionDiv.appendChild(extraDiv);

        // Create a new p element for the input
        const newInputP = document.createElement("p");
        newInputP.classList.add("inputText");
        newInputP.textContent = value;
        extraDiv.appendChild(newInputP);

        // Create a new p element for the output (initially empty)
        const newOutputP = document.createElement("p");
        newOutputP.classList.add("outputText");
        interactionDiv.appendChild(newOutputP);

        // Append the interaction div to the output container
        outputCont.appendChild(interactionDiv);

        // Scroll to the bottom to make sure the new interaction is visible
        outputCont.scrollTop = outputCont.scrollHeight;

        // Show the loading indicator
        handleLoading.style.display = "grid";

        // Send the request to the server
        fetch(`/generate?prompt=${value}`)
            .then(response => response.text())
            .then(data => {
                // Hide the loading indicator
                handleLoading.style.display = "none";

                // Update the output p element with the server's response
                newOutputP.textContent = data;

                // Scroll to the bottom again in case the output is long
                outputCont.scrollTop = outputCont.scrollHeight;
            })
            .catch(error => {
                console.error("Error:", error);
                handleLoading.style.display = "none";
                newOutputP.textContent = "Error generating response.";
            });
    }
});
