let readPostCount = 0;
const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  displayData(data.posts);
};
loadData();

const displayData = (posts) => {
  // console.log(posts);
  const postContainer = document.getElementById("post-container");
  posts.forEach((post,index) => {
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
            <button onclick="markRead('${post.title}',${
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
  console.log(document.querySelectorAll('.is-active'))
};

const markRead = (title, view_count) => {
  // console.log(title,view_count);
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
