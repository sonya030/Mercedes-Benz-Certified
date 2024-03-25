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

/* Swiper */
var swiper = new Swiper(".detailSwiper", {
  spaceBetween: 0,
  slidesPerView: 4,
  breakpoints: {
    430: {
      spaceBetween: 0,
      slidesPerView: 9,
    },
    885: {
      spaceBetween: 0,
      slidesPerView: 3,
    },
  },
  allowTouchMove: false,
});
var swiper2 = new Swiper(".detailSwiper2", {
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
