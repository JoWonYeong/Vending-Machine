// let inputMoney = prompt('소지금을 입력해주세요.');
let inputMoney = 25000;
let myInfo = {
  myMoney: inputMoney,
  myDrinkList: [],
};

// console.log(myInfo.inputMoney);
document.querySelector('.show-money-having').innerHTML = inputMoney;

const menu = document.querySelector('.menu');

const menu_list = [
  {
    name: 'Original_Cola',
    img: './img/menu/cola-0.svg',
    price: '1000',
    stock: 5,
    count: 0,
  },
  {
    name: 'Cool_Cola',
    img: './img/menu/cola-1.svg',
    price: '1000',
    stock: 5,
    count: 0,
  },
  {
    name: 'Violet_Cola',
    img: './img/menu/cola-2.svg',
    price: '1500',
    stock: 5,
    count: 0,
  },
  {
    name: 'Green_Cola',
    img: './img/menu/cola-3.svg',
    price: '2000',
    stock: 3,
    count: 0,
  },
  {
    name: 'Yellow_Cola',
    img: './img/menu/cola-4.svg',
    price: '2000',
    stock: 3,
    count: 0,
  },
  {
    name: 'Orange_Cola',
    img: './img/menu/cola-5.svg',
    price: '1000',
    stock: 3,
    count: 0,
  },
];

menu_list.forEach((a, i) => {
  // 1. <img> 생성
  let menu_img = document.createElement('img');
  menu_img.setAttribute('src', a.img);
  menu_img.setAttribute('alt', a.name);

  // 2. <span> 생성
  let menu_name = document.createElement('span');
  menu_name.innerHTML = a.name;

  // 3. <span class='price'> 생성
  let menu_price = document.createElement('span');
  menu_price.classList.add('price');
  menu_price.innerHTML = a.price;

  // 4. '원' 텍스트 노드 생성
  let text_won = document.createTextNode('원');

  // 5. <span> 생성 3, 4번 붙이기
  let menu_price_wrapper = document.createElement('span');
  menu_price_wrapper.appendChild(menu_price);
  menu_price_wrapper.appendChild(text_won);

  // 6. <button class='card menu+i'> 생성
  let card = document.createElement('button');
  card.classList.add('card');
  card.classList.add('menu' + i);

  // 재고가 0 이하인 경우 .soldout
  if (a.stock <= 0) {
    card.classList.add('soldout');
  }

  // 7. 6에 1, 2, 5 붙이기
  card.appendChild(menu_img);
  card.appendChild(menu_name);
  card.appendChild(menu_price_wrapper);

  // <div class='menu'>에 <button class='card'> 붙이기
  menu.appendChild(card);
});
