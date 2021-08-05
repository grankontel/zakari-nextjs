const postZakari = async (endPoint, token, reqMessage) => {
    var qHeaders = new Headers();
    qHeaders.append("User-Agent", "zakari-web");
    qHeaders.append("Content-Type", "application/json");
    qHeaders.append("Authorization", "Bearer " + token);
  
    var qInit = {
      method: "POST",
      headers: qHeaders,
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({
        kreyol: "GP",
        request: reqMessage,
      }),
    };
  
    var request = new Request(endPoint, qInit);
    return await fetch(request, qInit).then(async (r) => {
      return await r.json();
    });
  };
  
  export default postZakari