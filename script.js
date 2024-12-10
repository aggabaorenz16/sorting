function sorting() {
    const input = document.getElementById('arrayInput').value;
    const result = document.getElementById('result');
    const sortedArrayContainer = document.getElementById('sortedArrayContainer');

    // Regular expression to validate integers (comma-separated, optional spaces)
    const regex = /^-?\d+(,\s*-?\d+)*$/;

    // Check if input matches the required integer format
    if (!regex.test(input.trim())) {
        result.innerHTML = 'Please enter valid input.';
        sortedArrayContainer.innerHTML = '';
        return;
    }

    // Parse the numbers as integers
    const arr = input.split(',').map(num => parseInt(num.trim(), 10));

    // Check if any number exceeds the maximum value of 600
    if (arr.some(num => Math.abs(num) > 600)) {
        result.innerHTML = 'All numbers must be between -600 and 600.';
        sortedArrayContainer.innerHTML = '';
        return;
    }

    result.innerHTML = '';
    sortedArrayContainer.innerHTML = '';
    createBars(arr);
    bubbleSortWithAnimation(arr);
}



        function bubbleSortWithAnimation(arr) {
            let len = arr.length;
            let i = 0;
            let j = 0;

            function animateSort() {
                if (i < len) {
                    if (j < len - i - 1) {
                        const bars = document.querySelectorAll('.bar');
                        const bar1 = bars[j];
                        const bar2 = bars[j + 1];

                        if (arr[j] > arr[j + 1]) {
                            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                            bar1.style.height = `${Math.abs(arr[j])}px`;
                            bar2.style.height = `${Math.abs(arr[j + 1])}px`;

                            bar1.style.backgroundColor = getBarColor(arr[j]);
                            bar2.style.backgroundColor = getBarColor(arr[j + 1]);

                            updateLabels(arr);
                        }
                        j++;
                        setTimeout(animateSort, 1000);
                    } else {
                        i++;
                        j = 0;
                        animateSort();
                    }
                } else {
                    displaySortedArray(arr);
                }
            }

            animateSort();
        }

        function createBars(arr) {
            const result = document.getElementById('result');
            result.innerHTML = '';

            const barContainer = document.createElement('div');
            barContainer.style.display = 'flex';
            barContainer.style.alignItems = 'flex-end';

            arr.forEach(num => {
                const barWrapper = document.createElement('div');
                barWrapper.classList.add('bar-wrapper');

                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${Math.abs(num)}px`;
                bar.style.width = '50px';
                bar.style.margin = '0 4px';
                bar.style.backgroundColor = getBarColor(num);

                const label = document.createElement('div');
                label.classList.add('bar-label');
                label.innerHTML = num;

                barWrapper.appendChild(bar);
                barWrapper.appendChild(label);
                barContainer.appendChild(barWrapper);
            });

            result.appendChild(barContainer);
        }

        function updateLabels(arr) {
            const labels = document.querySelectorAll('.bar-label');
            arr.forEach((num, index) => {
                labels[index].innerText = num;
            });
        }

        function getBarColor(num) {
            if (num === 0) return 'blue';
            return num < 0 ? 'red' : 'green';
        }
