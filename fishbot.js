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
  g.ctype = "application/vnd.uber+json";

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
    topLevel();
  }  

  function topLevel() {
    var elm, data;

    elm = d.find("top");
    if(elm) {
      data = g.body.uber.data;
      for(i=0,x=data.length;i<x;i++) {
        if(data[i].url) {
          processLink(data[i], elm);
        }
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

  function processLink(data, elm) {
    var a;
    
    a = d.anchor({"rel":data.rel,"href":data.url,"text":(data.label||data.url)});
    d.push(a, elm);
    
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
    ajax.setRequestHeader("accept", g.ctype);
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
