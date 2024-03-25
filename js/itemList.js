let trigger = document.querySelector(".trigger"),
  site_map = document.querySelector(".site_map"),
  header_img = document.querySelector(".header_logo>img"),
  header_logo = document.querySelector(".header_logo>p"),
  Header = document.querySelector(".header"),
  line = document.querySelector(".line"),
  logoText = document.querySelector(".logo_text");

// trigger
trigger.addEventListener("click", function () {
  this.classList.toggle("active");
  site_map.classList.toggle("active");
  line.classList.toggle("active");
  logoText.classList.toggle("active");
});

// subMenu 클릭시 화살표 움직임
let submenu = document.querySelectorAll(".sub_menu");
let arrow = document.querySelectorAll("#arrow");

for (let i = 0; i < arrow.length; i++) {
  submenu[i].addEventListener("click", function () {
    arrow[i].classList.toggle("on");
  });
}

// header 반응형
const subMenus = document.querySelectorAll(".sub_menu");

console.log(subMenus, arrow);
subMenus.forEach(function (subMenu) {
  subMenu.addEventListener("click", function () {
    const mobileSubtab = subMenu.nextElementSibling;

    if (mobileSubtab.style.display === "block") {
      mobileSubtab.style.display = "none";
    } else {
      closeAllMobileSubtabs();
      mobileSubtab.style.display = "block";
    }
  });
});
function closeAllMobileSubtabs() {
  document.querySelectorAll(".mobile_subtab").forEach(function (subtab) {
    subtab.style.display = "none";
  });
}

//헤더
const top_bar = document.querySelector(".header");

function scrollEvent() {
  document.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 50) {
      top_bar.classList.add("active");
    } else {
      top_bar.classList.remove("active");
    }
  });
}

function init() {
  document.addEventListener("scroll", scrollEvent);
}

init();

// 모달 시작
let modal = document.querySelector(".modal");
let closeModalBtn = document.querySelector(".modal_close");
let openModalBtn = document.querySelector(".open_madal");
console.log(modal, closeModalBtn, openModalBtn);

// 모달열기
openModalBtn.addEventListener("click", function () {
  modal.style.display = "block";
  modal.style.opacity = "0";
  fadeIn(modal, 1000);
  console.log("모달이 열렸다.");
});
//모달닫기
closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
  console.log("모달이 닫혔다.");
});

//페이드인 함수 : 없었다가 서서히 나타나는값
function fadeIn(element, duration) {
  let opacity = 0;
  let interval = 80; //80밀리초 간격으로 투명도 조절
  let gap = interval / duration;
  function fadeInInterval() {
    opacity += gap;
    element.style.opacity = String(opacity);
    if (opacity >= 1) {
      element.style.display = "block";
      clearInterval(fading); // 페이드 인이 완료되면 clearInterval 호출
    }
  }
  let fading = setInterval(fadeInInterval, interval);
}

// gotop 버튼
goToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.addEventListener("scroll", function () {
  var height = document.documentElement.scrollTop;
  if (height > 110) {
    this.document.querySelector(".gototop_Btn").style.opacity = 1;
  } else {
    this.document.querySelector(".gototop_Btn").style.opacity = 0;
  }
});

/*itemList sorting */
const lowPriceBtn = document.querySelector(".low-price-sort-btn"); // 낮은가격버튼
const highPriceBtn = document.querySelector(".high-price-sort-btn"); // 높은가격버튼
const popularBtn = document.querySelector(".popular-sort-btn"); // 인기높은순
const lowDistanceBtn = document.querySelector(".low-distance-sort-btn"); // 낮은주행
const itemWrap = document.querySelector(".item_wrap");
const fuelTypeSelect = document.querySelector("#fuel-type-select");
const fuelInfo = document.querySelectorAll(".fuel small");
const allItemShowBtn = document.querySelector(".all-item-show");
const itemCards = document.querySelectorAll(".item_card");

// 낮은 가격으로 정렬하는 버튼에 클릭 이벤트 리스너 추가
lowPriceBtn.addEventListener("click", () => sortItemsByPrice(true));
// 높은 가격으로 정렬하는 버튼에 클릭 이벤트 리스너 추가
highPriceBtn.addEventListener("click", () => sortItemsByPrice(false));
// 인기도로 정렬하는 버튼에 클릭 이벤트 리스너 추가
popularBtn.addEventListener("click", sortItemsByPopularity);
// 주행거리로 정렬하는 버튼에 클릭 이벤트 리스너 추가
lowDistanceBtn.addEventListener("click", sortItemsByDistance);
// 연료 유형 선택 셀렉트 박스에 변경 이벤트 리스너 추가
fuelTypeSelect.addEventListener("change", filterItemsByFuelType);
// "전체보기" 버튼에 클릭 이벤트 리스너 추가
allItemShowBtn.addEventListener("click", resetItems);

// 연료 유형 옵션 생성 및 추가
const fuelTypes = [
  "연료타입 선택",
  "가솔린",
  "디젤",
  "하이브리드 디젤",
  "하이브리드 가솔린",
];
fuelTypes.forEach((fuelType, index) => {
  const option = document.createElement("option");
  if (index === 0) {
    option.disabled = true;
    option.selected = true;
    option.textContent = fuelType;
  } else {
    option.value = fuelType;
    option.textContent = fuelType;
  }
  fuelTypeSelect.appendChild(option);
});
/* 
  주어진 코드는 연료 유형 선택 셀렉트 박스에 옵션을 동적으로 추가하는 부분. 
  여기서 fuelTypes 배열에 있는 각 연료 유형을 옵션으로 추가한다.

  1. fuelTypes 배열을 순회하면서 각 연료 유형에 대해 다음을 실행한다.
  2. document.createElement("option")을 사용하여 새로운 옵션 엘리먼트를 생성한다.
  3. 만약 인덱스가 0인 경우, option.disabled를 true로 설정하여 해당 옵션을 선택할 수 없도록 만드며 option.selected를 true로 설정하여 페이지 로드 시 이 옵션이 선택되도록 한다.
  4. 그렇지 않은 경우, option.value에는 연료 유형을 설정하고, option.textContent에도 연료 유형을 설정한다.
  5. 생성된 옵션 엘리먼트를 연료 유형 선택 셀렉트 박스에 추가한다.
  6. 이러한 과정을 거쳐 연료 유형 선택 셀렉트 박스에 옵션을 추가하여 사용자가 선택할 수 있도록 한다.
*/
// 가격에 따라 아이템을 정렬하는 함수
function sortItemsByPrice(isLowToHigh) {
  const sortedItems = Array.from(itemWrap.children).sort((a, b) => {
    const priceA = parseInt(a.getAttribute("data-price"));
    const priceB = parseInt(b.getAttribute("data-price"));
    return isLowToHigh ? priceA - priceB : priceB - priceA;
  });
  renderSortedItems(sortedItems);
}

// 인기도에 따라 아이템을 정렬하는 함수
function sortItemsByPopularity() {
  const sortedItems = Array.from(itemWrap.children).sort((a, b) => {
    const popularA = parseInt(a.getAttribute("data-popular"));
    const popularB = parseInt(b.getAttribute("data-popular"));
    return popularA - popularB;
  });
  renderSortedItems(sortedItems);
}

// 주행거리에 따라 아이템을 정렬하는 함수
function sortItemsByDistance() {
  const sortedItems = Array.from(itemWrap.children).sort((a, b) => {
    const distanceA = parseInt(a.getAttribute("data-distanceDriven"));
    const distanceB = parseInt(b.getAttribute("data-distanceDriven"));
    return distanceA - distanceB;
  });
  renderSortedItems(sortedItems);
}

// 정렬된 아이템들을 화면에 렌더링하는 함수
function renderSortedItems(sortedItems) {
  itemWrap.innerHTML = "";
  sortedItems.forEach((item) => {
    itemWrap.appendChild(item);
  });
}

// 선택된 연료 유형에 따라 아이템을 필터링하는 함수
function filterItemsByFuelType() {
  const selectedFuelType = this.value;
  fuelInfo.forEach((info) => {
    const itemFuelType = info.textContent.trim();
    const itemCard = info.closest(".item_card");
    if (itemFuelType === selectedFuelType) {
      itemCard.style.display = "block";
    } else {
      itemCard.style.display = "none";
    }
  });
}

// "전체보기" 버튼을 클릭했을 때 모든 아이템을 보이도록 설정하는 함수
function resetItems() {
  itemCards.forEach((card) => {
    card.style.display = "block";
  });
  fuelTypeSelect.selectedIndex = 0;
}
