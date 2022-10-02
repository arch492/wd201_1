const dob = document.getElementById("dob");
dob.addEventListener("change", () => validateDOB(dob));
function validateDOB(dob){
let Date1=dob.value.split("-");
let year=Date1[0];
let month=Date1[1];
let date=Date1[2];
let birthdate = new Date(year, month, date);
let today = new Date();
let currentYear= today.getFullYear();
let birthYear=birthdate.getFullYear()
let age = currentYear - birthYear;
let monthDiff = today.getMonth() - birthdate.getMonth();
if ((today.getDate() < birthdate.getDate())||monthDiff<0) 
{
age--;
}
if (age<18 || age>55) 
{
dob.setCustomValidity("Your age is not between 18 and 55");
dob.reportValidity();
}
else
{
dob.setCustomValidity("");
}
}

const email = document.getElementById('email');
    email.addEventListener('input', () => validate(email));


    function validate(element){
        if(element.validity.typeMismatch) {
            element.setCustomValidity("The email is in incorrect format.");
            element.reportValidity();
        } else {
            element.setCustomValidity('');
        }
    }


let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries){
        entries = JSON.parse(entries);
    } else{
        entries = [];
    }
    return entries;
}



let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;

        return row;


}).join("\n");

const table = `<table cellspacing="50 px" cellpadding="50 px" border="2" align="center"><tr>

<th class="px-4 py-2">Name</th>
<th class="px-4 py-2">Email</th>
<th class="px-4 py-2">Password</th>
<th class="px-4 py-2">dob</th>
<th class="px-4 py-2">accepted terms?</th>
</tr>${tableEntries} </table>`;

let details = document.getElementById("user-entries");
details.innerHTML=table;

}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener("submit", saveUserForm);
displayEntries()