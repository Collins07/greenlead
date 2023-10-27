// sidenav for dashboard.

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");


sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
  sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
}else
  sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}




// Demo 1 of AEC methodology
let count = 4000;
const elementRead = document.querySelector('.read');
const elementCarbon = document.querySelector('.carbon');
const elementCredit = document.querySelector('.credit');

function updateCounter1() {
    if (count > 5000) {
        count = 4000;
    }

    elementRead.textContent = count;
    const calculatedValue = (count / 10) * 0.0023;
    elementCarbon.textContent = calculatedValue.toFixed(3);
    
    const creditValue = calculatedValue * 5;
    elementCredit.textContent = creditValue.toFixed(4);
    
    count++;
}

// Call the updateCounter1 function every 500 milliseconds
setInterval(updateCounter1, 500);




// Demo 2 of AEC methodology
let count1 = 2000;
const elementRead1 = document.querySelector('#read');
const elementCarbon1 = document.querySelector('#carbon');
const elementCredit1 = document.querySelector('#credit');

function updateCounter2() {
    if (count1 > 3500) {
        count1 = 2000;
    }

    elementRead1.textContent = count1;
    const calculatedValue1 = (count1 / 10) * 0.0023;
    elementCarbon1.textContent = calculatedValue1.toFixed(3);
    
    const creditValue1 = calculatedValue1 * 5;
    elementCredit1.textContent = creditValue1.toFixed(4);
    
    count1++;
}

// Call the updateCounter2 function every 500 milliseconds
setInterval(updateCounter2, 100);