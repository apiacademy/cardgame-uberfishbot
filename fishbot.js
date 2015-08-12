/*******************************************************
 * fishbot HTML/SPA client engine
 * August 2015
 * Mike Amundsen (@mamund)
 * API Academy code sprint
 *******************************************************/

function fb() {

  var d = domHelp();
  var g = {};

  g.url = '';
  g.body = null;
  g.ctype = "application/x-www-form-urlencoded";
  g.atype = "application/vnd.uber+json"; 
  function init(url) {
    if(!url|| url === '') {
      alert("*** ERROR!\n\nMUST pass starting URL to the libary");
    }
    else {
      g.url = url;
      req(g.url, "get");
    }
  }

  function parse() {
    dump();
    doc();
  }  

  function doc() {
    var elm, data, flg;

    elm = d.find("doc");
    if(elm) {
      data = g.body.uber.data;
      if(data.length>0) {
        processData(data,elm);
      }
    }
  }

  function dump() {
    var elm;

    elm = d.find("dump");
    if(elm) {
      elm.innerText = JSON.stringify(g.body, null, 2);
    }
  }  

  function processData(data, elm) {
    var i, x;
    for(i=0,x=data.length;i<x;i++) {
      if(data[i].url) {
        processLink(data[i], elm);
        continue;
      }
      processValue(data[i], elm);
    }
  }
  
  function processLink(data, elm) {
    var a, div;

    if(!data.transclude || data.transclude==="false") {
      a = d.anchor({"rel":data.rel,"href":data.url,"text":(data.label||data.url)});
      d.push(a, elm);
    }
    else {
      img = d.image({"rel":data.rel, "href":data.url, "title":(data.label||data.url)});
      d.push(img, elm);
    }
    
    if(data.data) {
      div = d.node("div");
      div.className = "container";
      processData(data.data, div);
      d.push(div,elm);
    }
  }

  function processValue(data, elm) {
    var s, div;

    s = d.data({"text":(data.label||data.name),"value":data.value})
    d.push(s, elm);
    if(data.data) {
      div = d.node("div");
      div.className = "container";
      processData(data.data, div);
      d.push(div, elm);
    }
  }
  
  // ********************************
  // ajax helpers
  // ********************************
  // mid-level HTTP handlers

  function httpGet(e) {
    req(e.target.href, "get", null);
    return false;
  }

  function httpQuery(e) {
    var form, coll, query, i, x, q;

    q = 0;
    form = e.target;
    query = form.action + "/?";
    nodes = d.tags("input", form);
    for (i = 0, x = nodes.length; i < x; i++) {
      if (nodes[i].name && nodes[i].name !== '') {
        if (q++ !== 0) {
          query += "&";
        }
        query += nodes[i].name + "=" + escape(nodes[i].value);
      }
    }
    req(query, "get", null);
    return false;
  }

  function httpPost(e) {
    var form, nodes, data;

    data = [];
    form = e.target;
    nodes = d.tags("input", form);
    for (i = 0, x = nodes.length; i < x; i++) {
      if (nodes[i].name && nodes[i].name !== '') {
        data.push({
          name: nodes[i].name,
          value: nodes[i].value + ""
        });
      }
    }
    req(form.action, 'post', JSON.stringify({
      template: {
        data: data
      }
    }));
    return false;
  }

  function httpPut(e) {
    var form, nodes, data;

    data = [];
    form = e.target;
    nodes = d.tags("input", form);
    for (i = 0, x = nodes.length; i < x; i++) {
      if (nodes[i].name && nodes[i].name !== '') {
        data.push({
          name: nodes[i].name,
          value: nodes[i].value + ""
        });
      }
    }
    req(form.action, 'put', JSON.stringify({
      template: {
        data: data
      }
    }));
    return false;
  }

  function httpDelete(e) {
    if (confirm("Ready to delete?") === true) {
      req(e.target.href, "delete", null);
    }
    return false;
  }

  // low-level HTTP stuff
  function req(url, method, body) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      rsp(ajax)
    };
    ajax.open(method, url);
    ajax.setRequestHeader("accept", g.atype);
    if (body && body !== null) {
      ajax.setRequestHeader("content-type", g.ctype);
    }
    ajax.send(body);
  }

  function rsp(ajax) {
    if (ajax.readyState === 4) {
      g.body = JSON.parse(ajax.responseText);
      parse();
    }
  }

  // export function
  var that = {};
  that.init = init;
  return that;
}

/* EOD */
