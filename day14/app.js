const fs = require('fs');

function readCityNames() {
  try {
    const data = fs.readFileSync('input.txt', 'utf8');
    const datajson = JSON.parse(data);
    return datajson;
  } catch (error) {
    console.error('Error reading city names:', error.message);
    return [];
  }
}
function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

async  function main (){
const cityNames = readCityNames();
let citylat = selectRandomCity(cityNames).lat ;
let citylng = selectRandomCity(cityNames).lng;
let cityname= selectRandomCity(cityNames).name;
console.log('City name : ' + cityname);
  try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${citylat}&longitude=${citylng}&current_weather=true`);
      const data = await response.json();
      const temperature = data.current_weather.temperature;
      console.log('Temperature:', temperature,'°C');
      if (fs.existsSync(`${cityname}.txt`)){
        fs.unlink(`${cityname}.txt` , (err)=>{
          if(err){
            console.log('Error deleting' , err);
          }else {
            console.log('File removed successfully')
          }
        })
      }else {
         fs.writeFile(`${cityname}.txt`, `${temperature} °C `, (err) => {
        if (err) {
          console.error('Error creating file:', err);
        } else {
          console.log('File created successfully.');

        }
      });
      }   
    } catch (error) {
      console.error('Error fetching:', error);
      throw error;
    }
  }
main()
