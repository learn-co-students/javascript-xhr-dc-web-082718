
function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  console.log(this.responseText);
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}


function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
document.getElementById("repositories").innerHTML = "";
  let repoList = document.createElement("ul");

  for (let repo of repos) {
      let repoLi =  document.createElement("li");

      let linky = document.createElement("a");
      linky.dataset.repo = repo["name"];
      linky.setAttribute("onclick","getCommits(this)");
      linky.innerHTML = repo["name"];
      repoLi.appendChild(linky);

      repoList.appendChild(repoLi);
  }


  document.getElementById("repositories").appendChild(repoList);
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
document.getElementById("commits").innerHTML = "";
  let commitsList = document.createElement("ul");
  for(let commit of commits){
      // debugger;
      let li = document.createElement("li");
      let strong = document.createElement("strong");
      strong.innerHTML = commit.commit.author.name;

      li.appendChild(strong);
      li.innerHTML += ` - ${commit.commit.message}`;
      commitsList.appendChild(li);
  }

  document.getElementById("commits").appendChild(commitsList);
}
