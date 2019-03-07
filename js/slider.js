// 圖片網址
// http://18.214.165.31/assets/keyvisuals/201807242222.jpg
// campaign網址
// http://[HOST_NAME]/api/[API_VERSION]/marketing/campaigns

// {
//     "id": 1,
//     "product_id": 201807242228,
//     "picture": "/assets/keyvisuals/201807242228.jpg",
//     "story": "於是\r\n我也想要給你\r\n一個那麼美好的自己。\r\n不朽《與自己和好如初》"
//      \r\n這個是換行的意思
//   }
const bannerSlider = document.querySelector("#banner");
var slides = 0;
var index = 0;

const getCampaigns = api => {
  return getData(api).then(result => {
    const BannersAll = JSON.parse(result);
    printBannerData(BannersAll);
    // 寫在取得資料的function裡面，是因為：
    // 瀏覽器讀取的時候，如果不是寫在function裡面，它會只看原本的html然後告訴你沒有這些物件，console幾次都是抓不到東西的喔
    // console.log(slides[0]);
    // console.log(slides[1]);
    // console.log(slides[2]);
 
    showSlides();
  });
};

// Campaigns
getCampaigns("marketing/campaigns");

const printBannerData = BannersAll => {
  const { data } = BannersAll;
  console.log(BannersAll);
  data.forEach(item => {
    const { picture, story, product_id } = item;
    // 宣告變數 在css裡面要給他class
    const id = product_id;
    const imageURL = `https://${hostName}` + picture;
    const bannerTitle = story.split("\r\n");
    const bannerViceTitle = bannerTitle.pop();
    const contentInBanner = `
        <div class="banners" style="background-image:url(${imageURL})">
            <a href= "product.html?id=${id}">
                <h3>
                    ${bannerTitle.join("<br>")}
                    <p class="banner_content">${bannerViceTitle}</p>
                </h3>
            </a>
        </div>
    `;
    bannerSlider.innerHTML += contentInBanner;
    //多個物件
  });
};

//slider 寫法

var slideIndex = 0;
function showSlides() {
  var i;
  slides = document.querySelectorAll(".banners");
  index = (index + 1) % slides.length;
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("out");
  }
  slideIndex++;  
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].classList.remove("out");
  slides[slideIndex-1].classList.add("in");
   setTimeout(showSlides, 4000);
}
