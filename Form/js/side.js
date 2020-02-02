// window = parent of browser
// console.log(window);


// Single element item
    // const form = document.getElementById('my-Form');
    // console.log(form);

// query selector takes only the first one
    // console.log(document.querySelector('.container'));


// Multiple element item
    // console.log(document.querySelectorAll('.item'));


// const ul = document.querySelector('.items');

    // ul.remove();
    // ul.lastElementChild.remove(); //removes last element
    // ul.firstElementChild.textContent = ('Hellooo');  // changes text content
    // ul.children[1].innerText = 'Brad';
    // ul.lastElementChild.innerHTML = '<h2>Hello World</h2>'; // innerhtml adds into html dynamically

    // const btn = document.querySelector('.btn');
    // btn.style.background = 'red';  // Can be done in CSS but in event it can be useful

// Events
    // const btn = document.querySelector('.btn');
// different event like 'click', 'out', 'hover'
    // btn.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     // console.log(e.target);
    //     document.querySelector('#my-form').style.background = '#ccc';
    //     document.querySelector('body').classList.add('bg-dark');
    //     document.querySelector('.items').lastElementChild.innerHTML = '<h1>Hello</h1>';
    // });



    const myForm = document.querySelector('#my-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const msg = document.querySelector('.msg');
    const userList = document.querySelector('#users');

    myForm.addEventListener('submit', onsubmit);

    function onsubmit(e){
        e.preventDefault();
        
        if(nameInput.value === '' || emailInput.value === ''){
            msg.classList.add('error');
            msg.innerHTML = 'Please enter all fields';

            setTimeout(() => msg.remove(), 3000);
        } else {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
            userList.appendChild(li);

            // Clear the fields
            nameInput.value = '';
            emailInput.value = '';
            // they are not stored but fetch 
        }
    }