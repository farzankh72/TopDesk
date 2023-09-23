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

            RandomJoke()

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
                listOfCategory.style.cursor = 'pointer'

                listOfCategory.textContent = item + ' / ';
                ListOfCatWrapper.appendChild(listOfCategory);
                listOfCategory.addEventListener('click', () => {
                    Joke(item)
                })
            });
            container.appendChild(ListOfCatWrapper)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

ListOfCategories()

const Joke = (category) => {
    const URL_JOKE = `https://api.chucknorris.io/jokes/random?category=${category}`;

    const content = document.querySelector('.joke-content')
    content.textContent = 'loading'
    const createdAt = document.querySelector('.joke-creationTime')
    createdAt.textContent = 'loading'
    const jokeCat = document.querySelector('.joke-category')
    jokeCat.textContent = 'loading'

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
            createdAt.textContent = joke.created_at
            joke.categories.map((category) => {
                jokeCat.textContent = jokeCat.textContent + category + '/'
            })
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
