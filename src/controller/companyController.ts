const companies = require('../services/companies');
const Airtable = require('airtable');
const config = require('../config/config');
const data = require('./dataController');

//Configure airtable
export const base = new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base(
  config.AIRTABLE_BASE_ID
);

export const table = base(config.AIRTABLE_TABLE_COMPANY);

const findCompany = async (url) => {
  let recordExists = false;
  const options = {
    filterByFormula: `(url = '${url}')`,
  };

  const companies = await data.getAirtableRecords(table, options);

  companies.filter((company) => {
    if (company.get('url') === url) {
      return (recordExists = true);
    }
    return (recordExists = false);
  });

  return recordExists;
};

export async function storeCompany() {
  for (const each of companies) {
    const companyExists = await findCompany(each.url);

    if (companyExists) {
      console.log(`Company: ${each.name}  already exists!`);
      return;
    }
    await base(config.AIRTABLE_TABLE_COMPANY).create(each, (err: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        `message: ${each.name} Company successfully added to the table`
      );
    });
  }
}
