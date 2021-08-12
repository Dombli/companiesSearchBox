const regex = /\+\d{1,4}(\-\d{3}){3}$/gs;
const verify = document.getElementById("verify");
const input = document.getElementById("companySearch");
const table = document.getElementById("table");
input.addEventListener("keyup", () => {
  tableFilter(input.value);
});
verify.addEventListener("click", verifyNumber)
let companies = [];
let customers = [];
let customersCompanies = [];

loadData(); // Data load and table visibility

async function loadData() {
  await fetchData();
  consolidateData();
  appendTable(companies);
}

// Client list consolidation
function consolidateData() {
  customersCompanies = customers.map((customer) => {
    return {
      name: customer.name,
      surname: customer.surname,
      email: customer.email,
      companyCode: customer.companyCode,
      company: companies.find(
        (company) => company.code === customer.companyCode
      ),
    };
  });
}

async function fetchData() {
  companies = await getData("./companies.JSON");
  customers = await getData("./customers.JSON");
  alert("Data ready to use");
  console.log(customers);
  console.log(companies);
}

// Loading data from JSON
async function getData(dataPath) {
  const res = await fetch(dataPath);
  const data = res.json();
  return data;
}

// Table
function appendTable(companies) {
  table.innerHTML = `<tr><th>Company name</th></tr>`;
  for (const company of companies) {
    table.innerHTML += `<tr><td>${company.name}</td></tr>`;
  }
}
// const tableFilter = (filter) => {}
function tableFilter(filter) {
  let filteredCompanies = companies.filter((company) =>
    company.name.includes(filter)
  );
  appendTable(filteredCompanies);
}

function downloadCustomers() {
  console.log(customersCompanies);
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(customersCompanies)], {
    type: "text/json",
  });
  a.href = URL.createObjectURL(file);
  a.download = "customersCompanies.json";
  a.click();
}

function verifyNumber() {
  const phoneNumberInput = document.getElementById("phoneNumber");
  const phoneNumber = phoneNumberInput.value; 
  const phoneNumberRegex = phoneNumber.match(regex);
  console.log(phoneNumberRegex); 
  if (phoneNumberRegex) { 
    phoneNumberInput.className = "correct";
    alert("Number correct!");
    // phoneNumberInput.innerHTML += <div><p style={color: green;}>Validation correct</p></div>;
  } else {
    phoneNumberInput.className = "incorrect";
    alert("Number incorrect!");
  }
}