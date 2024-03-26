async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeArray(array, low, high) {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.style.width = `${array[i] * 20}px`; // Adjust the width based on the value
        element.textContent = array[i];
        if (i >= low && i <= high) {
            element.style.backgroundColor = '#FF4136'; // Highlight the elements being compared
        }
        arrayContainer.appendChild(element);
    }
}

async function visualizeComparison(leftValue, rightValue) {
    const comparisonContainer = document.getElementById('comparison-container');
    const leftElement = document.createElement('div');
    leftElement.className = 'comparison-element';
    leftElement.style.width = `${leftValue * 20}px`; // Adjust the width based on the value

    const rightElement = document.createElement('div');
    rightElement.className = 'comparison-element';
    rightElement.style.width = `${rightValue * 20}px`; // Adjust the width based on the value

    comparisonContainer.innerHTML = '';
    comparisonContainer.appendChild(leftElement);
    comparisonContainer.appendChild(rightElement);
}

async function mergeSort(array, start, end) {
    if (start < end) {
        const middle = Math.floor((start + end) / 2);
        await mergeSort(array, start, middle);
        await mergeSort(array, middle + 1, end);
        await merge(array, start, middle, end);
    }
}

async function merge(array, start, middle, end) {
    const left = array.slice(start, middle + 1);
    const right = array.slice(middle + 1, end + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let index = start;

    while (leftIndex < left.length && rightIndex < right.length) {
        const leftValue = left[leftIndex];
        const rightValue = right[rightIndex];

        if (leftValue <= rightValue) {
            array[index] = leftValue;
            leftIndex++;
        } else {
            array[index] = rightValue;
            rightIndex++;
        }
        index++;

        visualizeComparison(leftValue, rightValue);
        await sleep(1000); // Slower delay for visualization
        visualizeArray(array, start, end);
    }

    while (leftIndex < left.length) {
        array[index] = left[leftIndex];
        leftIndex++;
        index++;
        await visualizeArray(array, start, end);
        await sleep(1000);
    }

    while (rightIndex < right.length) {
        array[index] = right[rightIndex];
        rightIndex++;
        index++;
        await visualizeArray(array, start, end);
        await sleep(1000);
    }
}

document.getElementById('sort-button').addEventListener('click', async () => {
    const inputArray = [4, 7, 2, 8, 10, 6, 9, 5, 3]; // Initialize with given values
    visualizeArray(inputArray, 0, inputArray.length - 1);
    await mergeSort(inputArray, 0, inputArray.length - 1);
});
