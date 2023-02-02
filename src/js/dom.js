export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;


export const createElements = ({
                                 type,
                                 attrs,
                                 container = null,
                                 position = 'append',
                                 evt,
                                 handler
                               }) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') {
      el.setAttribute(key, attrs[key]);
    } else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el)
  if (container && position === 'prepend') container.prepend(el)

  if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler)

  return el;
}

export const createStyle = () => {

  createElements({
    type: 'style',
    attrs: {
      innerHTML: `
      * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }
    
    .container {
      width: min(100% - 40px, 1280px);
      margin-inline: auto;
    }
    
    .movies {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .movie {
      display: flex;
      justify-content: center;
      align-content: center;
    }
    
    .movie__image {
      width: 100%;
      object-fit: cover;
    }
    
    .search {
      margin-bottom: 30px;
    }
    
    .search__label-input {
      display: block;
      margin-bottom: 7px;
    }
    
    .search__input {
      display: block;
      max-width: 400px;
      width: 100%;
      padding: 10px 15px;
      margin-bottom: 10px;
      border: 1px solid light;
      border-radius: 4px;
    }
    
    .search__label-checkbox {
      font-size: 15px;
      display: inline-block;
      transform: translate(7px, -2px);
    }    
      `
    },
    container: document.head
  });
}

export const createMarkup = () => {
  const container = createElements({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend'
  })

  createElements({
    type: 'h1',
    attrs: { innerHTML: 'Приложение для поиска фильмов' },
    container
  })

  const searchBox = createElements({
    type: 'div',
    attrs: { class: 'search' },
    container
  });

  const inputBox = createElements({
    type: 'div',
    attrs: { class: 'search__group search__group--input' },
    container: searchBox
  });

  const checkBox = createElements({
    type: 'div',
    attrs: { class: 'search__group search__group--checkbox' },
    container: searchBox
  });

  createElements({
    type: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerHTML: 'Поиск фильмов'
    },
    container: inputBox
  });

  inputSearch = createElements({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'search',
      placeholder: 'Введите текст...'
    },
    container: inputBox
  });

  createElements({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox'
    },
    container: checkBox,
    evt: 'click',
    handler: () => triggerMode = !triggerMode
  });

  createElements({
    type: 'label',
    attrs: {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerHTML: 'Добавлять фильмы к существующим спискам'
    },
    container: checkBox
  });


  const movies = createElements({
    type: 'div',
    attrs: { class: 'movies' },
    container
  });

  moviesList = document.querySelector('.movies')
};

export const addMovieToList = (movie) => {

  const item = createElements({
    type: 'div',
    attrs: { class: 'movie' },
    container: moviesList
  })


  createElements({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'src/assets/img/no-img.png',
      alt: movie.Title,
      title: movie.Title
    },
    container: item
  });
}

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '')
