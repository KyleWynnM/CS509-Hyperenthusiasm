var base_url = "https://0xvw359z10.execute-api.us-east-1.amazonaws.com/Prod/";

var log_in_corporate_url = base_url + "logInCorporate";      // POST: {arg1:5, arg2:7}
var log_in_manager_url = base_url + "logInManager";

function processCorporateLoginResponse(arg1, arg2, store_name, result, status) {
    // Can grab any DIV or SPAN HTML element and can then manipulate its
    // contents dynamically via javascript
    var js = JSON.parse(result);

    var result  = js["result"];

    // Update computation result
    if (status == 200) {
        window.alert(result.c_username)
        localStorage.setItem("c_username", result.c_username);
        localStorage.setItem("c_password", result.c_password);
        window.location.href = "./corporate/corporate.html";
    } else if (status === 401) {
        document.getElementById("c_loginResponse").innerHTML = "Invalid login credentials, try again please"
    } else {
        var msg = js["error"];   // only exists if error...
        document.getElementById("c_loginResponse").innerHTML = "error:" + msg;
    }
}

function handleCorporateLoginClick(e) {
    var form = document.corporateLogInForm;
    var c_name = form.c_username.value;
    var c_pw = form.c_password.value;

    var data = {};
    data["c_name"] = c_name;
    data["c_pw"] = c_pw;
 

    var js = JSON.stringify(data);
    console.log(data)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", log_in_corporate_url, true);

    // send the collected data as JSON
    xhr.send(js);

    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            processCorporateLoginResponse(c_name, c_name, c_name, xhr.responseText, xhr.status);
        } else {
            processCorporateLoginResponse(c_name, c_name, c_name, "N/A", xhr.status);
        }
    };
}

function processManagerLoginResponse(arg1, arg2, store_name, result, status) {
    // Can grab any DIV or SPAN HTML element and can then manipulate its
    // contents dynamically via javascript
    var js = JSON.parse(result);

    var result  = js["result"];

    // Update computation result
    if (status == 200) {
        window.alert(result.c_username)
        localStorage.setItem("m_username", result.s_username);
        localStorage.setItem("m_password", result.s_password);
        localStorage.setItem("store_id", result.s_store_id);
        window.location.href = "./manager/manager.html";
    } else if (status === 401) {
        document.getElementById("m_loginResponse").innerHTML = "Invalid login credentials, try again please"
    } else {
        var msg = js["error"];   // only exists if error...
        document.getElementById("m_loginResponse").innerHTML = "error:" + msg;
    }
}

function handleManagerLoginClick(e) {
    var form = document.corporateLogInForm;
    var s_manager_name = form.m_username.value;
    var s_manager_pw = form.m_password.value;

    var data = {};
    data["s_manager_name"] = s_manager_name;
    data["s_manager_pw"] = s_manager_pw;
 
    var js = JSON.stringify(data);
    console.log(data)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", log_in_manager_url, true);

    // send the collected data as JSON
    xhr.send(js);

    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            processCorporateLoginResponse(s_manager_name, s_manager_name, s_manager_name, xhr.responseText, xhr.status);
        } else {
            processCorporateLoginResponse(s_manager_name, s_manager_name, s_manager_name, "N/A", xhr.status);
        }
    };
}
