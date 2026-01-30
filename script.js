(function () {
  "use strict";

  var header = document.querySelector(".header");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".nav-list a");
  var revealEls = document.querySelectorAll(".reveal");

  // 스크롤 시 헤더 그림자
  function onScroll() {
    if (header && window.scrollY > 20) {
      header.classList.add("scrolled");
    } else if (header) {
      header.classList.remove("scrolled");
    }
  }

  // 스크롤 등장 애니메이션 (Intersection Observer)
  function initReveal() {
    if (!revealEls.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // 모바일 메뉴 토글
  if (navToggle && nav) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("is-open");
      var isOpen = nav.classList.contains("is-open");
      navToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    });
  }

  // 네비 링크 클릭 시 스무스 이동 후 모바일 메뉴 닫기
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        var targetId = href.slice(1);
        var target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (nav) nav.classList.remove("is-open");
        }
      }
    });
  });

  // 메뉴 외부 클릭 시 모바일 메뉴 닫기
  document.addEventListener("click", function (e) {
    if (!nav || !nav.classList.contains("is-open")) return;
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      nav.classList.remove("is-open");
    }
  });

  // 우측 섹션 인디케이터 – 현재 보이는 섹션에 active
  var sections = document.querySelectorAll("#hero, #about, #experience, #strengths, #contact");
  var sideDots = document.querySelectorAll(".side-nav-dot");

  function updateSideNav() {
    var scrollY = window.scrollY;
    var viewportMid = scrollY + window.innerHeight / 2;
    var currentId = "hero";

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      if (viewportMid >= top && viewportMid < top + height) {
        currentId = section.id;
      }
    });

    sideDots.forEach(function (dot) {
      if (dot.getAttribute("data-section") === currentId) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  if (sideDots.length) {
    window.addEventListener("scroll", updateSideNav, { passive: true });
    updateSideNav();

    sideDots.forEach(function (dot) {
      dot.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  // 이벤트 바인딩
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  initReveal();
})();
