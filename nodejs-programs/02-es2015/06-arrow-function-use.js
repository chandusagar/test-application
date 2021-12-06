// The following snippet tries to set new salaries for employees. However it does not work as
// intended. Why? Debug the code by setting breakpoints and stepping through function calls.
// Correct it using an appropriate arrow function definition.

const payroll = {
  employees: [
    { name: "John", dept: "IT", salary: 1000 },
    { name: "Maria", dept: "Finance", salary: 2000 },
    { name: "David", dept: "Finance", salary: 3000 },
  ],
  hikePercentage: {
    IT: 10,
    Finance: 20,
  },
  raise: function () {
    //   const that = this;
    this.employees.forEach((employee) => { // the function now gets "this" from raise function
        const dept = employee.dept;
        const salary = employee.salary;
        // using alternative syntax to access key's value - obj[key] where key is a string
        //   const hikePercentage = that.hikePercentage[dept];
        const hikePercentage = this.hikePercentage[dept];

        employee.salary = ((100 + hikePercentage) / 100) * salary;
    });
  },
};

payroll.raise();
console.log(payroll.employees);