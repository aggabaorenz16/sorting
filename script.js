function sorting(order) {
    const input = document.getElementById('arrayInput').value; // Get the user's input from the input field.
    const result = document.getElementById('result'); // Reference to the result display container.
    const sortedArrayContainer = document.getElementById('sortedArrayContainer'); // Reference to the sorted array container.

    // Regular expression to validate integers (comma-separated, optional spaces).
    const regex = /^-?\d+(,\s*-?\d+)*$/;

    // Validate input using the regex pattern.
    if (!regex.test(input.trim())) {
        result.innerHTML = 'Please enter valid input.'; // Display an error message if input is invalid.
        sortedArrayContainer.innerHTML = ''; // Clear any existing sorted array.
        return; // Exit the function if input is invalid.
    }

    // Parse the numbers into an array of integers.
    const arr = input.split(',').map(num => parseInt(num.trim(), 10));

    // Check if any number exceeds the allowed range of -600 to 600.
    if (arr.some(num => Math.abs(num) > 600)) {
        result.innerHTML = 'All numbers must be between -600 and 600.'; // Display an error message if out of range.
        sortedArrayContainer.innerHTML = ''; // Clear any existing sorted array.
        return; // Exit the function if validation fails.
    }

    result.innerHTML = ''; // Clear any previous results.
    sortedArrayContainer.innerHTML = ''; // Clear the sorted array container.
    createBars(arr); // Create visual bars to represent the array elements.
    bubbleSortWithAnimation(arr, order); // Start the bubble sort with animation.
}

function bubbleSortWithAnimation(arr, order) {
    let len = arr.length; // Length of the array.
    let i = 0; // Outer loop counter.
    let j = 0; // Inner loop counter.

    // Function to animate the sorting process.
    function animateSort() {
        if (i < len) { // Outer loop condition.
            if (j < len - i - 1) { // Inner loop condition.
                const bars = document.querySelectorAll('.bar'); // Get all bars in the DOM.
                const bar1 = bars[j]; // First bar to compare.
                const bar2 = bars[j + 1]; // Second bar to compare.

                // Modify the comparison based on the sorting order.
                const condition = order === 'asc' ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
                if (condition) { // Swap elements if the condition is true.
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap array elements.

                    // Update the heights of the bars to reflect the new array order.
                    bar1.style.height = `${Math.abs(arr[j])}px`;
                    bar2.style.height = `${Math.abs(arr[j + 1])}px`;

                    // Update the colors of the bars.
                    bar1.style.backgroundColor = getBarColor(arr[j]);
                    bar2.style.backgroundColor = getBarColor(arr[j + 1]);

                    updateLabels(arr); // Update the labels on the bars.
                }
                j++; // Move to the next pair of elements.
                setTimeout(animateSort, 500); // Delay for animation (500ms).
            } else { 
                i++; // Move to the next outer loop iteration.
                j = 0; // Reset inner loop counter.
                animateSort(); // Restart animation for the next pass.
            }
        }
    }

    animateSort(); // Start the animation process.
}

function createBars(arr) {
    const result = document.getElementById('result'); // Reference to the result container.
    result.innerHTML = ''; // Clear any previous bars.

    const barContainer = document.createElement('div'); // Create a container for the bars.
    barContainer.style.display = 'flex'; // Align bars horizontally.
    barContainer.style.alignItems = 'flex-end'; // Align bars to the bottom.

    arr.forEach(num => {
        const barWrapper = document.createElement('div'); // Wrapper for each bar and its label.
        barWrapper.classList.add('bar-wrapper'); // Add a class for potential styling.

        const bar = document.createElement('div'); // Create the bar element.
        bar.classList.add('bar'); // Add a class for styling.
        bar.style.height = `${Math.abs(num)}px`; // Set the height based on the array value.
        bar.style.width = '50px'; // Fixed width for bars.
        bar.style.margin = '0 4px'; // Space between bars.
        bar.style.backgroundColor = getBarColor(num); // Set bar color based on the value.

        const label = document.createElement('div'); // Create a label for the bar.
        label.classList.add('bar-label'); // Add a class for styling.
        label.innerHTML = num; // Set the label text to the array value.

        barWrapper.appendChild(bar); // Append the bar to its wrapper.
        barWrapper.appendChild(label); // Append the label to the wrapper.
        barContainer.appendChild(barWrapper); // Add the wrapper to the container.
    });

    result.appendChild(barContainer); // Add the bar container to the result section.
}

function updateLabels(arr) {
    const labels = document.querySelectorAll('.bar-label'); // Select all bar labels.
    arr.forEach((num, index) => {
        labels[index].innerText = num; // Update each label with the corresponding array value.
    });
}

// Function to determine the color of a bar based on its value.
function getBarColor(num) {
    if (num === 0) return 'blue'; // Blue for zero values.
    return num < 0 ? 'red' : 'green'; // Red for negative values, green for positive.
}
