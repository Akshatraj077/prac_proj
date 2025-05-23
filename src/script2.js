document.addEventListener('DOMContentLoaded', () => {
    const nameinput = document.getElementById('name-input');
    const priceinput = document.getElementById('price-input');
    const inputbtn = document.getElementById('input-btn');
    const cart = document.getElementById('cart');
    const cart1 = document.getElementById('cart1')
    const totpricemsg = document.getElementById('tot-price-msg');
    const chkbtn = document.getElementById('chk-btn');
    const mtycartmsg = document.getElementById('mty-cart-msg');
    const errmsg = document.getElementById('ermsg')


    let totprice = 0;

    let items = JSON.parse(localStorage.getItem('item')) || [];
    if (items.length > 0) {
        cart.classList.remove('hidden');
        cart1.classList.remove('hidden');
        removemtymsg();
    } else {
        showmtymsg();
    }
    items.forEach(item => renderitem(item));

    inputbtn.addEventListener('click', () => {
        let namein = nameinput.value.trim();
        let pricein = priceinput.value.trim();
        if (namein === "" || pricein === "" || isNaN(pricein)){
            errmsg.classList.remove('hidden')
            return;
        } 

        errmsg.classList.add('hidden')
        removemtymsg();
        cart.classList.remove('hidden');
        cart1.classList.remove('hidden');
        const newitem = {
            id: Date.now(),
            name: namein,
            price: parseFloat(pricein).toFixed(2)
        };
        items.push(newitem);
        saveitems();
        renderitem(newitem);
        nameinput.value = "";
        priceinput.value = "";
    });

    chkbtn.addEventListener('click', () => {
        items.length = 0; // Clear the array
        saveitems();
        cart.innerHTML = ''; // Clear the cart
        cart1.innerHTML = '';
        showmtymsg();
        cart.classList.add('hidden');
        cart1.classList.add('hidden');
        alert('Checkout successfull!!')
    });

    function renderitem(newitem) {
        const newli = document.createElement('li');
        newli.classList.add('bg-gray-700', 'px-1', 'py-2', 'mb-2', 'text-white', 'rounded-md', 'flex', 'justify-between', 'items-center');
        newli.id = `details-${newitem.id}`;
        newli.innerHTML = `<span class="font-semibold">${newitem.name} :-  ${newitem.price}</span>
                <button id="rmv-btn-${newitem.id}" class="bg-blue-700 px-1 py-2 rounded-md hover:bg-blue-800">Remove</button>`;
        cart1.appendChild(newli);

        addtot(newitem);

        const delitem = newli.querySelector('button');
        delitem.addEventListener('click', () => {
            items = items.filter(i => i.id !== newitem.id);
            saveitems();
            subtot(newitem);
            newli.remove();

            if (items.length === 0) {
                cart.classList.add('hidden');
                cart1.classList.add('hidden');
                showmtymsg();
            }
        });
    }

    function addtot(newitem) {
        totprice += parseFloat(newitem.price);
        totpricemsg.innerText = `TOTAL :- ${totprice.toFixed(2)}`;
    }

    function subtot(newitem) {
        totprice -= parseFloat(newitem.price);
        totpricemsg.innerText = `TOTAL :- ${totprice.toFixed(2)}`;
    }

    function removemtymsg() {
        mtycartmsg.classList.add('hidden');
    }

    function showmtymsg() {
        mtycartmsg.classList.remove('hidden');
    }

    function saveitems() {
        localStorage.setItem('item', JSON.stringify(items));
    }
});
