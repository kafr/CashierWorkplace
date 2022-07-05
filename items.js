function clock() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("clock").innerHTML = "РМК, Користувач: Admin,  " + hours + ":" + minutes + ":" + seconds;
    setTimeout("clock()", 1000);
}

clock();
updateSum();
addItems();

function updateSum(attribute = "sum") {
    let sum = 0;
    var All = document.getElementsByClassName("tr_table_selected_items");
    for (var i = 0; i < All.length; i++) {
        sum = Number(sum) + Number(All[i].getAttribute(attribute));
    }
    document.getElementById('totalSum').innerText = '  ' + sum + " грн";
}

function FindByAttributeValue(attribute, value, element_type) {
    element_type = element_type || "*";
    var All = document.getElementsByTagName(element_type);
    for (var i = 0; i < All.length; i++) {
        if (All[i].getAttribute(attribute) == value) { return All[i]; }
    }
}

function addItemtoSelectedItemsTable(event) {
    console.log(event.target.id)
    let itemId = event.target.attributes["id"].value;
    let sel = FindByAttributeValue("itemcode", itemId, "tr");
    if (sel !== undefined) {
        updateQuantity(sel);
        return;
    }
    let newP = document.createElement("tr");

    newP.id = "tr_table_selected_items";
    newP.className = newP.id;
    newP.setAttribute("ItemCode", event.target.attributes["id"].value);
    newP.setAttribute("quantity", 1);
    newP.setAttribute("price", Number(event.target.attributes["price"].value));
    newP.setAttribute("sum", Number(event.target.attributes["price"].value));
    let numberOfEl = document.getElementsByClassName(newP.id).length + 1;

    newP.innerHTML = ` 
        <td id = "td_number_table_selected_items" number =>${numberOfEl}</td>
        <tr id = "tr_table_selected_items"> 
        <td id = "td_item_table_selected_items"><button class="btn_del_item" operName="del"> </button>`+ event.target.innerText + `</td>
        <td id = "td_q_table_selected_items">
        <button class = "btn_quantity" operName="minus">-</button>
         1
        <button class = "btn_quantity" operName="plus">+</button>
        </td>
        <td id = "td_price_table_selected_items">`+ event.target.attributes["price"].value + `</td> 
        <td id = "td_sum_table_selected_items">`+ event.target.attributes["price"].value + `</td>
    </tr>`;
    const div_example = document.getElementById("table_selected_items");

    div_example.appendChild(newP)
    updateSum();
}

function updateQuantity(sel) {
    let price = sel.attributes["price"].value;
    let quantity = sel.attributes["quantity"].value;
    quantity++
    let sum = Number(quantity) * Number(price);
    sel.attributes["quantity"].value = quantity;
    sel.attributes["sum"].value = sum;
    sel.children[4].innerText = sum;
    sel.children[2].innerHTML = `
    <button class = "btn_quantity">-</button>
         `+ quantity + `
        <button class = "btn_quantity">+</button>
    `
    updateSum();
}

document.addEventListener('click', function (event) {
    let s = event.target.id
    s = s.substring(0, 2);
    if (s == "p_") {
        addItemtoSelectedItemsTable(event);
    }
    if (event.target.className == "btn_quantity") {
        addQuantityByItem(event.target);
    }
    if (event.target.className == "btn_del_item") {
        DelItem(event.target);
    }

});

function searchByInput() {
    let inputValue = document.getElementById("searchTerm").value.toUpperCase();
    let findEl = document.getElementsByClassName("item_inListRight");
    for (var i = 0; i < findEl.length; ++i) {
        let el = findEl[i];
        let valItem = el.attributes.getNamedItem("title").textContent.toUpperCase();

        if (inputValue == "") {
            el.classList.remove('hide_list_items'); 
            continue;
        }
        else if (valItem.includes(inputValue)) {
            el.classList.remove('hide_list_items');
        }
        else {
            el.classList.add('hide_list_items');
        }
    }
}

function Clear() {
    let elements = document.getElementsByClassName("tr_table_selected_items");
    console.dir(elements);
    for (var i = 0; i < elements.length; ++i) {
        elements[i].remove();
    }

    for (var i = 0; i < elements.length; ++i) {
        elements[i].remove();
    }

    for (var i = 0; i < elements.length; ++i) {
        elements[i].remove();
    }

    for (var i = 0; i < elements.length; ++i) {
        elements[i].remove();
    }
    updateSum();
}

function DelItem(tar) {
    console.dir(tar);
    console.dir(tar.parentElement); //td
    console.dir(tar.parentElement.parentElement); //tr
    tar.parentElement.parentElement.remove();
    updateSum();
}

function addQuantityByItem(tar) {
    console.dir(tar);
    console.dir(tar.parentElement); //th
    console.dir(tar.parentElement.parentElement); //tr
    let price = tar.parentElement.parentElement.attributes["price"].value;
    let quantity = tar.parentElement.parentElement.attributes["quantity"].value;
    if (tar.outerText == "-") {
        quantity--;
    } else { quantity++; }
    if (quantity == 0) {
        tar.parentElement.parentElement.remove();
        return
    } let sum = Number(quantity) * Number(price);
    tar.parentElement.parentElement.children[4].innerText = sum;

    tar.parentElement.parentElement.attributes["quantity"].value = quantity;
    tar.parentElement.parentElement.attributes["sum"].value = sum;
    tar.parentElement.innerHTML = `
    <button class = "btn_quantity">-</button>
         `+ quantity + `
        <button class = "btn_quantity">+</button>
    `

    console.log("Change price, quantity, total of el:  ", tar, quantity, price);
    updateSum();
}

async function addItems() {
    let url = "http://localhost/1/hs/items";
    url = "https://jsonplaceholder.typicode.com/users";
    url = 'https://dummyjson.com/products';

    let response = await fetch(url);
    let json = await response.json();
    let items = json["products"];

    console.log(items);
    
    let oldList = document.querySelectorAll('.item_inListRight'); // обращаю внимание на точку
    oldList.forEach( e => e.remove() );

    for (let a = 0; a < items.length; a++) {

        let newP = document.createElement("p");
        newP.innerHTML = items[a].title;
        newP.id = "p_" + items[a].title;
        newP.className = "item_inListRight";
        newP.setAttribute("description", items[a].description);
        newP.setAttribute("price", items[a].price);
        newP.setAttribute("title", items[a].title);
        const div_example = document.getElementById("div_example");
        div_example.appendChild(newP);

        if (a<10) {
            let newP = document.createElement("p");
        newP.innerHTML = items[a].title;
        newP.id = "p_" + items[a].title;
        newP.className = "item_inListRight";
        newP.setAttribute("description", items[a].description);
        newP.setAttribute("price", items[a].price);
        newP.setAttribute("title", items[a].title);
            newP.innerHTML = ''+'<img class="img_hotitems"  src="'+items[a].images[0]+'" alt=""></img>';
            div_hotitems  =  document.getElementById("hotitems");
            div_hotitems.appendChild(newP);
        }
    }
    updateSum();
}

