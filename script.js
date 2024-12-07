function sorting() {
  // Get the input value from the user, which contains numbers separated by commas
  const input = document.getElementById('arrayInput').value;
  const result = document.getElementById('result');
  const sortedArrayContainer = document.getElementById('sortedArrayContainer');
  
  // Split the input string into an array, remove extra spaces and convert each item to an integer
  const arr = input.split(',').map(num => parseInt(num.trim(), 10));
  
  // Check if there are any invalid numbers in the array
  if (arr.some(isNaN)) {
    result.innerHTML = 'Please enter valid numbers, separated by commas.'; // Show error message if any value is not a valid number
    sortedArrayContainer.innerHTML = ''; // Clear sorted array message if input is invalid
    return;
  }

  result.innerHTML = ''; // Clear any previous bars or results
  sortedArrayContainer.innerHTML = ''; // Clear any previous sorted array message
  createBars(arr); // Create and display bars based on input numbers
  bubbleSortWithAnimation(arr); // Start the bubble sort with animation
}

// Bubble sort function with animation for visualizing the sorting process
function bubbleSortWithAnimation(arr) {
  let len = arr.length;
  let i = 0;
  let j = 0;
  
  // This function handles the animation of sorting
  function animateSort() {
    if (i < len) { // Continue sorting until the entire array is sorted
      if (j < len - i - 1) { // Loop through the array and compare adjacent elements
        const bars = document.querySelectorAll('.bar');
        const bar1 = bars[j]; // Select the first bar
        const bar2 = bars[j + 1]; // Select the second bar

        // If the elements are out of order, swap them and animate the bars
        if (arr[j] > arr[j + 1]) {
          // Swap the array elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          
          // Update the heights of the bars to reflect the swapped values
          bar1.style.height = `${arr[j]}px`; 
          bar2.style.height = `${arr[j + 1]}px`; 
          
          // Update the number labels beneath the bars to match the swapped values
          updateLabels(); 
        }

        j++; // Move to the next pair of elements
        setTimeout(animateSort, 500); // Add a delay for better visualization of sorting steps
      } else {
        i++; // Move to the next pass through the array
        j = 0; // Reset the comparison index to start from the beginning
        animateSort(); // Continue sorting the next pair of elements
      }
    } else {
      displaySortedArray(arr); // Once sorting is complete, display the sorted array
    }
  }

  animateSort(); // Start the animation of bubble sort
}

// Function to create the bars based on the input array
function createBars(arr) {
  const result = document.getElementById('result');
  result.innerHTML = ''; // Clear any previously displayed bars

  // Create a container for the bars
  const barContainer = document.createElement('div');
  barContainer.style.display = 'flex'; // Align bars horizontally
  barContainer.style.alignItems = 'flex-end'; // Align bars to the bottom
  
  // Create a bar for each number in the array
  arr.forEach(num => {
    // Create a wrapper for each bar to group the bar and its label together
    const barWrapper = document.createElement('div');
    barWrapper.classList.add('bar-wrapper'); // Class to wrap bars and labels together

    // Create the bar element
    const bar = document.createElement('div');
    bar.classList.add('bar'); // Assign 'bar' class for styling
    bar.style.height = `${num}px`; // Set the height of the bar based on the number
    bar.style.width = '50px'; // Set the width of the bar
    bar.style.margin = '0 4px'; // Set some margin between the bars
    bar.style.backgroundColor = 'green'; // Set the bar color

    // Create the label element
    const label = document.createElement('div');
    label.classList.add('bar-label'); // Assign 'bar-label' class for styling
    label.innerHTML = num; // Set the label's text to the number

    // Add the label and the bar to the wrapper
    barWrapper.appendChild(bar);
    barWrapper.appendChild(label);

    // Add the wrapper to the container
    barContainer.appendChild(barWrapper);
  });

  // Append the container with bars to the result div
  result.appendChild(barContainer);
}

// Function to update the labels dynamically as the bars change height during sorting
function updateLabels() {
  const labels = document.querySelectorAll('.bar-label'); // Get all the labels
  const bars = document.querySelectorAll('.bar'); // Get all the bars
  
  // Iterate through each label and update it with the new value based on the bar height
  for (let i = 0; i < labels.length; i++) {
    labels[i].innerText = bars[i].style.height.replace('px', ''); // Remove 'px' from the height string and update the label
  }
}
