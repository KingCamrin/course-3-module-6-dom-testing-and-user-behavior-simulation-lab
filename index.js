// Step 1: Simulate User Behavior
// - Add event listeners for button clicks and form submissions.
// - Use JavaScript to dynamically update the DOM based on user actions.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const itemList = document.getElementById('item-list');
    const errorMessage = document.getElementById('error-message');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const newItem = formData.get('item');

            if (!newItem) {
                displayError('Please enter an item.');
                return;
            }

            addItemToList(newItem);
            form.reset();
        });
    }

    // Add click event listener for simulate button if it exists
    const simulateButton = document.getElementById('simulate-click');
    if (simulateButton) {
        simulateButton.addEventListener('click', () => {
            simulateClick('dynamic-content', 'Button Clicked!');
        });
    }

// Step 2: DOM Manipulation Functions
// - Implement functions to add, update, and remove DOM elements.
// - Ensure all elements are dynamically created with appropriate attributes and content.
    function addItemToList(item) {
        const listItem = createElement('li', { textContent: item });
        const deleteButton = createElement('button', { textContent: 'Delete' });
        deleteButton.addEventListener('click', () => {
            if (itemList) {
                itemList.removeChild(listItem);
            }
        });
        listItem.appendChild(deleteButton);
        if (itemList) {
            itemList.appendChild(listItem);
        }
    }

// Step 3: Error Handling
// - Display error messages in the DOM for invalid inputs or missing elements.
// - Create reusable functions to handle common error cases.
    function displayError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            errorMessage.classList.remove('hidden');
        }
    }
    
    function clearError() {
        if (errorMessage) {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
            errorMessage.classList.add('hidden');
        }
    }
// Step 4: Reusable Utilities
// - Create modular utility functions, such as createElement(tag, attributes).
// - Ensure all functions follow DRY principles for maintainability.

    function createElement(tag, attributes = {}) {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            element[key] = value;
        });
        return element;
    }

    // Make functions available globally for testing
    window.addItemToList = addItemToList;
    window.displayError = displayError;
    window.clearError = clearError;
    window.createElement = createElement;
});

// Functions expected by tests - these work without DOM being ready
function addElementToDOM(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        const newElement = document.createElement('div');
        newElement.textContent = content;
        element.appendChild(newElement);
    }
}

function removeElementFromDOM(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function simulateClick(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        const newElement = document.createElement('div');
        newElement.textContent = content;
        element.appendChild(newElement);
    }
}

function handleFormSubmit(formId, targetElementId) {
    const form = document.getElementById(formId);
    const input = document.getElementById('user-input');
    const targetElement = document.getElementById(targetElementId);
    const errorMessage = document.getElementById('error-message');
    
    if (!input || !targetElement) return;
    
    const inputValue = input.value.trim();
    
    if (!inputValue) {
        if (errorMessage) {
            errorMessage.textContent = 'Input cannot be empty';
            errorMessage.classList.remove('hidden');
        }
        return;
    }
    
    // Clear any previous error
    if (errorMessage) {
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }
    
    // Add input to target element
    const newElement = document.createElement('div');
    newElement.textContent = inputValue;
    targetElement.appendChild(newElement);
    
    // Clear the input
    input.value = '';
}

// Export functions for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addElementToDOM,
        removeElementFromDOM,
        simulateClick,
        handleFormSubmit
    };
}
