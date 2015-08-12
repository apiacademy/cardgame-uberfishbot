/*******************************************************
 * fishbot HTML/SPA client engine script
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

  g.actions = {
    "append":"post",
    "partial":"patch",
    "read":"get",
    "remove":"delete",
    "replace":"put"
  };
  
  // starts here
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
    d.clear(elm);
    if(elm) {
      data = g.body.uber.data;
      if(data.length>0) {
        processData(data,elm);
      }
    }
  }

  // raw dump for debugging
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
    var link, div, flg;

    flg=false;
    
    // safe form
    if(data.templated && (data.templated==="true" || data.templated===true)) {
      processTemplate(data, elm);
      flg=true;
    }

    // unsafe form
    if(data.model) {
      processModel(data, elm);
      flg=true;
    }
    
    // image
    if(flg===false && (data.transclude && data.transclude==="true")) {
      link = d.image({"rel":data.rel, "href":data.url, "title":(data.label||data.url)});
      d.push(link, elm);
      flg=true;
    }

    // anchor
    if(flg===false) {
      link = d.anchor({
        "rel":data.rel,
        "href":data.url,
        "text":(data.label||data.url),
        "className":"anchor"
      });
      d.push(link, elm);
      flg=true;
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

  function processTemplate(data, elm) {
    var coll, form, fs, lg, p, inp;
    var tmpl, query, args, list; 
    
    form = d.node("form");
    form.action = data.url||"#";
    form.method = g.actions[data.action||"read"];
    form.onsubmit = httpForm;
    fs = d.node("fieldset");
    lg = d.node("legend");
    lg.innerHTML = (data.label||data.name||data.id||data.rel);
    d.push(lg, fs);
    if(data.data) {
      coll = data.data;
    }
    else {
      query = data.url.substring(data.url.indexOf("{?"),data.url.indexOf('}')+1);
      list = UriTemplate.parse(query);
      args = list.expressions[0].varspecs
      coll = [];
      for(i=0,x=args.length;i<x;i++) {
        coll.push({name:args[i].varname,label:args[i].varname,value:""});
      }
    }
    for(i=0,x=coll.length;i<x;i++) {
      fld = coll[i];
      p = d.input({
        prompt:(fld.label||fld.name||fld.id)+"&nbsp;", 
        name:(fld.name||fld.id),
        value:"",
        className:"input"
      });
      d.push(p,fs);
    }
    p = d.node("p");
    inp = d.node("input");
    inp.type="submit";
    d.push(inp,p);
    d.push(p,fs);
    d.push(fs,form);
    d.push(form,elm);
  }

  function processModel(data, elm) {
    var coll, form, fs, lg, p, inp;
    var tmpl, query;
    
    form = d.node("form");
    form.action = data.url||"#";
    form.method = g.actions[data.action||"read"];
    form.onsubmit = httpForm;
    fs = d.node("fieldset");
    lg = d.node("legend");
    lg.innerHTML = (data.label||data.name||data.id||data.rel);
    d.push(lg, fs);
    if(data.data) {
      coll = data.data;
    }
    else {
      query = data.model;
      list = UriTemplate.parse(query);
      args = list.expressions[0].varspecs
      coll = [];
      for(i=0,x=args.length;i<x;i++) {
        coll.push({name:args[i].varname,label:args[i].varname,value:""});
      }
    }
    for(i=0,x=coll.length;i<x;i++) {
      fld = coll[i];
      p = d.input({
        prompt:(fld.label||fld.name||fld.id)+"&nbsp;", 
        name:(fld.name||fld.id),
        value:"",
        className:"input"
      });
      d.push(p,fs);
    }
    p = d.node("p");
    inp = d.node("input");
    inp.type="submit";
    d.push(inp,p);
    d.push(p,fs);
    d.push(fs,form);
    d.push(form,elm);
  }
  
  // ********************************
  // ajax helpers
  // ********************************
  // mid-level HTTP handlers

  function httpForm(e) {
    var form, coll, query, i, x, args;

    args = {};
    form = e.target;
    query = form.action.replace('%7B?','{?'); 
    nodes = d.tags("input", form);
    for (i = 0, x = nodes.length; i < x; i++) {
      if (nodes[i].name && nodes[i].name !== '') {
        args[nodes[i].name] = nodes[i].value;
      }
    }
    tmpl = UriTemplate.parse(query);
    query = tmpl.expand(args);
    query = query.replace("file:///C:",g.url);
    req(query, "get", null);
    return false;
  }
  
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
