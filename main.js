import { iconList } from './icons.js';

document.addEventListener('DOMContentLoaded', async () => {
  const listGroup = document.getElementById('iconListGroup');
  const searchField = document.getElementById('iconSearch');
  const selectedIconField = document.getElementById('selectedIcon');

  // Populate initial list
  populateIconList(iconList.slice(0, 5));

// Add search functionality
searchField.addEventListener('input', () => {
  const searchQuery = searchField.value.replace(/\s+/g, '-');
  const filteredIcons = iconList.filter(icon => {
    // Remove the 'bi-' prefix for the purpose of comparison
    const displayIcon = icon.substring(3);
    return displayIcon.includes(searchQuery);
  }).slice(0, 5);
  populateIconList(filteredIcons);
});

  // Populate the list-group with icons
  function populateIconList(list) {
    listGroup.innerHTML = '';
    list.forEach(icon => {
      const displayIcon = icon.substring(3).replace('-', ' '); // Remove 'bi-' prefix
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `<i class="${icon}"></i> (${displayIcon})`;
      li.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.list-group-item').forEach(item => {
          item.classList.remove('active');
        });
        // Add active class to the selected item
        li.classList.add('active');
        selectedIconField.value = icon;
      });
      listGroup.appendChild(li);
    });
  }

  // Handle form submission
  document.getElementById('iconForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const selectedIcon = selectedIconField.value;

    // Do your AJAX call here to /saveType
    try {
      alert(JSON.stringify({selectedIcon}))
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
