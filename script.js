
const lupa = document.getElementById('lupa');
const log = document.getElementById('log');
let modal = document.getElementById('modal');
const github = new XMLHttpRequest();
lupa.onclick = ()=>
{
    if(log.value != '')
    {
        document.getElementById('div_2').innerHTML = '';
        document.getElementById('error').innerHTML = '';
        github.open("GET", ` https://api.github.com/users/${log.value}`);
        github.send();
    }
    else
    {
        modal.innerHTML = `<p>Enter login</p>`;
        showModal();
    }
}


github.onreadystatechange=()=>
{
    if(github.readyState == XMLHttpRequest.DONE)
    {
        
        switch (github.status) 
        {
            case 200:
                { 
                    const github_ = JSON.parse(github.responseText);
                    Github(github_);
                }
                break;
            case 404:{Error_();}break;
                default:
                    break;
            }
           
    }
}

function Error_() 
{
    let error = document.getElementById('error');
    let table = document.createElement('table');
    let tr;
    for (let i = 0; i < 3; i++) 
    {
        tr = document.createElement('tr');
        table.append(tr);
    }
    table.children[0].innerText = '404';
    table.children[0].style.color = "orange";
    table.children[0].style.fontSize = "42px";
    table.children[1].innerText = 'NOT FOUND';
    table.children[2].innerText = 'Please enter a different login';
    error.append(table);
}


function Github(github_) 
{
    let div_ = document.getElementById('div_2');
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let td =  document.createElement('td');
    let a;
    td.setAttribute("rowspan","3");
    td.style.textAlign = 'center';
    td.style.width = '15%';
    let ava  = document.createElement('img');
    ava.setAttribute("src",github_.avatar_url);
    ava.setAttribute("alt","A photo");
    td.append(ava);
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute("rowspan","3");
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute("rowspan","6");
    td.style.width = '10%';
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('id','name');
    td.setAttribute('class','tr_bot');
    td.innerText = 'Url to Github';
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('class','tr_bot');
    a = document.createElement('a');
    a.setAttribute("href",github_.html_url);
    a.innerText = github_.html_url;
    td.append(a);
    tr.append(td);
    table.append(tr);

    //3
    tr = document.createElement('tr');
    td =  document.createElement('td');
    td.setAttribute('id','name');
    td.setAttribute('class','tr_bot');
    td.innerText = "Blog";
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('class','tr_bot');
    td.setAttribute('colspan','3');
    if(github_.blog == '' || github_.blog == null)td.innerText = 'No blog';
    else
    {
        a = document.createElement('a');
        a.setAttribute("href",github_.blog);
        a.innerText = github_.blog;
        td.append(a);
    }
    tr.append(td);
    table.append(tr);

    //4
    tr = document.createElement('tr');
    td =  document.createElement('td');
    td.setAttribute('id','name');
    td.setAttribute('class','tr_bot');
    td.innerText = "City";
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('class','tr_bot');
    td.setAttribute('colspan','3');
    if(github_.location != '' || github_.location != null)td.innerText = github_.location;
    else td.innerText = "City not specified";
    tr.append(td);
    table.append(tr);

    //5
    tr = document.createElement('tr');
    td =  document.createElement('td');
    td.setAttribute('id','name');
    td.setAttribute('class','tr_bot');
    td.innerText = "Name";
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('class','tr_bot');
    if(github_.name != '' || github_.name != null) td.innerText = github_.name;
    else td.innerText = "Name not provided";
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('id','name');
    td.setAttribute('class','tr_bot');
    td.innerText = "Email";
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('class','tr_bot');
    td.setAttribute('colspan','3');
    if(github_.email == null )td.innerText = "No email";
    else td.innerText = github_.email;
    tr.append(td);
    table.append(tr);

    //6
    tr = document.createElement('tr');
    td =  document.createElement('td');
    td.setAttribute('id','name');
    td.setAttribute('class','tr_bot');
    td.innerText = "Login";
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('class','tr_bot');
    td.innerText = github_.login;
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('id','name');
    td.setAttribute('class','tr_bot');
    td.innerText = 'Followers: ';
    let sp = document.createElement('span');
    sp.setAttribute("id",'followers');
    sp.innerText = github_.followers;
    td.append(sp);
    tr.append(td);
    td =  document.createElement('td');
    td.setAttribute('id','name');
    td.setAttribute('class','tr_bot');
    td.style.textAlign = 'right';
    td.innerText = 'Following: ';
    sp = document.createElement('span');
    sp.setAttribute("id",'following');
    sp.innerText = github_.following;
    td.append(sp);
    tr.append(td);
    table.append(tr);
    div_.append(table);
}

function showModal()
{
    modal.classList.remove('nodispl');
    modal.classList.add('rollup');
    setTimeout(()=>
    {
        modal.classList.remove('rollup');
        modal.classList.add('nodispl');
    },3000);
}