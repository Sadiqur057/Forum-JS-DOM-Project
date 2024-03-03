let readPostCount = 0;
const loadPost = async (categoryName) => {
  showElementById('loading-spinner');
  let url;
  if(categoryName){
    url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
  }else{
    url = `https://openapi.programming-hero.com/api/retro-forum/posts`
  }
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.posts);
};
loadPost();

const displayData = (posts) => {
  const postContainer = document.getElementById("post-container");
  postContainer.textContent = '';
  posts.forEach((post,index) => {
    const title = post.title.replace(/'/g, "\\'");
    console.log(title)
    let innerHTML = `          
    <div class="bg-[#f3f3f5] p-4 md:p-6 lg:p-10 rounded-3xl mb-4 md:mb-6 flex gap-3 lg:gap-6">
      <div class=" w-10 md:w-[72px] h-10 md:h-[72px] relative rounded-md ">
      <img class="w-full rounded-3xl" src=${post.image}>
        <div
          class="is-active p-1 rounded-full inline-block absolute -top-[2px] -right-[2px] border-2 border-white">
        </div>
      </div>
      <div class="flex-1">
        <div class="flex flex-col md:flex-row md:gap-4 lg:gap-6 font-inter font-medium text-[#12132dcc]">
          <h4># <span>${post?.category || "unknown"}</span></h4>
          <h4>Author : <span>${post?.author?.name || "unknown"}</span></h4>
        </div>
        <div class="border-b-[1px] border-dashed">
          <h1 class="pt-3 font-bold text-lg md:text-xl text-c-primary">${
            post?.title || "Not Specified"
          }</h1>
          <p class="py-3 md:py-4 text-c-secondary">${
            post?.description || "Not Specified"
          }</p>
        </div>
        <div class="flex justify-between mt-3 md:mt-6 items-end ">
          <div class="grid grid-cols-3 text-c-secondary gap-[6px] md:gap-7 text-sm md:text-base">
            <p><img class="inline-block  mr-[6px] md:mr-3 w-[14px] md:w-5" src="images/icons/message.svg"
                alt=""><span>${post?.comment_count || 0}</span></p>
            <p><img class="inline-block mr-[6px] md:mr-3 w-4 md:w-5" src="images/icons/views.svg"
                alt=""><span>${post?.view_count || 0}</span></p>
            <p><img class="inline-block  mr-[6px] md:mr-3 w-4 md:w-5" src="images/icons/duration.svg" alt=""><span>${
              post?.posted_time
            }</span> min</p>
          </div>
          <div>
            <button onclick="markRead('${title}',${
      post.view_count
    })"><img class="inline-block mr-3" src="images/icons/save.svg" alt=""></button>
          </div>
        </div>
      </div>
    </div>`;
    postContainer.innerHTML += innerHTML;
    const isActive = post.isActive;
    const element = document.querySelectorAll('.is-active')[index];
    (isActive ? element.classList.add('bg-green-600'): element.classList.add('bg-red-600'))

    
    
  });
    hideElementById('loading-spinner');
};

const markRead = (title, view_count) => {
  readPostCount += 1;
  const element = document.getElementById('read-post-count');
  element.textContent = readPostCount;
  const readPostContainer = document.getElementById("read-post-container");
  innerHTML = `
  <div class="flex justify-between p-4 md:p-6 bg-white shadow-sm rounded-xl  my-3 md:my-5">
  <h4 class="font-bold text-c-primary ">${title}</h4>
  <div class="self-center">
    <p class="w-[60px] flex justify-between "><img class="inline-block mr-2" src="images/icons/views.svg"
        alt=""><span class="text-right">${view_count}</span></p>
  </div>
</div>
  `;
  readPostContainer.innerHTML += innerHTML;
};


const loadNews = async () => {
  showElementById('loading-spinner-post');
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  displayNews(data);
};
loadNews();

const displayNews = (allNews) => {
  const newsContainer = document.getElementById("news-container");
  console.log(newsContainer)
  allNews.forEach((news) => {
    let innerHTML = `
    <div class="card bg-base-100 border-[1px] border-c-border font-mulish">
      <figure class="px-4 md:px-6 pt-4 md:pt-6"><img class="rounded-xl"
          src="${news.cover_image}" /></figure>
      <div class="card-body px-5 md:px-6">
        <p class="text-c-secondary flex items-center gap-2"><img class="w-5" src="images/icons/date.svg"
            alt=""><span class="font-mulish">${news?.author?.posted_date || "No publish date"}</span></p>
        <h2 class="text-lg font-extrabold leading-snug">${news?.title || 'Not Specified'}</h2>
        <p class="font-mulish text-c-secondary leading-6">${news?.description || 'Not Specified'}</p>
        <div class="flex gap-4 mt-2 md:mt-2">
          <div>
            <img class="w-10 h-10 rounded-full" src="${news?.profile_image}" alt="Profile Picture">
          </div>
          <div>
            <h4 class="font-bold">${news?.author?.name || 'unknown'}</h4>
            <p class="text-c-secondary text-sm">${news?.author?.designation || 'unknown'}</p>
          </div>
        </div>
      </div>
    </div>
    `
    newsContainer.innerHTML += innerHTML;
  });

    hideElementById('loading-spinner-post');
};


document.getElementById('search-button').addEventListener('click', ()=>{
  const element = document.getElementById('search-box');
  const text = element.value;
  loadPost(text);
})

