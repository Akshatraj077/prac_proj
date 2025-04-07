document.addEventListener('DOMContentLoaded', () => {
    const nameinput = document.getElementById('name-input')
    const priceinput = document.getElementById('price-input')
    const inputbtn = document.getElementById('input-btn')
    const cart = document.getElementById('cart')
    const totpricemsg = document.getElementById('tot-price-msg')
    const chkbtn = document.getElementById('chk-btn')
    const mtycartmsg = document.getElementById('mty-cart-msg')

    let totprice = 0

    let items = JSON.parse(localStorage.getItem('item')) || []
    if(items.length > 0){
        cart.classList.remove('hidden')
        removemtymsg()
    }
    else{
        showmtymsg()
    }
    items.forEach(item => renderitem(item));


    inputbtn.addEventListener('click', () => {
        const namein = nameinput.value.trim()
        const pricein = priceinput.value.trim()
        if(namein === "" || pricein === "" || isNaN(pricein)) return
        
        removemtymsg()
        cart.classList.remove('hidden')
        const newitem = {
            id: Date.now(),
            name: namein,
            price: parseFloat(pricein).toFixed(2)
        }
        items.push(newitem)
        saveitems()
        renderitem(newitem)
        nameinput.value = ""
        priceinput.value = ""
    })

    chkbtn.addEventListener('click', () => {
        items.forEach(item => {
            item.remove()
        });
        saveitems()
        showmtymsg()
        cart.classList.add('hidden')
    })

    function renderitem(newitem) {
        const newli = document.createElement('li')
        newli.classList.add('bg-gray-700', 'px-1', 'py-2', 'mb-2', 'text-white', 'rounded-md', 'flex', 'justify-between', 'items-center');
        newli.id = `details-${newitem.id}`
        newli.innerHTML = `<span class="font-semibold">${newitem.name} :-  ${newitem.price}</span>
                <button id="rmv-btn-${newitem.id}" class="bg-blue-700 px-1 py-2 rounded-md hover:bg-blue-800">Remove</button>`
        cart.appendChild(newli)

        addtot(newitem)

        const delitem = newli.querySelector('button')
        delitem.addEventListener('click' , () => {
            items = items.filter(i => i.id !== newitem.id);
            saveitems()
            subtot(newli)
            newli.remove()
        })
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
        mtycartmsg.classList.add('hidden')
    }

    function showmtymsg() {
        mtycartmsg.classList.remove('hidden')
    }

    function saveitems() {
        localStorage.setItem('item', JSON.stringify(items))
    }
})