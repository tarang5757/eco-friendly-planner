function carbonapi(){

  const car = document.getElementById('car').value;
  const dist = document.getElementById('dist').value;
  const units = document.getElementById('unit').value;

  if(dist<=0){
    document.getElementById('result').innerText = `Distance greater than 0 only`;
    return;
  }
  if(dist>10000){
    document.getElementById('result').innerText = `Distance can not be greater than 10000`;
    return;
  }
  const payload = "vehicle_type="+car+"&distance_value="+dist+"&distance_unit=km";

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
    'X-RapidAPI-Key': '46d156168amsh72a00a05a4cee3dp141475jsn55a7a823ff5c',
    'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
  };

  fetch('https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_type', {
    method: 'POST',
    headers,
    body: payload
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    return response.json();
  })
  .then(data => {
    if (units == "kg") {
      const co2e_kg = data.data.co2e_kg;
      document.getElementById('result').innerText = `CO2 Equivalent (kg): ${co2e_kg}kg`;
    } 

    else if (units == "g") {
      const co2e_gm = data.data.co2e_gm;
      document.getElementById('result').innerText = `CO2 Equivalent (g): ${co2e_gm}g`;
    } 

    else if (units == "mt") {
      const co2e_mt = data.data.co2e_mt;
      document.getElementById('result').innerText = `CO+ Equivalent (mt): ${co2e_mt}mt`;
    } 

    else if (units == "lb") {
      const co2e_lb = data.data.co2e_lb;
      document.getElementById('result').innerText = `CO2 Equivalent (lb): ${co2e_lb}lb`;
    } 
    
    else {
      document.getElementById('result').innerText = `Result: Failed to retrieve CO2 equivalent from the response. `;
    }
  })
  
  .catch(error => {
    console.error('Error:', error);
  });
}