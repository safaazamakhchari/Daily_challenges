const ExcelJS = require('exceljs');
const wb = new ExcelJS.Workbook();

let readline = require('readline')

const rl =readline.createInterface({
  output: process.stdout
})
rl.question( `Enter the name of excel file :`, (filename)=>{
  

wb.xlsx.readFile(filename)
  .then(() => {
    let worksheet = wb.getWorksheet(1);
    let newData = []; 

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const EmployeeID = worksheet.getCell(`A${i}`).value;
      const AnnualSalary = worksheet.getCell(`B${i}`).value;

      function calculate(annualSalary) {
        let BonusPercentage;
        let BonusAmount;
        if (annualSalary < 50000) {
          BonusPercentage = 5;
          BonusAmount = (annualSalary * BonusPercentage) / 100;
        } else if (annualSalary <= 100000) {
          BonusPercentage = 7;
          BonusAmount = (annualSalary * BonusPercentage) / 100;
        } else if (annualSalary > 100000) {
          BonusPercentage = 10;
          BonusAmount = (annualSalary * BonusPercentage) / 100;
        } else {
          return 'Invalid Salary';
        }
        return { amount: BonusAmount, percentage: BonusPercentage };
      }
      
  const bonus = calculate(AnnualSalary);
  console.log({
        Id: EmployeeID,
        Salary: AnnualSalary , 
        Bonus: bonus.amount,
        Percentage: bonus.percentage
      });

      newData.push({
        Id: EmployeeID,
        Salary: AnnualSalary,
        Bonus: bonus.amount,
        Percentage: bonus.percentage
      });
    }

    const newWorksheet = wb.addWorksheet('Employee Bonuses');
    newWorksheet.columns = [
      { header: 'Employee ID', key: 'Id' },
      { header: 'Annual Salary', key: 'Salary' },
      { header: 'Bonus', key: 'Bonus' },
      { header: 'Percentage', key: 'Percentage' }
    ];
    newWorksheet.addRows(newData);

    return wb.xlsx.writeFile('employee_bonus.xlsx');
  })
  .then(() => {
    console.log('New file created.');
  })
  .catch(error => {
    console.error('Error:', error);
  });
  rl.close();
})
