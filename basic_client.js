const client = new XMLHttpRequest();
const url = "http://wmeasnad71.aepsc.com:5655/ws/AEP_OhioCres_EFYW.ws:EFYW/AEP_OhioCres_EFYW_ws_EFYW_Port";
const payload = '';

client.open("get", url);
client.send();

client.onreadystatechange = (e) => {
    console.log(client.responseText)
}