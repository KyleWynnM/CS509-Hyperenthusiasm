var base_url = "https://15qu2mzzpa.execute-api.us-east-1.amazonaws.com/Prod/";

var createStore_url = base_url + "createStore";      // POST: {arg1:5, arg2:7}
var createItem_url = base_url + "createItem";
var assignLocation_url = base_url + "assignLocation";
window.onload = function() {
    console.log(localStorage)
}
    
function processCreateStoreResponse(arg1, arg2, store_name, result, status) {
    // Can grab any DIV or SPAN HTML element and can then manipulate its
    // contents dynamically via javascript
    console.log(result);
    var js = JSON.parse(result);
    var items = JSON.parse(js.body);
    console.log(items);
    var result  = js["result"];
    // Update computation result
    if (js.statusCode == 200) {
        var title = document.createElement("h3");
        title.innerHTML = "Existing Stores:";
        items.result.forEach(function(store) {
            var li = document.createElement("li");
            var text = document.createTextNode(store.lat + " " + store.long + " " + store.store_name + " " + store.manager_name + " " + store.manager_pw);
            li.appendChild(text);
            document.getElementById("storeList").appendChild(li);
        });
    } else {
        var msg = js["error"];   // only exists if error...
        document.getElementById("storeList").innerHTML = "error:" + msg;
    }
}

function handleCreateStoreClick(e) {
    var form = document.createStoreForm;
    var latitude = form.lat.value;
    var longitude = form.long.value;
    var store_name = form.s_name.value;
    var manager_name = form.s_manager_name.value;
    var manager_pw = form.s_manager_pw.value;

    var data = {};
    data["c_username"] = localStorage.getItem("c_username");
    data["c_password"] = localStorage.getItem("c_password");
    data["latitude"] = latitude;
    data["longitude"] = longitude;
    data["store_name"] = store_name;
    data["manager_name"] = manager_name;
    data["manager_pw"] = manager_pw;

    var js = JSON.stringify(data);
    nest = {};
    nest["body"] = js
    console.log(data)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", createStore_url, true);

    // send the collected data as JSON
    let newjs = JSON.stringify(nest);
    console.log(newjs);
    // send the collected data as JSON
    xhr.send(newjs);

    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            processCreateStoreResponse(latitude, longitude, store_name, xhr.responseText, xhr.status);
        } else {
            processCreateStoreResponse(latitude, longitude, store_name, "N/A", xhr.status);
        }
    };
}

function processCreateItemResponse(sku, item_name, desc, price, max_q, result, status) {
    // Can grab any DIV or SPAN HTML element and can then manipulate its
    // contents dynamically via javascript
    console.log(result);
    var js = JSON.parse(result);
    var items = JSON.parse(js.body);
    console.log(items);
    var result  = js["result"];
    // Update computation result
    if (js.statusCode == 200) {
        var title = document.createElement("h3");
        title.innerHTML = "Existing Items:";
        items.result.forEach(function(item) {
            var li = document.createElement("li");
            var text = document.createTextNode(item.sku + " " + item.name + " " + item.description + " " + item.price + " " + item.max_q);
            li.appendChild(text);
            document.getElementById("itemList").appendChild(li);
        });
    } else {
        var msg = js["error"];   // only exists if error...
        document.getElementById("itemList").innerHTML = "error:" + msg;
    }
}

function handleCreateItemClick(e) {
    var form = document.createItemForm;
    var sku = form.sku.value;
    var item_name = form.itemName.value;
    var description = form.description.value;
    var price = form.price.value;
    var max_q = form.maxQ.value;

    var data = {};
    data["c_username"] = localStorage.getItem("c_username");
    data["c_password"] = localStorage.getItem("c_password");
    data["sku"] = sku;
    data["item_name"] = item_name;
    data["desc"] = description;
    data["price"] = price;
    data["max_q"] = max_q;
    nest = {};
    
    var js = JSON.stringify(data);
    nest["body"] = js

    console.log(data)
    console.log(nest)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", createItem_url, true);
    let newjs = JSON.stringify(nest);
    console.log(newjs);
    // send the collected data as JSON
    xhr.send(newjs);

    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            processCreateItemResponse(sku, item_name, description, price, max_q, xhr.responseText, xhr.status);
        } else {
            processCreateItemResponse(sku, item_name, description, price, max_q, "N/A", xhr.status);
        }
    };
}

function processAssignLocationResponse(sku, aisle, shelf, result, status) {
    // Can grab any DIV or SPAN HTML element and can then manipulate its
    // contents dynamically via javascript
    var js = JSON.parse(result);

    var result  = js["result"];

    // Update computation result
    if (js.statusCode == 200) {
        console.log(JSON.parse(js.body));
        document.getElementById("assign-location-response").innerText = JSON.parse(js.body).result;
    } else {
        var msg = js["error"];   // only exists if error...
        document.getElementById("assign-location-response").innerHTML = "error:" + msg;
    }
}

function handleAssignLocationClick(e) {
    var form = document.assignLocationForm;
    var sku = form.sku.value;
    var aisle = form.aisle.value;
    var shelf = form.shelf.value;

    var data = {};
    data["c_username"] = localStorage.getItem("c_username");
    data["c_password"] = localStorage.getItem("c_password");
    data["sku"] = sku;
    data["aisle"] = aisle;
    data["shelf"] = shelf;
    nest = {};
    
    var js = JSON.stringify(data);
    nest["body"] = js

    console.log(data)
    console.log(nest)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", assignLocation_url, true);
    let newjs = JSON.stringify(nest);
    console.log(newjs);
    // send the collected data as JSON
    xhr.send(newjs);

    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            processAssignLocationResponse(sku, aisle, shelf, xhr.responseText, xhr.status);
        } else {
            processAssignLocationResponse(sku, aisle, shelf, "N/A", xhr.status);
        }
    };
}
