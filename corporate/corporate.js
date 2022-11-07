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
    var js = JSON.parse(result);

    var result  = js["result"];

    // Update computation result
    if (status == 200) {
        result.forEach(function(store) {
            var li = document.createElement("li");
            var text = document.createTextNode(store.lat + " " + store.long + " " + store.store_name + " " + store.manager_name + " " + store.manager_pw);
            li.appendChild(text);
            document.getElementById("storeList").appendChild(li);
        });
    } else {
        var msg = js["error"];   // only exists if error...
        document.createStoreForm.result.innerText = "error:" + msg
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
    data["latitude"] = latitude;
    data["longitude"] = longitude;
    data["store_name"] = store_name;
    data["manager_name"] = manager_name;
    data["manager_pw"] = manager_pw;

    var js = JSON.stringify(data);
    console.log(data)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", createStore_url, true);

    // send the collected data as JSON
    xhr.send(js);

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
    var js = JSON.parse(result);

    var result  = js["result"];

    // Update computation result
    if (status == 200) {
        result.forEach(function(item) {
            var li = document.createElement("li");
            var text = document.createTextNode(item.sku + " " + item.name + " " + item.description + " " + item.price + " " + item.max_q);
            li.appendChild(text);
            document.getElementById("itemList").appendChild(li);
        });
    } else {
        var msg = js["error"];   // only exists if error...
        document.createItemForm.result.innerText = "error:" + msg
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
    data["sku"] = sku;
    data["item_name"] = item_name;
    data["desc"] = description;
    data["price"] = price;
    data["max_q"] = max_q;

    var js = JSON.stringify(data);
    console.log(data)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", createItem_url, true);

    // send the collected data as JSON
    xhr.send(js);

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
    if (status == 200) {
        window.alert(result)
        document.getElementById("itemList").innerText = result;
    } else {
        var msg = js["error"];   // only exists if error...
        document.createItemForm.result.innerText = "error:" + msg
        document.getElementById("itemList").innerHTML = "error:" + msg;
    }
}

function handleAssignLocationClick(e) {
    var form = document.assignLocationForm;
    var sku = form.sku.value;
    var aisle = form.aisle.value;
    var shelf = form.shelf.value;

    var data = {};
    data["sku"] = sku;
    data["aisle"] = aisle;
    data["shelf"] = shelf;

    var js = JSON.stringify(data);
    console.log(data)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", assignLocation_url, true);

    // send the collected data as JSON
    xhr.send(js);

    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            processAssignLocationResponse(sku, aisle, shelf, xhr.responseText, xhr.status);
        } else {
            processAssignLocationResponse(sku, aisle, shelf, "N/A", xhr.status);
        }
    };
}
