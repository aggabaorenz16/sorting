function sorting() {
  // Get the input from the user, containing numbers separated by commas
  const input = document.getElementById('arrayInput').value;
  const result = document.getElementById('result');
  
  // Split the input string into an array of numbers and convert them to integers
  const arr = input.split(',').map(num => parseInt(num.trim(), 10));
  
  // Check if there are any invalid numbers
  if (arr.some(isNaN)) {
    result.innerHTML = 'Please enter valid numbers, separated by commas.'; // Show error message
    return;
  }

  result.innerHTML = ''; // Clear previous results
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

  // Create a bar for each number in the array
  arr.forEach(num => {
    const bar = document.createElement('div');
    bar.classList.add('bar'); // Add a class for styling
    bar.style.height = `${num}px`; // Set the height based on the number
    bar.style.width = '30px'; // Set fixed width for each bar
    bar.style.margin = '0 2px'; // Set space between bars
    bar.style.backgroundColor = 'green'; // Set the initial color of the bars
    result.appendChild(bar); // Add the bar to the result container
  });
}

function displaySortedArray(arr) {
  const result = document.getElementById('result');
  result.innerHTML = 'Sorted Array: ' + arr.join(', '); // Display the sorted array as a string
}
