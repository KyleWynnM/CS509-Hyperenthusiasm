var base_url = "https://15qu2mzzpa.execute-api.us-east-1.amazonaws.com/Prod/";

var processShipment_url = base_url + "processShipment";      // POST: {arg1:5, arg2:7}

function processProcessShipmentResponse(arg1, arg2, store_name, result, status) {
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

function handleProcessShipmentClick(e) {
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