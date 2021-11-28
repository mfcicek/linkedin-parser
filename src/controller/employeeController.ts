import Airtable from 'airtable';
const config = require('../config/config');
const { chunk } = require('../utils/helper');

//Configure airtable
export const base = new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base(
  config.AIRTABLE_BASE_ID
);

//Define and create a company array object
export const employeeArray: {
  fields: {
    name: string;
    title: string;
    location: string;
    profile_url: string;
    company_name: string;
    company_url: string;
  };
}[] = [];

async function storeEmployee(employees: any) {
  for (const person of employees) {
    employeeArray.push({
      fields: {
        name: person.name,
        title: person.title,
        location: person.location,
        profile_url: person.profile_url,
        company_name: person.company_name,
        company_url: person.company_url,
      },
    });
  }

  const splitEmployeeArray = chunk(employeeArray, 10);
  for (const recordGroup of splitEmployeeArray) {
    base(config.AIRTABLE_TABLE_EMPLOYEE).create(
      recordGroup,
      function (err: any) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }
}

module.exports = { base, storeEmployee };
