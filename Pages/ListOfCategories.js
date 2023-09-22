const ListOfCategories = async () => {
    const URL_JOKE_CAT = 'https://api.chucknorris.io/jokes/categories';

    fetch(URL_JOKE_CAT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((resp) => {
            return resp.json();
        })
        .then((CategoriesData) => {
            const container = document.querySelector('.body-Container');

            const ListOfCatWrapper = document.createElement('ul')

            ListOfCatWrapper.style.width = '80%';
            ListOfCatWrapper.style.display = 'flex';
            ListOfCatWrapper.style.fontSize = '32px';
            ListOfCatWrapper.style.overflow = 'scroll';
            ListOfCatWrapper.style.overflowY = 'hidden';
            ListOfCatWrapper.style.whiteSpace = 'nowrap';
            ListOfCatWrapper.style.justifyContent = 'center';
            ListOfCatWrapper.style.margin = '0 auto';

            CategoriesData.forEach((item) => {
                const listOfCategory = document.createElement('li');
                listOfCategory.style.display = 'inline-block';
                listOfCategory.style.backgroundColor = 'lightBlue'

                listOfCategory.textContent = item + ' / ';
                ListOfCatWrapper.appendChild(listOfCategory);
            });
            container.appendChild(ListOfCatWrapper)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

ListOfCategories()
