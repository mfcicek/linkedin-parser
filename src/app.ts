import { LinkedInParser } from './linkedin_parser/linkedin_parser';
const config = require('./config/config');
const { chunk } = require('./utils/helper');
const { storeCompany } = require('./controller/companyController.ts');
const { storeEmployee } = require('./controller/employeeController.ts');
const companies = require('./services/companies');

(async () => {
  storeCompany()
    .then()
    .catch((err) => {
      console.log(err);
    });

  const linkedInParser = new LinkedInParser({
    sessionCookieValue: config.LINKEDIN_SESSION_COOKIE_VALUE,
    keepAlive: false,
  });

  await linkedInParser.setup();
  let companyEmployees;
  for (const company of companies) {
    await linkedInParser
      .run(company)
      .then((data) => {
        companyEmployees = data;
      })
      .catch((err) => {
        console.log(err);
      });

    await storeEmployee(companyEmployees)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }
  await linkedInParser
    .close()
    .then()
    .catch((err) => {
      console.log(err);
    });
})();
