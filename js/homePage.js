//UC-12 
let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    // UC-13
    addressBookList = getAddressBookDataFromStorage();
    document.querySelector(".person-count").textContent = addressBookList.length;
    createInnerHTML();
    localStorage.removeItem('editPerson');
});

const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip-Code</th><th>Phone Number</th><th>Actions</th>";
    // UC-13
    if(addressBookList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const addressBookData of addressBookList) {
        innerHtml = `${innerHtml}
        <tr>
            <td></td>
            <td>${addressBookData._fullname}</td>
            <td>${addressBookData._address}</td>
            <td>${addressBookData._city}</td>
            <td>${addressBookData._state}</td>
            <td>${addressBookData._zip}</td>
            <td>${addressBookData._phone}</td>
            <td>
            <img id="${addressBookData._id}" onclick="remove(this)" src="../Assets/delete-black-18dp.svg" alt="delete">
            <img id="${addressBookData._id}" onclick="update(this)" src="../Assets/create-black-18dp.svg" alt="edit">
            </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

//UC-13
const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

// remove person details from addressbook list
const remove = (node)=> {
    let addressBookData = addressBookList.find(personData=>personData._id == node.id);
    if (!addressBookData) return;
    const index =  addressBookList
                  .map(personData=>personData._id)
                  .indexOf(addressBookData._id);
    addressBookList.splice(index,1);
    localStorage.setItem("AddressBookList",JSON.stringify(addressBookList));
    document.querySelector('.person-count').textContent = addressBookList.length;
    createInnerHTML();
}

//update person details 
const update = (node) => {
    let addressBookData = addressBookList.find(personData=>personData._id == node.id);
    if (!addressBookData) return;
    localStorage.setItem('editPerson',JSON.stringify(addressBookData));
    window.location.replace(site_properties.add_person_page);    
}