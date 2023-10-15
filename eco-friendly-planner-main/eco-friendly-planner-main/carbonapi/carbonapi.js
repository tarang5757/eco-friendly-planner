function carbonapi(){

  const car = document.getElementById('car').value;
  const dist = document.getElementById('dist').value;

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
    if (data && data.data && data.data.co2e_kg) {
      const co2e_kg = data.data.co2e_kg;
      document.getElementById('result').innerText = `CO2 Equivalent (kg): ${co2e_kg}kg`;
    } else {
      document.getElementById('result').innerText = `Result: Failed to retrieve CO2 equivalent (kg) from the response. `;
    }
  })
  
  .catch(error => {
    console.error('Error:', error);
  });
}