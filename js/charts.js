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






document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('.section');
  const progressBar = document.getElementById('progress-bar');
  const reportBtn = document.getElementById('report-btn');
  const reportForm = document.getElementById('report-form');
  let currentSectionIndex = 0;


    
  reportBtn.addEventListener('click', function() {
    reportForm.style.display = 'block';
    currentSectionIndex = 0; // Set current section index to 0 when report button is clicked
    showSection(currentSectionIndex);
    updateProgressBar();
});

  function showSection(index) {
    sections.forEach((section, idx) => {
      if (idx === index) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }

  function updateProgressBar() {
    const progress = ((currentSectionIndex + 1) / sections.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Function to go to the next section
  function goToNextSection() {
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      showSection(currentSectionIndex);
      updateProgressBar();
    }
  }

  // Function to go to the previous section
  function goToPrevSection() {
    if (currentSectionIndex > 0) {
      currentSectionIndex--;
      showSection(currentSectionIndex);
      updateProgressBar();
    }
  }

  // Select the next and previous buttons and add event listeners to them
  const nextButtons = document.querySelectorAll('.next-btn');
  nextButtons.forEach(btn => {
    btn.addEventListener('click', goToNextSection);
  });

  const prevButtons = document.querySelectorAll('.prev-btn');
  prevButtons.forEach(btn => {
    btn.addEventListener('click', goToPrevSection);
  });

  const submitButton = document.getElementById('submit-btn');
  submitButton.addEventListener('click', function() {
    // Collect form data
    const formData = {
      date: document.getElementById('date').value,
      industry: document.getElementById('industry').value,
      company: document.getElementById('company').value,
      totalVehicles: document.getElementById('total-vehicles').value,
      fossilCars: document.getElementById('fossil-cars').value,
      electricVehicles: document.getElementById('electric-vehicles').value,
      energySource1: document.getElementById('energy-source1').value,
      energyConsumption1: document.getElementById('energy-consumption1').value,
      energySource2: document.getElementById('energy-source2').value,
      energyConsumption2: document.getElementById('energy-consumption2').value,
      waterSource1: document.getElementById('water-source1').value,
      waterConsumption1: document.getElementById('water-consumption1').value,
      waterSource2: document.getElementById('water-source2').value,
      waterConsumption2: document.getElementById('water-consumption2').value,
      wasteType1: document.getElementById('waste-type1').value,
      wasteAmount1: document.getElementById('waste-amount1').value,
      wasteType2: document.getElementById('waste-type2').value,
      wasteAmount2: document.getElementById('waste-amount2').value,
      landUse: document.getElementById('land-use').value,
      compliance: document.getElementById('compliance').value,
      complianceDescription: document.getElementById('non-compliance-description').value
    };

    // Process form data
    processData(formData);

    // Visualize data using Chart.js
    visualizeData(formData);

    // Hide the form
    reportForm.style.display = 'none';
  });


  function processData(formData) {
    const energyData = {
      renewable: 0,
      nonRenewable: 0
    };
  
    // Process each form field
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = parseInt(formData[key]);
        if (key.includes('renewable')) {
          energyData.renewable += value;
        } else if (key.includes('non-renewable')) {
          energyData.nonRenewable += value;
        }
      }
    }
  
    // Update formData with summed values
    Object.assign(formData, energyData);
  }
  
  
  



  function visualizeData(data) {
    
    // Create a bar chart for vehicles
    const ctxBar = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Total Vehicles', 'Fossil-fuel Cars', 'Electric Vehicles'],
        datasets: [{
          label: 'Number of Vehicles',
          data: [data.totalVehicles, data.fossilCars, data.electricVehicles],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

// Get the names of the selected sources
const source1 = document.getElementById('energy-source1').value;
const source2 = document.getElementById('energy-source2').value;

// Parse energy consumption values as integers
const energyConsumption1 = parseInt(data.energyConsumption1);
const energyConsumption2 = parseInt(data.energyConsumption2);
const energyConsumptionNonRenewable1 = parseInt(data.energyConsumptionNonRenewable1);
const energyConsumptionNonRenewable2 = parseInt(data.energyConsumptionNonRenewable2);

// Initialize totals for renewable and non-renewable energy
let renewableEnergyTotal = 0;
let nonRenewableEnergyTotal = 0;

// Add energy consumption based on selected sources
if (source1 === "renewable") {
  renewableEnergyTotal += energyConsumption1;
} else if (source1 === "non-renewable" && !isNaN(energyConsumption1)) {
  nonRenewableEnergyTotal += energyConsumption1;
}

if (source2 === "renewable") {
  renewableEnergyTotal += energyConsumption2;
} else if (source2 === "non-renewable" && !isNaN(energyConsumption2)) {
  nonRenewableEnergyTotal += energyConsumption2;
}

// If both sources are non-renewable, add their consumption values
if (source1 === "non-renewable" && source2 === "non-renewable") {
  if (!isNaN(energyConsumptionNonRenewable1)) {
    nonRenewableEnergyTotal += energyConsumptionNonRenewable1;
  }
  if (!isNaN(energyConsumptionNonRenewable2)) {
    nonRenewableEnergyTotal += energyConsumptionNonRenewable2;
  }
} else if (source1 === "non-renewable" || source2 === "non-renewable") {
  // If only one source is non-renewable, add its consumption values
  if (source1 === "non-renewable" && !isNaN(energyConsumptionNonRenewable1)) {
    nonRenewableEnergyTotal += energyConsumptionNonRenewable1;
  }
  if (source2 === "non-renewable" && !isNaN(energyConsumptionNonRenewable2)) {
    nonRenewableEnergyTotal += energyConsumptionNonRenewable2;
  }
}

// Log the values for debugging
console.log('energyConsumptionNonRenewable1:', energyConsumptionNonRenewable1);
console.log('energyConsumptionNonRenewable2:', energyConsumptionNonRenewable2);
console.log('nonRenewableEnergyTotal:', nonRenewableEnergyTotal);


// Create a pie chart for source of energy
const ctxPie = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctxPie, {
  type: 'pie',
  data: {
    labels: ['Renewable Energy', 'Non-Renewable Energy'],
    datasets: [{
      label: 'Energy Consumption',
      data: [renewableEnergyTotal, nonRenewableEnergyTotal],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    // Remove yAxes configuration
  }
});




    // Get the names of the selected water sources
    const waterSource1 = document.getElementById('water-source1').value;
    const waterSource2 = document.getElementById('water-source2').value;

    // Create a bar chart for source of water
    const ctxBarWater = document.getElementById('barChartWater').getContext('2d');
    const barChartWater = new Chart(ctxBarWater, {
      type: 'bar',
      data: {
        labels: [waterSource1, waterSource2], // Use the names of the selected water sources as labels
        datasets: [{
          label: 'Water Consumption (cubic metres)',
          data: [data.waterConsumption1, data.waterConsumption2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // Display non-graphical data as paragraphs above the charts
    const nonGraphicalDataContainer = document.getElementById('non-graphical-data');
    nonGraphicalDataContainer.innerHTML = `
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Industry Category:</strong> ${data.industry}</p>
      <p><strong>Company Name:</strong> ${data.company}</p>
      <p><strong>Land Use (hectares):</strong> ${data.landUse}</p>
      <p><strong>Environmental Compliance:</strong> ${data.compliance}</p>
      <p><strong>Non-Compliance Description:</strong> ${data.complianceDescription}</p>
      <!-- Add other non-graphical data here... -->
    `;
  }

  showSection(currentSectionIndex);
});

  