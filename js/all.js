"use strict";

(function () {
  var getEl = function getEl(el) {
    return document.querySelector(el);
  };

  var getAllEl = function getAllEl(el) {
    return document.querySelectorAll(el);
  };

  var animated = function animated(el, className) {
    var item = getAllEl(el);
    var windowHeight = document.documentElement.clientHeight;
    var windowPos = window.pageYOffset;

    for (var i = 0; i < item.length; i++) {
      var thisPos = item[i].offsetTop;

      if (thisPos >= windowPos && thisPos <= windowPos + windowHeight) {
        item[i].style.visibility = 'visible';
        item[i].classList.add(className);
      }
    } // item.forEach((el) => {
    //   const thisPos = el.offsetTop
    //   if (thisPos >= windowPos && thisPos <= windowPos + windowHeight) {
    //     el.style.visibility = 'visible'
    //     el.classList.add(className)
    //   }
    // })


    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;

      for (var _i = 0; _i < item.length; _i++) {
        var _thisPos = item[_i].offsetTop;

        if (_thisPos >= scrollY && _thisPos <= scrollY + windowHeight) {
          item[_i].style.visibility = 'visible';

          item[_i].classList.add(className);
        }
      } // item.forEach((el) => {
      //   const thisPos = el.offsetTop
      //   if (thisPos >= scrollY && thisPos <= scrollY + windowHeight) {
      //     el.style.visibility = 'visible'
      //     el.classList.add(className)
      //   }
      // })

    }, false);
  };

  document.addEventListener('readystatechange', function () {
    // loading icon
    var state = document.readyState;
    var spinner = getEl('.spinner-wrapper');

    if (state === 'complete') {
      setTimeout(function () {
        spinner.style.visibility = 'hidden';

        if (getEl('.animated-left')) {
          animated('.animated-left', 'fadeinLeft');
        }

        if (getEl('.animated-right')) {
          animated('.animated-right', 'fadeinRight');
        }

        if (getEl('.animated-up')) {
          animated('.animated-up', 'fadeinUp');
        } // if (getEl('.animated')) {
        //   // Image Fade In
        //   let windowHeight = $(window).height()
        //   $('.animated').each(function () {
        //     let thisPos = $(this).offset().top
        //     if (thisPos < windowHeight) {
        //       $(this).addClass('fade-in')
        //     } else {
        //       $(window).scroll(function () {
        //         let scrollTop = $(window).scrollTop()
        //         $('.animated').each(function () {
        //           let thisPos = $(this).offset().top
        //           if ((scrollTop + windowHeight) >= thisPos) {
        //             $(this).addClass('fade-in')
        //           }
        //         })
        //       })
        //     }
        //   })
        // }

      }, 1000);
    }
  });
  $(function () {
    /* 啟用 popover */
    $('[data-toggle="popover"]').popover();
    /* multiple modal start */

    $('.modal').on('show.bs.modal', function () {
      $('body').css('overflow', 'hidden');
    });
    $('.modal').on('hide.bs.modal', function () {
      $('body').css('overflow', 'auto');
    });
    /* multiple modal end */

    /* focus to first text input start */

    $('#registeredModal').on('shown.bs.modal', function () {
      $('#registeredUsername').focus();
    });
    $('#loginModal').on('shown.bs.modal', function () {
      $('#loginUsername').focus();
    });
    $('#forgotPasswordModal').on('shown.bs.modal', function () {
      $('#forgotPasswordUsername').focus();
    });
    /* focus to first text input end */
  });

  if (getEl('.go-top')) {
    // slot go top
    var goTopBtn = getEl('.go-top');

    window.onscroll = function () {
      if (window.scrollY > 200) {
        goTopBtn.style.opacity = '1';
      } else {
        goTopBtn.style.opacity = '0';
      }
    };

    $(goTopBtn).click(function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 800);
    });
  }

  if (getEl('.lang-select')) {
    // 選擇語系
    var langWrapper = getEl('.lang-list');
    var currentLang = getEl('.current-lang');

    var changeLanguage = function changeLanguage(e) {
      var selectedLang = e.target.dataset.value;

      if (selectedLang === 'En') {
        currentLang.innerHTML = "<img src=\"images/lang_en.svg\" alt=\"En\">";
      } else if (selectedLang === 'Th') {
        currentLang.innerHTML = "<img src=\"images/lang_th.svg\" alt=\"Th\">";
      }
    };

    langWrapper.addEventListener('click', changeLanguage, false);
  }

  if (getEl('.currentDate')) {
    // current date
    var inputDate = getAllEl('.currentDate');
    inputDate.forEach(function (el) {
      el.value = moment().format('YYYY-MM-DD');
    });
  }

  if (getEl('.currentTime')) {
    // current time
    var inputTime = getEl('.currentTime');
    inputTime.value = moment().format('HH:mm');
  }

  if (getEl('.swiper-wrapper')) {
    // index carousel
    var mySwiper = new Swiper('.banner-wrapper', {
      // eslint-disable-line no-unused-vars
      autoplay: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        prevEl: '.banner-button-prev',
        nextEl: '.banner-button-next'
      }
    });
  }

  $('.marquee-wrapper').marquee({
    // 首頁跑馬燈文字
    duration: 20000,
    delayBeforeStart: 0,
    direction: 'left',
    duplicated: true
  });

  if (getEl('.aside-right')) {
    // 關閉右側 QRcode
    var item = getEl('.aside-right');
    var closeBtn = getEl('.aside-right-close');
    closeBtn.addEventListener('click', function () {
      item.classList.add('closed');
    }, false);
  }

  if (getEl('.aside-event')) {
    // 關閉右側 Party 圖
    var _item = getEl('.aside-event');

    var _closeBtn = getEl('.aside-event-close');

    _closeBtn.addEventListener('click', function (e) {
      e.preventDefault();

      _item.classList.add('closed');
    }, false);
  }

  $('#downloadMobileModal').on('shown.bs.modal', function (e) {
    // 手機下載視窗輪播
    var swiper = new Swiper('.download-mobile-wrapper', {
      // eslint-disable-line no-unused-vars
      slidesPerView: 3,
      slidesPerGroup: 3,
      navigation: {
        prevEl: '.button-prev',
        nextEl: '.button-next'
      }
    });
  });

  if (getEl('.psw-icon')) {
    (function () {
      // 顯示或隱藏密碼
      var icon = getAllEl('.psw-icon');

      var _loop = function _loop(i) {
        var iconStyle = icon[i].style;
        var hideIcon = 'url("images/icon_psw_shutdown.svg")';
        var showIcon = 'url("images/icon_psw.svg")';
        icon[i].addEventListener('click', function () {
          var childEl = icon[i].parentElement.children;

          if (iconStyle.backgroundImage === hideIcon) {
            iconStyle.backgroundImage = showIcon;
            Array.prototype.forEach.call(childEl, function (el) {
              if (el.nodeName === 'INPUT') {
                el.type = 'text';
              }
            });
          } else if (iconStyle.backgroundImage === showIcon) {
            iconStyle.backgroundImage = hideIcon;
            Array.prototype.forEach.call(childEl, function (el) {
              if (el.nodeName === 'INPUT') {
                el.type = 'password';
              }
            });
          }
        }, false);
      };

      for (var i = 0; i < icon.length; i++) {
        _loop(i);
      } // icon.forEach((el) => {
      //   let iconStyle = el.style
      //   let hideIcon = 'url("images/icon_psw_shutdown.svg")'
      //   let showIcon = 'url("images/icon_psw.svg")'
      //   el.addEventListener('click', () => {
      //     let childEl = el.parentElement.children
      //     if (iconStyle.backgroundImage === hideIcon) {
      //       iconStyle.backgroundImage = showIcon
      //       Array.prototype.forEach.call(childEl, (el) => {
      //         if (el.nodeName === 'INPUT') {
      //           el.type = 'text'
      //         }
      //       })
      //     } else if (iconStyle.backgroundImage === showIcon) {
      //       iconStyle.backgroundImage = hideIcon
      //       Array.prototype.forEach.call(childEl, (el) => {
      //         if (el.nodeName === 'INPUT') {
      //           el.type = 'password'
      //         }
      //       })
      //     }
      //   }, false)
      // })

    })();
  }

  if (getEl('.member-input')) {
    // member modal input style
    var memberInput = getAllEl('.member-input');
    memberInput.forEach(function (el) {
      el.addEventListener('keyup', function () {
        var childEl = el.parentElement.children;

        if (el.value) {
          el.classList.add('valued');
          Array.prototype.forEach.call(childEl, function (el) {
            if (el.className === 'input-icon') {
              el.style.opacity = '0.8';
            }
          });
        } else if (!el.value) {
          el.classList.remove('valued');
          Array.prototype.forEach.call(childEl, function (el) {
            if (el.className === 'input-icon') {
              el.style.opacity = '0.6';
            }
          });
        }
      }, false);
    });
  }

  if (getEl('.copy-btn')) {
    // 複製文字
    var copyBtn = getEl('.copy-btn');

    var copyToClipBoard = function copyToClipBoard(e) {
      e.preventDefault();
      var inputEl = document.createElement('input');
      var inputWrapper = getEl('.input-element');
      var copyArea = getEl('.copy-text');
      var copyStatus = document.execCommand('copy');
      var message;

      if (copyArea.nodeName === 'INPUT') {
        inputEl.setAttribute('value', copyArea.value);
      } else {
        inputEl.setAttribute('value', copyArea.textContent);
      }

      inputWrapper.appendChild(inputEl);
      inputEl.select();
      document.execCommand('copy');
      inputWrapper.removeChild(inputEl);
      copyStatus ? message = 'Copied' : message = 'Unable to copy';
      $(copyBtn).tooltip({
        trigger: 'click',
        placement: 'top',
        title: message
      });
      $(copyBtn).tooltip('show');
      setTimeout(function () {
        $(copyBtn).tooltip('hide');
      }, 1500);
    };

    copyBtn.addEventListener('click', copyToClipBoard, false);
  }

  if (getEl('.slots-game-pagination')) {
    // slots-game 分頁
    var paginationList = getEl('.slots-game-pagination');
    var slotsCardList = getEl('.slots-card-list');
    var slotsNoGames = getEl('.slots-no-games');

    var fakeData = function fakeData() {
      var result = [];

      for (var i = 1; i < 49; i++) {
        result.push(i);
      }

      return result; // 假資料陣列
    };

    var dataLength = fakeData().length; // 總資料數

    var currentPage = 1; // 目前的頁碼

    var pageSize = 24; // 每頁資料數

    var totalPage = Math.ceil(dataLength / pageSize); // 總頁數

    var lastPageSize = dataLength % pageSize; // 最後一頁的資料數

    var pageString; // 頁碼字串

    var dataString; // 資料字串

    var renderPagination = function renderPagination(page) {
      // 印出頁碼
      var startPageNumber;
      var endPageNumber;
      pageString = '';

      if (totalPage > 0 && totalPage <= 5) {
        // 總頁數小於等於五頁，印出全部的頁碼
        startPageNumber = 1;
        endPageNumber = totalPage;

        for (var i = startPageNumber; i <= endPageNumber; i++) {
          if (i === page) {
            pageString += "<li><a class=\"page-item active\" href=\"#\" data-page=\"".concat(i, "\">").concat(i, "</a></li>");
          } else {
            pageString += "<li><a class=\"page-item\" href=\"#\" data-page=\"".concat(i, "\">").concat(i, "</a></li>");
          }
        }
      } else if (totalPage > 5) {
        // 總頁數大於五頁，只印出五個頁碼
        if (page >= 1 && page <= 3) {
          // 目前點擊的頁碼是 1-3 頁
          startPageNumber = 1;
          endPageNumber = 5;

          for (var _i2 = startPageNumber; _i2 <= endPageNumber; _i2++) {
            if (_i2 === page) {
              pageString += "<li><a class=\"page-item active\" href=\"#\" data-page=\"".concat(_i2, "\">").concat(_i2, "</a></li>");
            } else {
              pageString += "<li><a class=\"page-item\" href=\"#\" data-page=\"".concat(_i2, "\">").concat(_i2, "</a></li>");
            }
          }
        } else if (page >= totalPage - 2 && page <= totalPage) {
          // 目前點擊的頁碼是倒數 3 頁
          startPageNumber = totalPage - 4;
          endPageNumber = totalPage;

          for (var _i3 = startPageNumber; _i3 <= endPageNumber; _i3++) {
            if (_i3 === page) {
              pageString += "<li><a class=\"page-item active\" href=\"#\" data-page=\"".concat(_i3, "\">").concat(_i3, "</a></li>");
            } else {
              pageString += "<li><a class=\"page-item\" href=\"#\" data-page=\"".concat(_i3, "\">").concat(_i3, "</a></li>");
            }
          }
        } else {
          startPageNumber = page - 2;
          endPageNumber = page + 2;

          for (var _i4 = startPageNumber; _i4 <= endPageNumber; _i4++) {
            if (_i4 === page) {
              pageString += "<li><a class=\"page-item active\" href=\"#\" data-page=\"".concat(_i4, "\">").concat(_i4, "</a></li>");
            } else {
              pageString += "<li><a class=\"page-item\" href=\"#\" data-page=\"".concat(_i4, "\">").concat(_i4, "</a></li>");
            }
          }
        }
      }

      if (totalPage > 0) {
        paginationList.innerHTML = "\n        <li><a class=\"page-fl page-first\" href=\"#\" data-page=\"1\">First</a></li>\n        <li><a class=\"page-pn page-prev\" href=\"#\" data-page=\"prev\">Previous</a></li>\n        ".concat(pageString, "\n        <li><a class=\"page-pn page-next\" href=\"#\" data-page=\"next\">Next</a></li>\n        <li><a class=\"page-fl page-last\" href=\"#\" data-page=\"").concat(totalPage, "\">Last</a></li>");

        if (page === 1 && page !== totalPage) {
          getEl('.page-first').classList.add('disabled');
          getEl('.page-prev').classList.add('disabled');
        } else if (page !== 1 && page === totalPage) {
          getEl('.page-next').classList.add('disabled');
          getEl('.page-last').classList.add('disabled');
        } else if (page === 1 && page === totalPage) {
          getEl('.page-first').classList.add('disabled');
          getEl('.page-prev').classList.add('disabled');
          getEl('.page-next').classList.add('disabled');
          getEl('.page-last').classList.add('disabled');
        }
      } else if (totalPage <= 0) {
        getEl('.slots-game-pagination-wrapper').style.display = 'none';
      }
    };

    var renderData = function renderData() {
      var startIndex;
      var endIndex;
      dataString = '';

      if (dataLength < 1) {
        slotsNoGames.style.display = 'block';
      } else if (dataLength >= 1) {
        slotsNoGames.style.display = 'none';
        startIndex = (currentPage - 1) * pageSize;

        if (currentPage === totalPage && lastPageSize !== 0) {
          endIndex = startIndex + lastPageSize;
        } else {
          endIndex = currentPage * pageSize;
        }

        for (var i = startIndex; i < endIndex; i++) {
          dataString += "\n          <li>\n            <div class=\"slots-card-img\"><img src=\"images/slots_test.webp\" alt=\"\"/></div>\n            <div class=\"slots-card-text\">\n            <h3>Game Name ".concat(fakeData()[i], "</h3>\n            <ul class=\"btn-list\">\n              <li><a class=\"play-btn\" href=\"#\">Play Now</a></li>\n              <li><a class=\"free-btn\" href=\"#\">Free</a></li>\n            </ul>\n            </div>\n          </li>");
        }
      }

      slotsCardList.innerHTML = dataString; // 將資料寫入 .slots-card-list
    };

    var getPage = function getPage(e) {
      // 目前點擊到的頁碼
      e.preventDefault();
      var page;

      if (e.target.nodeName === 'A') {
        page = e.target.dataset.page; // 點擊到的頁碼

        if (page === 'prev' || page === 'next') {
          if (page === 'prev' && currentPage !== 1) {
            currentPage = currentPage - 1;
          } else if (page === 'next' && currentPage !== totalPage) {
            currentPage = currentPage + 1;
          }
        } else {
          currentPage = Number(page);
        }

        renderPagination(currentPage);
        renderData();
      }
    };

    renderPagination(currentPage); // 進到頁面渲染頁碼和資料

    renderData();
    paginationList.addEventListener('click', getPage, false);
  }

  if (getEl('#historySelect')) {
    // 切換 History 表格
    var historyTableWrapper = getEl('.history-table');
    var historyTableTitle = getEl('.table-title');
    var historyTableContent = getEl('.table-content');
    var historySelect = getEl('#historySelect');

    var data = function data() {
      var result = [];

      for (var i = 1; i < 99; i++) {
        result.push(i);
      }

      return result;
    };

    var changeHistoryTable = function changeHistoryTable(e) {
      var currentSelected = e.target.value;

      if (currentSelected === 'Statement') {
        historyTableWrapper.classList.add('statement');
        historyTableWrapper.classList.remove('transfer');
        historyTableWrapper.classList.remove('transaction');
        historyTableTitle.innerHTML = "<tr>\n        <th>Type</th>\n        <th>Turnover</th>\n        <th>Win/Loss</th>\n        <th width=\"120\">Active Bet</th>\n        </tr>";
        $('.pagination').pagination({
          dataSource: data(),
          prevText: '',
          nextText: '',
          callback: function callback(data, pagination) {
            var dataHtml = '';
            $.each(data, function (index, item) {
              dataHtml += "\n              <tr>\n                <td>Total</td>\n                <td>0.00</td>\n                <td>0.00</td>\n                <td>".concat(30.00 + item, "</td>\n              </tr>");
            });
            $(historyTableContent).html(dataHtml);
          }
        });
      } else if (currentSelected === 'Transfer') {
        historyTableWrapper.classList.remove('statement');
        historyTableWrapper.classList.remove('transaction');
        historyTableWrapper.classList.add('transfer');
        historyTableTitle.innerHTML = "\n        <tr>\n          <th>Date</th>\n          <th>pages.from</th>\n          <th>pages.to</th>\n          <th>Amount</th>\n          <th>Status</th>\n        </tr>";
        $('.pagination').pagination({
          dataSource: data(),
          prevText: '',
          nextText: '',
          callback: function callback(data, pagination) {
            var dataHtml = '';
            $.each(data, function (index, item) {
              dataHtml += "\n              <tr>\n                <td>2019/02/25 15:35:56</td>\n                <td>Spadegaming</td>\n                <td>Evolution Gaming</td>\n                <td>".concat(30.00 + item, "</td>\n                <td>Success</td>\n              </tr>");
            });
            $(historyTableContent).html(dataHtml);
          }
        });
      } else if (currentSelected === 'Transaction') {
        historyTableWrapper.classList.remove('statement');
        historyTableWrapper.classList.remove('transfer');
        historyTableWrapper.classList.add('transaction');
        historyTableTitle.innerHTML = "\n        <tr>\n          <th>Date</th>\n          <th>ID</th>\n          <th>Type</th>\n          <th>Amount</th>\n          <th>Status</th>\n          <th>Remark</th>\n        </tr>";
        $('.pagination').pagination({
          dataSource: data(),
          prevText: '',
          nextText: '',
          callback: function callback(data, pagination) {
            var dataHtml = '';
            $.each(data, function (index, item) {
              dataHtml += "\n              <tr>\n                <td>2019/02/25 15:35:56</td>\n                <td>024735</td>\n                <td>Withdrawal</td>\n                <td>".concat(30.00 + item, "</td>\n                <td>Success</td>\n                <td>Testing</td>\n              </tr>");
            });
            $(historyTableContent).html(dataHtml);
          }
        });
      }
    };

    historyTableWrapper.classList.add('statement'); // 預設載入 statement 表格

    historyTableTitle.innerHTML = "<tr>\n    <th>Type</th>\n    <th>Turnover</th>\n    <th>Win/Loss</th>\n    <th width=\"120\">Active Bet</th>\n    </tr>";
    $('.pagination').pagination({
      dataSource: data(),
      prevText: '',
      nextText: '',
      callback: function callback(data, pagination) {
        var dataHtml = '';
        $.each(data, function (index, item) {
          dataHtml += "<tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td>".concat(30.00 + item, "</td>\n          </tr>");
        });
        $(historyTableContent).html(dataHtml);
      }
    });
    historySelect.addEventListener('change', changeHistoryTable, false);
  }

  if (getEl('#loginModal')) {
    // 登入表單驗證訊息
    var formWrapper = document.login;
    var username = formWrapper['username'];
    var password = formWrapper['password'];
    var submit = formWrapper['submit'];

    var controlSubmitBtn = function controlSubmitBtn() {
      if (username.value.length >= 6 && password.value.length >= 6) {
        submit.disabled = false;
      } else {
        submit.disabled = true;
      }
    };

    username.addEventListener('keyup', function () {
      controlSubmitBtn();
    }, false);
    password.addEventListener('keyup', function () {
      controlSubmitBtn();
    }, false);
  }

  if (getEl('#registeredModal')) {
    // 註冊表單驗證訊息
    var _formWrapper = document.registered;
    var _username = _formWrapper['username'];
    var _password = _formWrapper['password'];
    var verifyPassword = _formWrapper['verifyPassword'];
    var fullName = _formWrapper['fullName'];
    var mobile = _formWrapper['mobile'];
    var _submit = _formWrapper['submit'];

    var _controlSubmitBtn = function _controlSubmitBtn() {
      if (_username.className === 'is-valid' && _password.className === 'is-valid' && verifyPassword.className === 'is-valid' && fullName.className === 'is-valid' && mobile.className === 'is-valid') {
        _submit.disabled = false;
      } else {
        _submit.disabled = true;
      }
    };

    var validateUsername = function validateUsername(e) {
      var str = _username.value;
      var strLength = str.length;
      var specialSymbolsRegex = /^[a-zA-Z0-9]*$/;
      var numberRegex = /[0-9]/;
      var englishRegex = /[a-zA-Z]/;

      if (str) {
        if (!specialSymbolsRegex.test(str)) {
          // 只能有英文和數字
          _username.className = 'is-invalid';
          _username.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n          <span class=\"feedback-text\">Username cannot use special symbols.</span>";
        } else if (strLength < 6) {
          // 字數至少六個字
          _username.className = 'is-invalid';
          _username.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n          <span class=\"feedback-text\">Username is less than 6 characters.</span>";
        } else if (!numberRegex.test(str)) {
          // 必須包含數字
          _username.className = 'is-invalid';
          _username.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n          <span class=\"feedback-text\">Usernames need to have numbers.</span>";
        } else if (!englishRegex.test(str)) {
          // 必須包含英文字母
          _username.className = 'is-invalid';
          _username.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n          <span class=\"feedback-text\">Usernames must have English characters.</span>";
        } else {
          // 正確
          _username.className = 'is-valid';
          _username.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_correct.svg\" alt=\"correct\">\n          <span class=\"feedback-text\">This uesrname can be used.</span>";
        }
      } else {
        _username.className = '';
        _username.nextElementSibling.innerHTML = '';
      }

      _controlSubmitBtn();
    };

    var validateVerifyPassword = function validateVerifyPassword() {
      var str = verifyPassword.value;

      if (str) {
        if (str !== _password.value && _password.className === 'is-valid') {
          // 兩次密碼不相同
          verifyPassword.className = 'is-invalid';
          verifyPassword.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n          <span class=\"feedback-text\">The password input is not the same twice.</span>";
        } else if (_password.className === 'is-invalid') {
          // 密碼格式錯誤
          verifyPassword.className = '';
          verifyPassword.nextElementSibling.innerHTML = '';
        } else if (str === _password.value && _password.className === 'is-valid') {
          verifyPassword.className = 'is-valid';
          verifyPassword.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_correct.svg\" alt=\"correct\">\n          <span class=\"feedback-text\">Password is okay.</span>";
        }
      } else {
        verifyPassword.className = '';
        verifyPassword.nextElementSibling.innerHTML = '';
      }

      _controlSubmitBtn();
    };

    var validatePassword = function validatePassword() {
      var str = _password.value;
      var strLength = str.length;
      var specialSymbolsRegex = /^[a-zA-Z0-9]*$/; // const lowercaseRegex = /[a-z]/
      // const numberRegex = /[0-9]/
      // const uppercaseRegex = /[A-Z]/

      if (str) {
        if (!specialSymbolsRegex.test(str)) {
          // 只能有英文和數字
          _password.className = 'is-invalid';
          _password.nextElementSibling.innerHTML = "\n            <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n            <span class=\"feedback-text\">Password cannot use special symbols.</span>";
        } else if (strLength < 6) {
          // 字數至少六個字
          _password.className = 'is-invalid';
          _password.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n          <span class=\"feedback-text\">Password is less than 6 characters.</span>"; // } else if (!lowercaseRegex.test(str)) {
          //     // 必須包含小寫英文字母
          //     password.className = 'is-invalid'
          //     password.nextElementSibling.innerHTML = `
          //     <img src="images/icon_error.svg" alt="incorrect">
          //     <span class="feedback-text">Password must contain lowercase English characters.</span>`
          // } else if (!numberRegex.test(str)) {
          //   // 必須包含數字
          //   password.className = 'is-invalid'
          //   password.nextElementSibling.innerHTML = `
          //   <img src="images/icon_error.svg" alt="incorrect">
          //   <span class="feedback-text">Password must contain a number.</span>`
          // } else if (!uppercaseRegex.test(str)) {
          //   // 必須包含大寫英文字母
          //   password.className = 'is-invalid'
          //   password.nextElementSibling.innerHTML = `
          //   <img src="images/icon_error.svg" alt="incorrect">
          //   <span class="feedback-text">Password must contain uppercase English characters.</span>`
        } else {
          // 正確
          _password.className = 'is-valid';
          _password.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_correct.svg\" alt=\"correct\">\n          <span class=\"feedback-text\">Password is okay.</span>";
        }
      } else {
        _password.className = '';
        _password.nextElementSibling.innerHTML = '';
      }

      validateVerifyPassword();

      _controlSubmitBtn();
    };

    var validateFullName = function validateFullName() {
      var str = fullName.value;
      var regex = /^[a-zA-Z\u0e00-\u0e7e][a-zA-Z\u0e00-\u0e7e\s]*$/;

      if (str) {
        if (!regex.test(str)) {
          // 只能填英文、泰文，首字不能空白，字跟字中間可輸入空白
          fullName.className = 'is-invalid';
          fullName.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n          <span class=\"feedback-text\">Please enter the correct name format.</span>";
        } else if (regex.test(str)) {
          fullName.className = 'is-valid';
          fullName.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_correct.svg\" alt=\"correct\">\n          <span class=\"feedback-text\">Full name is okay.</span>";
        }
      } else {
        fullName.className = '';
        fullName.nextElementSibling.innerHTML = '';
      }

      _controlSubmitBtn();
    };

    var validateMobile = function validateMobile() {
      var str = mobile.value;
      var strLength = str.length;
      var numberRegex = /^[0][0-9]*$/;

      if (str) {
        if (!numberRegex.test(str) || strLength < 9 || strLength > 10) {
          // 只能填數字，至少 9 個字，最多 10 個字
          mobile.className = 'is-invalid';
          mobile.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n          <span class=\"feedback-text\">Please enter the correct Mobile Number format.</span>";
        } else {
          mobile.className = 'is-valid';
          mobile.nextElementSibling.innerHTML = "\n          <img src=\"images/icon_correct.svg\" alt=\"correct\">\n          <span class=\"feedback-text\">Mobile Number is okay.</span>";
        }
      } else {
        mobile.className = '';
        mobile.nextElementSibling.innerHTML = '';
      }

      _controlSubmitBtn();
    };

    _username.addEventListener('keyup', validateUsername, false);

    _password.addEventListener('keyup', validatePassword, false);

    verifyPassword.addEventListener('keyup', validateVerifyPassword, false);
    fullName.addEventListener('keyup', validateFullName, false);
    mobile.addEventListener('keyup', validateMobile, false);
  }

  if (getEl('#forgotPasswordModal')) {
    // 忘記密碼驗證訊息
    var _formWrapper2 = document.forgotPassword;
    var _username2 = _formWrapper2['username'];
    var _mobile = _formWrapper2['mobile'];
    var _submit2 = _formWrapper2['submit'];

    var _controlSubmitBtn2 = function _controlSubmitBtn2() {
      if (_username2.className === '' && _username2.value !== '' && _mobile.className === '' && _mobile.value !== '') {
        _submit2.disabled = false;
      } else {
        _submit2.disabled = true;
      }
    };

    var _validateUsername = function _validateUsername() {
      var str = _username2.value;
      var specialSymbolsRegex = /^[a-zA-Z0-9]*$/;

      if (!specialSymbolsRegex.test(str)) {
        // 只能填英文和數字
        _username2.className = 'is-invalid';
        _username2.nextElementSibling.innerHTML = "\n        <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n        <span class=\"feedback-text\">Please enter the correct username format.</span>";
      } else {
        _username2.className = '';
        _username2.nextElementSibling.innerHTML = '';
      }

      _controlSubmitBtn2();
    };

    var _validateMobile = function _validateMobile() {
      var str = _mobile.value;
      var strLength = str.length;
      var numberRegex = /^[0][0-9]*$/;

      if (!numberRegex.test(str) || strLength < 9 || strLength > 10) {
        // 只能填數字，至少 9 個字，最多 10 個字
        _mobile.className = 'is-invalid';
        _mobile.nextElementSibling.innerHTML = "\n        <img src=\"images/icon_error.svg\" alt=\"incorrect\">\n        <span class=\"feedback-text\">Please enter the correct Mobile Number format.</span>";
      } else {
        _mobile.className = '';
        _mobile.nextElementSibling.innerHTML = '';
      }

      _controlSubmitBtn2();
    };

    _username2.addEventListener('keyup', _validateUsername, false);

    _mobile.addEventListener('keyup', _validateMobile, false);
  }
})();