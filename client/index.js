import axios from 'axios';

axios.get('/api/login').then((response) => {
  // TODO: Set user data to the store
  console.log(response);
  // TODO: After login credentials have been confirmed, render the page
  renderPage();
});

function renderPage() {
  // TODO: add function to render header and other components
  console.log('header rendered');
}
