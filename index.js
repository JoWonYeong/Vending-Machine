let card = document.querySelectorAll('.card');
let vending1_obtained = document.querySelector('.vending1-obtained');
let vending2_obtained = document.querySelector('.vending2-obtained');

for (let i = 0; i < card.length; i++) {
  let index = i;

  card[i].addEventListener('click', (e) => {
    // 1. 변수 설정
    // card_target : 눌린 <button>
    let card_target;

    // 클릭된 음료 이름
    let target_name = menu_list[index].name;
    // 클릭된 음료 이미지 url
    let target_img = menu_list[index].img;
    // 클릭된 음료 가격
    let target_price = parseInt(menu_list[index].price);
    // 클릭된 음료 재고
    let target_stock = menu_list[index].stock;

    // 재고가 0 일 때
    if (target_stock == 0) {
      alert('품절 상품은 선택 불가능합니다.');
    }

    // 품절 아닌 card 누르면
    if (target_stock > 0) {
      //  1. 보라색 테두리쳐줌
      if (e.target.nodeName != 'BUTTON') {
        if (e.target.parentNode.nodeName == 'BUTTON') {
          card_target = e.target.parentNode;
          card_target.classList.add('purple');
        } else {
          card_target = e.target.parentNode.parentNode;
          card_target.classList.add('purple');
        }
      } else {
        card_target = e.target;
        card_target.classList.add('purple');
      }

      // ====================================================

      // 2. 누른 item count 증가
      if (menu_list[index].count < target_stock) {
        menu_list[index].count++;
      } else {
        alert(`최대 구매 가능 갯수는 ${target_stock}개 입니다.`);
      }

      // ====================================================

      // 3. 장바구니 추가
      if (card_target.classList.value.search('selected') < 0) {
        // 처음 누르는 경우 (.selected 없는 경우)

        // <button>에 .selected 추가
        card_target.classList.add('selected');
        // .obtained-element 생성
        create_obtainedElement(
          vending1_obtained,
          target_img,
          target_name,
          menu_list[index].count
        );
      } else {
        // 이미 눌러진 경우 (.selected 있는 경우)
        change_obtainedElementNumber(
          vending1_obtained,
          target_name,
          menu_list[index].count
        );
      }
    }
  });
}

// 획득 버튼 클릭되면
const btn_obtain = document.querySelector('.btn-obtain');

btn_obtain.addEventListener('click', () => {
  if (vending1_obtained.querySelectorAll('.obtained-element').length == 0) {
    // 장바구니에 아무것도 없는 경우
    alert('음료를 선택해 주세요.');
  } else {
    // 장바구니에 뭐가 있는 경우
    alert('음료를 획득하였습니다.');

    // 0. 획득 리스트 세팅
    vending1_obtained.querySelectorAll('.obtained-element').forEach((a, i) => {
      let newList = 1;
      myInfo.myDrinkList.forEach((list, i) => {
        if (a.childNodes[0].childNodes[1].innerText == list.name) {
          // 이미 획득된 음료인 경우
          newList = 0;
          list.count += parseInt(a.childNodes[1].innerText);
        }
      });
      // 새로 획득한 음료인 경우
      if (newList) {
        let temp = {};
        menu_list.forEach((list, i) => {
          if (a.childNodes[0].childNodes[1].innerText == list.name) {
            temp.name = list.name;
            temp.img = list.img;
            temp.count = list.count;
          }
        });
        myInfo.myDrinkList.push(temp);
      }

      // 1. vending1 세팅 (재고 관리)
      for (let i = 0; i < menu_list.length; i++) {
        // 메뉴들에 .purple, .selected 클래스 다 빼줌
        // 재고 -= 획득수량
        // 획득수량 = 0
        // if(재고 == 0) .soldout 추가
        // 장바구니 비우기
        document.querySelector(`.menu${i}`).classList.remove('purple');
        document.querySelector(`.menu${i}`).classList.remove('selected');

        if (a.childNodes[0].childNodes[1].innerText == menu_list[i].name) {
          menu_list[i].stock -= menu_list[i].count;
          menu_list[i].count = 0;
          if (menu_list[i].stock <= 0) {
            document.querySelector(`.menu${i}`).classList.add('soldout');
          }
        }
      }
      a.remove();
    });

    // 2. vending2 세팅 (획득수량 관리)
    vending2_obtained.querySelectorAll('.obtained-element').forEach((a, i) => {
      a.remove();
    });
    myInfo.myDrinkList.forEach((a, i) => {
      create_obtainedElement(vending2_obtained, a.img, a.name, a.count);
    });
  }
});

// obtianed-element 요소 생성
function create_obtainedElement(
  vending,
  target_img,
  target_name,
  target_count
) {
  // 1. <img> 생성
  let obtained_element_img = document.createElement('img');
  obtained_element_img.classList.add('obtained-element-img');
  obtained_element_img.setAttribute('src', target_img);
  obtained_element_img.setAttribute('alt', target_name);

  // 2. <span class='obtained_element_name'> 생성
  let obtained_element_name = document.createElement('span');
  obtained_element_name.classList.add('obtained-element-name');
  obtained_element_name.innerHTML = target_name;

  // 3. <span> 생성해서 1, 2 붙이기
  let span1 = document.createElement('span');
  span1.appendChild(obtained_element_img);
  span1.appendChild(obtained_element_name);

  // 4. <span class='obtained-element-count'> 생성
  let obtained_element_count = document.createElement('span');
  obtained_element_count.classList.add('obtained-element-count');
  obtained_element_count.innerText = target_count;

  // 5. <div class='obtained-element'> 생성해서 3, 4 붙이기
  let obtained_element = document.createElement('div');
  obtained_element.classList.add('obtained-element');
  obtained_element.appendChild(span1);
  obtained_element.appendChild(obtained_element_count);

  vending.appendChild(obtained_element);
}

// obtianed-element 요소에 숫자 변경
function change_obtainedElementNumber(vending, target_name, target_count) {
  vending.querySelectorAll('.obtained-element-name').forEach((a, i) => {
    if (a.innerText == target_name) {
      a.parentNode.nextSibling.innerHTML = target_count;
    }
  });
}
