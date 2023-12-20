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
let count = 1000000;
const elementRead = document.querySelector('.read');
const elementCarbon = document.querySelector('.carbon');
const elementCredit = document.querySelector('.credit');

function updateCounter1() {
    if (count > 1000500) {
        count = 1000000;
    }

    elementRead.textContent = count;
    const calculatedValue = (count / 10) * 0.0045;
    elementCarbon.textContent = calculatedValue.toFixed(3);
    
    const creditValue = calculatedValue * 5;
    elementCredit.textContent = creditValue.toFixed(3);
    
    count++;
}

// Call the updateCounter1 function every 500 milliseconds
setInterval(updateCounter1, 100);



// Demo 2 of AEC methodology
let count2 = 10; // Start with a different initial count
const elementRead2 = document.getElementById('read');
const elementCarbon2 = document.getElementById('carbon');
const elementCredit2 = document.getElementById('credit');

function updateCounter2() {
    if (count2 > 200) {
        count2 = 10; // Reset the count if it exceeds 200,000
    }

    elementRead2.textContent = count2;
    const calculatedValue = (count2 / 10) * 0.0045;
    elementCarbon2.textContent = calculatedValue.toFixed(3);

    const creditValue = calculatedValue * 5;
    elementCredit2.textContent = creditValue.toFixed(3);

    count2++;
}

// Call the updateCounter2 function every 500 milliseconds
setInterval(updateCounter2, 900);




document.addEventListener('DOMContentLoaded', function () {
  // Initialize line chart for Demo 2
  const ctxDemo2 = document.getElementById('demo2Chart').getContext('2d');
  const demo2Chart = new Chart(ctxDemo2, {
    type: 'line',
    data: {
      labels: [], // array to store distance covered labels
      datasets: [{
        label: 'Carbon Emission Avoided (Metric tonnes) vs Number of Vehicles',
        borderColor: 'rgb(0, 128, 0)',
        data: [], // array to store data for Demo 2
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Distance Covered (Km)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Carbon Emission Avoided (Metric tonnes)'
          },
          min: 0
        }
      }
    }
  });

  // Update line chart function for Demo 2
  function updateDemo2Chart() {
    // Update distance covered data for Demo 2
    const distanceCovered2 = count2;

    // Update carbon emission avoided data for Demo 2
    const calculatedValue2 = (count2 / 10) * 0.0045;
    const carbonEmissionAvoided2 = calculatedValue2.toFixed(3);

    // Update the chart data for Demo 2
    demo2Chart.data.labels.push(distanceCovered2);
    demo2Chart.data.datasets[0].data.push(carbonEmissionAvoided2);

    // Limit the number of data points displayed (optional)
    const maxDataPoints = 100;
    if (demo2Chart.data.labels.length > maxDataPoints) {
      demo2Chart.data.labels.shift();
      demo2Chart.data.datasets[0].data.shift();
    }

    // Update the chart for Demo 2
    demo2Chart.update();
  }

  // Call the updateDemo2Chart function every 500 milliseconds
  setInterval(updateDemo2Chart, 1000);
});


