// https://jsonplaceholder.typicode.com/posts/?_limit=3&_page=2

// UI vars
const postsContainer = document.getElementById("post-container");
const loader = document.getElementById("loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    // Create a div, add class and insert text into it
    const postEl = document.createElement("div");
    postEl.classList.add("post");

    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

// Show loader & fetch posts
function showLoader() {
  loader.classList.add("show");

  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1500);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  posts = document.querySelectorAll(".post"); // Node list

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// Show initial posts
showPosts();

// scroll event for more posts
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});

// Filter posts eventlistener
filter.addEventListener("input", filterPosts);
