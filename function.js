const toggleButton = document.getElementById('ttb');
const dropdown = document.getElementById('dd');
let open = false;

toggleButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent this click from triggering the document click event
    open = !open;
    dropdown.style.display = open ? 'flex' : 'none';
});

document.addEventListener('click', (e) => {
    // Check if click is outside the dropdown and toggle button
    if (open && !dropdown.contains(e.target) && !toggleButton.contains(e.target)) {
        dropdown.style.display = 'none';
        open = false;
    }
});
