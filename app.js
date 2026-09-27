(function(){
"use strict";

var state={data:null};

function byId(id){return document.getElementById(id);}

function money(value){
  return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
}

function setStatus(message){
  byId("statusMessage").textContent=message;
}

function renderSummary(data){
  byId("totalUsers").textContent=data.summary.totalUsers.toLocaleString("en-IN");
  byId("activeUsers").textContent=data.summary.activeUsers.toLocaleString("en-IN");
  byId("orders").textContent=data.summary.orders.toLocaleString("en-IN");
  byId("revenue").textContent=money(data.summary.revenue);
}

function renderChart(data){
  var container=byId("chartContainer");
  var max=Math.max.apply(null,data.monthlySales.map(function(item){return item.sales;}));
  container.innerHTML="";

  data.monthlySales.forEach(function(item){
    var wrapper=document.createElement("div");
    wrapper.className="bar-item";

    var value=document.createElement("span");
    value.className="bar-value";
    value.textContent=money(item.sales);

    var bar=document.createElement("div");
    bar.className="bar";
    bar.style.setProperty("--height",(item.sales/max*210)+"px");
    bar.setAttribute("aria-label",item.month+" sales "+money(item.sales));

    var label=document.createElement("span");
    label.className="bar-label";
    label.textContent=item.month;

    wrapper.appendChild(value);
    wrapper.appendChild(bar);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
}

function renderSalesTable(data){
  var wrap=byId("salesTableContainer");
  var table=document.createElement("table");
  table.innerHTML="<caption class='sr-only'>Monthly sales data</caption><thead><tr><th scope='col'>Month</th><th scope='col'>Sales</th></tr></thead>";
  var body=document.createElement("tbody");

  data.monthlySales.forEach(function(item){
    var row=document.createElement("tr");
    row.innerHTML="<td>"+item.month+"</td><td>"+money(item.sales)+"</td>";
    body.appendChild(row);
  });

  table.appendChild(body);
  wrap.innerHTML="";
  wrap.appendChild(table);
}

function statusClass(status){
  if(status==="Completed")return "completed";
  if(status==="In Progress")return "progress";
  return "pending";
}

function renderActivities(){
  var wrap=byId("activityTable");
  var filter=byId("statusFilter").value;
  var sort=byId("sortSelect").value;

  var rows=state.data.activities.filter(function(item){
    return filter==="All" || item.status===filter;
  });

  rows.sort(function(a,b){
    if(sort==="amount-desc")return b.amount-a.amount;
    if(sort==="amount-asc")return a.amount-b.amount;
    if(sort==="date-asc")return new Date(a.date)-new Date(b.date);
    return new Date(b.date)-new Date(a.date);
  });

  if(!rows.length){
    wrap.innerHTML="<div class='empty'>No records match the selected filter.</div>";
    return;
  }

  var table=document.createElement("table");
  table.innerHTML="<caption class='sr-only'>Recent dashboard activity</caption><thead><tr><th scope='col'>Name</th><th scope='col'>Category</th><th scope='col'>Status</th><th scope='col'>Amount</th><th scope='col'>Date</th></tr></thead>";
  var body=document.createElement("tbody");

  rows.forEach(function(item){
    var tr=document.createElement("tr");
    tr.innerHTML="<td>"+item.name+"</td><td>"+item.category+"</td><td><span class='status-badge "+statusClass(item.status)+"'>"+item.status+"</span></td><td>"+money(item.amount)+"</td><td>"+item.date+"</td>";
    body.appendChild(tr);
  });

  table.appendChild(body);
  wrap.innerHTML="";
  wrap.appendChild(table);
}

function renderAll(){
  renderSummary(state.data);
  renderChart(state.data);
  renderSalesTable(state.data);
  renderActivities();
  setStatus("Dashboard data loaded successfully.");
}

function loadData(){
  setStatus("Loading dashboard data…");
  fetch("data.json",{cache:"no-cache"})
    .then(function(response){
      if(!response.ok)throw new Error("Could not load data.json");
      return response.json();
    })
    .then(function(data){
      if(!data.summary||!data.monthlySales||!data.activities){
        throw new Error("The data file has an unexpected structure.");
      }
      state.data=data;
      renderAll();
    })
    .catch(function(error){
      console.error(error);
      setStatus("Unable to load dashboard data. Please run the project through a local web server and try again.");
      byId("activityTable").innerHTML="<div class='empty'>Data could not be loaded.</div>";
    });
}

function setupNavigation(){
  var button=document.querySelector(".menu-btn");
  var nav=byId("main-nav");
  if(!button||!nav)return;

  button.addEventListener("click",function(){
    var open=button.getAttribute("aria-expanded")==="true";
    nav.classList.toggle("open",!open);
    button.setAttribute("aria-expanded",String(!open));
    button.setAttribute("aria-label",open?"Open navigation":"Close navigation");
  });

  nav.addEventListener("click",function(event){
    if(event.target.tagName==="A"){
      nav.classList.remove("open");
      button.setAttribute("aria-expanded","false");
      button.setAttribute("aria-label","Open navigation");
    }
  });
}

document.addEventListener("DOMContentLoaded",function(){
  setupNavigation();

  byId("statusFilter").addEventListener("change",renderActivities);
  byId("sortSelect").addEventListener("change",renderActivities);

  byId("chartView").addEventListener("change",function(event){
    var tableMode=event.target.value==="table";
    byId("chartContainer").hidden=tableMode;
    byId("salesTableContainer").hidden=!tableMode;
  });

  byId("refreshBtn").addEventListener("click",loadData);
  loadData();
});
}());
