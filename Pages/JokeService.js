(function CategoriesList() {
    const URL_CATEGORY = 'https://api.chucknorris.io/jokes/categories';

    fetch(URL_CATEGORY, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((resp) => {
            return resp.json();
        })
        .then((categories) => {
            const categoryWrapper = document.querySelector('.category-list-wrapper')
            categoryWrapper.textContent = '...Loading'

            if (categories.length > 1) {
                categories.forEach((item, index) => {
                    const categoriesItem = document.createElement('li');
                    categoriesItem.className = 'category-item'

                    if (categories.length === index + 1) {
                        categoriesItem.textContent = item;
                    } else {
                        categoriesItem.textContent = item + ' | ';
                    }
                    categoryWrapper.appendChild(categoriesItem);
                    categoriesItem.addEventListener('click', () => {
                        Joke(item)
                    })
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
})()

const Joke = (category) => {
    const URL_JOKE = `https://api.chucknorris.io/jokes/random?category=${category}`;

    const shareButton = document.getElementById('share-img');

    const content = document.querySelector('.joke-content')
    content.textContent = '...loading'

    const jokeCat = document.querySelector('.joke-category')
    jokeCat.textContent = '...loading'

    const createdAt = document.querySelector('.joke-creationTime')

    if (category) {
        fetch(URL_JOKE, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
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

            shareButton.addEventListener('click', () => {
                navigator.clipboard.writeText(joke.value).then()
                alert('Joke copied to your clipboard!')
            })
        }).catch((error) => {
            console.error('Error fetching data:', error);
        })
    }
}

(function RandomJoke() {
    const URL_RANDOM_JOKE = 'https://api.chucknorris.io/jokes/random'

    const shareButton = document.getElementById('share-img');

    const content = document.querySelector('.joke-content')

    fetch(URL_RANDOM_JOKE, {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
        }
    }).then((resp) => {
        return resp.json()
    }).then((joke) => {
        content.textContent = joke.value
        shareButton.addEventListener('click', () => {
            navigator.clipboard.writeText(joke.value).then()
            alert('Joke copied to your clipboard!')
        })
    }).catch((error) => {
        console.error('Error fetching data:', error);
    })
})()
