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

document.addEventListener('click', function (event) {
    let s = event.target.id
    s = s.substring(0, 2);
    if (s == "p_") {
        console.log(event.target.id)

        let newP = document.createElement("tr");

        newP.innerHTML = ` 
        <td id = "td_number_table_selected_items" number =>1</td>
        <tr id = "tr_table_selected_items"> 
        <td id = "td_item_table_selected_items"><button class="btn_del_item" operName="del"> </button>`+event.target.innerText+`</td>
        <td id = "td_q_table_selected_items">
        <button class = "btn_quantity" operName="minus">-</button>
         1
        <button class = "btn_quantity" operName="plus">+</button>
        </td>
        <td id = "td_price_table_selected_items">`+event.target.attributes["price"].value+`</td> 
        <td id = "td_sum_table_selected_items">`+event.target.attributes["price"].value+`</td>
    </tr>`;
        newP.id = "tr_table_selected_items";
        newP.className = newP.id;
        newP.setAttribute("ItemCode", event.target.attributes["id"].value);
        newP.setAttribute("quantity", 1);
        newP.setAttribute("price", Number(event.target.attributes["price"].value));
        const div_example = document.getElementById("table_selected_items");

        div_example.appendChild(newP)
    }
    if (event.target.className == "btn_quantity") {
        addQuantityByItem(event.target);
    }
    if (event.target.className == "btn_del_item") {
        DelItem(event.target);
    }

});

function MyF() {
    addItems()
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
}

function DelItem(tar) {
    console.dir(tar);
    console.dir(tar.parentElement); //td
    console.dir(tar.parentElement.parentElement); //tr
    tar.parentElement.parentElement.remove();
}

function addQuantityByItem(tar){
    console.dir(tar);
    console.dir(tar.parentElement); //th
    console.dir(tar.parentElement.parentElement); //tr
    let price = tar.parentElement.parentElement.attributes["price"].value;
    let quantity = tar.parentElement.parentElement.attributes["quantity"].value;
    if (tar.outerText == "-") {
        quantity--;
    } else {quantity++; }
    if (quantity == 0 ) {
    tar.parentElement.parentElement.remove();
    return
}   let sum = Number(quantity)*Number(price);
    tar.parentElement.parentElement.children[4].innerText = sum;

    tar.parentElement.parentElement.attributes["quantity"].value = quantity;
    tar.parentElement.innerHTML = `
    <button class = "btn_quantity">-</button>
         `+quantity+`
        <button class = "btn_quantity">+</button>
    `

    console.log("Change price, quantity, total of el:  ",tar, quantity,price);


}

async function addItems() {
    let url = "http://localhost/1/hs/items";
     url = "https://jsonplaceholder.typicode.com/users";
     url = 'https://dummyjson.com/products';

    let response = await fetch(url);
    let json = await response.json();
    let items = json["products"];

    console.log(items);

    for (let a = 0; a < items.length; a++) {

        let newP = document.createElement("p");
        newP.innerHTML = items[a].title;
        newP.id = "p_" + items[a].title;
        newP.className = "item_inListRight";
        newP.setAttribute("description", items[a].description);
        newP.setAttribute("price", items[a].price);

        const div_example = document.getElementById("div_example");

        div_example.appendChild(newP)
    }
}

