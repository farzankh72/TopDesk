(function ListOfCategories() {
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
            const ListOfCatWrapper = document.querySelector('.joke-category-wrapper')
            ListOfCatWrapper.textContent = '...Loading'

            RandomJoke()
            ListOfCatWrapper.textContent = ''
            if (CategoriesData.length > 1) {
                CategoriesData.forEach((item) => {
                    const listOfCategory = document.createElement('li');

                    listOfCategory.style.cursor = 'pointer'
                    listOfCategory.style.display = 'inline-block';

                    listOfCategory.textContent = item + ' / ';
                    ListOfCatWrapper.appendChild(listOfCategory);
                    listOfCategory.addEventListener('click', () => {
                        Joke(item)
                    })
                });
            } else {

            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
})()

const Joke = (category) => {
    const URL_JOKE = `https://api.chucknorris.io/jokes/random?category=${category}`;

    const content = document.querySelector('.joke-content')
    content.textContent = '...loading'
    const createdAt = document.querySelector('.joke-creationTime')
    const jokeCat = document.querySelector('.joke-category')
    jokeCat.textContent = '...loading'

    if (category) {
        fetch(URL_JOKE, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            jokeCat.textContent = ''
            return res.json()
        }).then((joke) => {
            content.textContent = joke.value
            const dateTime = new Date(joke.created_at)
            createdAt.textContent = dateTime.toLocaleString()
            if (joke.categories.length > 1) {
                joke.categories.map((category) => {
                    jokeCat.textContent = jokeCat.textContent + category + '/'
                })
            } else {
                jokeCat.textContent = category
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}

const RandomJoke = () => {
    const URL_RANDOM_JOKE = 'https://api.chucknorris.io/jokes/random'

    const content = document.querySelector('.joke-content')

    fetch(URL_RANDOM_JOKE, {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
        }
    }).then((resp) => {
        return resp.json()
    }).then((joke) => {
        content.textContent = joke.value
    }).catch((err) => {
        console.log(err)
    })
}
