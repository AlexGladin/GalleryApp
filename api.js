
const API_KEY = ''; // Insert your API key
const API_URL = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=' + API_KEY + '&page=';

export default (currentPage) => {
	return fetch (API_URL + currentPage);
};
