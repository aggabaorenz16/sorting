function sorting() {
  // Get the input from the user, containing numbers separated by commas
  const input = document.getElementById('arrayInput').value;
  const result = document.getElementById('result');
  const sortedArrayContainer = document.getElementById('sortedArrayContainer');
  
  // Split the input string into an array of numbers and convert them to integers
  const arr = input.split(',').map(num => parseInt(num.trim(), 10));
  
  // Check if there are any invalid numbers
  if (arr.some(isNaN)) {
    result.innerHTML = 'Please enter valid numbers, separated by commas.'; // Show error message
    sortedArrayContainer.innerHTML = ''; // Clear sorted array message if input is invalid
    return;
  }

  result.innerHTML = ''; // Clear previous bars
  sortedArrayContainer.innerHTML = ''; // Clear any previous sorted array message
  createBars(arr); // Display the initial bars based on input numbers
  bubbleSortWithAnimation(arr); // Start the bubble sort with animation
}

function bubbleSortWithAnimation(arr) {
  let len = arr.length;
  let i = 0;
  let j = 0;
  
  function animateSort() {
    if (i < len) { // Continue sorting until the entire array is sorted
      if (j < len - i - 1) { // Loop through the array and compare adjacent elements
        const bars = document.querySelectorAll('.bar');
        const bar1 = bars[j];
        const bar2 = bars[j + 1];

        // If the elements are out of order, swap them and animate the bars
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap the array elements
          bar1.style.height = `${arr[j]}px`; // Update the height of the first bar
          bar2.style.height = `${arr[j + 1]}px`; // Update the height of the second bar
          updateLabels(); // Update the number labels under the bars
        }

        j++; // Move to the next pair of elements
        setTimeout(animateSort, 500); // Delay for better visualization of sorting steps
      } else {
        i++; // Move to the next pass through the array
        j = 0; // Reset the comparison index
        animateSort(); // Continue sorting
      }
    } else {
      displaySortedArray(arr); // Show the sorted array once sorting is complete
    }
  }

  animateSort(); // Start the animation of bubble sort
}

function createBars(arr) {
  const result = document.getElementById('result');
  result.innerHTML = ''; // Clear any previously displayed bars

  // Create a container for bars
  const barContainer = document.createElement('div');
  barContainer.style.display = 'flex'; // Align bars horizontally
  barContainer.style.alignItems = 'flex-end'; // Align bars to the bottom
  
  // Create a bar for each number in the array
  arr.forEach(num => {
    const barWrapper = document.createElement('div');
    barWrapper.classList.add('bar-wrapper'); // Class to wrap bars and labels together

    // Create the bar element
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${num}px`;
    bar.style.width = '30px';
    bar.style.margin = '0 2px';
    bar.style.backgroundColor = 'green';

    // Create the label element
    const label = document.createElement('div');
    label.classList.add('bar-label');
    label.innerHTML = num;

    // Add the label and the bar to the wrapper
    barWrapper.appendChild(bar);
    barWrapper.appendChild(label);

    // Add the wrapper to the container
    barContainer.appendChild(barWrapper);
  });

  // Append the container with bars to the result div
  result.appendChild(barContainer);
}

function updateLabels() {
  const labels = document.querySelectorAll('.bar-label');
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < labels.length; i++) {
    labels[i].innerText = bars[i].style.height.replace('px', ''); // Update the number label
  }
}
