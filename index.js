const container = document.querySelector('.container');

//получаем уже имеющиеся данные
fetch('http://localhost:3000/posts', {
  credentials: 'include',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((posts) =>
    posts.map((post) => addPostToDOM(container, createPostMarkup(post)))
  )
  .catch((err) => console.log(err));

//создали разметку для публикации
function createPostMarkup(post) {
  return `
    <tr class="post">
      <td class="post__selected">${post.selectedOne}</td>
      <td class="post__selected">${post.selectedTwo}</td>
      <td class="post__selected">${post.selectedThree}</td>
      <td class="post__selected">${post.selectedFore}</td>
      <td class="post__selected">${post.selectedFive}</td>
      <td class="post__title">${post.title}</td>
      <td class="post__text">${post.body}</td>
    </tr>
  `;
}

//вставили разметку в DOM
function addPostToDOM(container, markup) {
  container.insertAdjacentHTML('afterbegin', markup);
}

//создаем пуликацию
function createPost(newPost) {
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify({
      selectedOne: newPost.selectedOne,
      selectedTwo: newPost.selectedTwo,
      selectedThree: newPost.selectedThree,
      selectedFore: newPost.selectedFore,
      selectedFive: newPost.selectedFive,
      title: newPost.title,
      body: newPost.body,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then((post) => addPostToDOM(container, createPostMarkup(post)))
    .catch((err) => console.log(err));
}

//обработчик сабмита формы
document.forms.post.addEventListener('submit', (e) => {
  e.preventDefault();
  const {
    selectedOne,
    selectedTwo,
    selectedThree,
    selectedFore,
    selectedFive,
    title,
    text,
  } = e.currentTarget.elements;
  createPost({
    selectedOne: selectedOne.value,
    selectedTwo: selectedTwo.value,
    selectedThree: selectedThree.value,
    selectedFore: selectedFore.value,
    selectedFive: selectedFive.value,
    title: title.value,
    body: text.value,
  });
});
