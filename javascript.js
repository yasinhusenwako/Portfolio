function refer(link) {
  fetch(link)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("main").innerHTML = data;
    });
}

function login(log) {
  fetch(log)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("main").innerHTML = data;
    });
}

var hidden = false;
function action() {
  hidden = !hidden;
  if (hidden) {
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("sign").style.visibility = "visible";
  } else {
    document.getElementById("login").style.visibility = "visible";
    document.getElementById("sign").style.visibility = "hidden";
  }
}

function signup(sign) {
  fetch(sign)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("main").innerHTML = data;
    });
}

function about(abt) {
  fetch(abt)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("main").innerHTML = data;
    });
}
function service(ser) {
  fetch(ser)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("main").innerHTML = data;
    });
}

function main(mn) {
  fetch(mn)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("main").innerHTML = data;
    });
}

fetch("header.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("header").innerHTML = data;
  });

fetch("sidebar.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("nav").innerHTML = data;
  });

fetch("main.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("main").innerHTML = data;
  });

fetch("footer.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("footer").innerHTML = data;
  });

function clopse() {
  var x = document.getElementById("demo");
  var navb = document.getElementById("nav-bar");

  if (navb.style.width == "20%") {
    x.style.display = "block";
    navb.style.width = "10%";
    navb.classList.remove("unhide"); // Remove mystyle class from DIV
    navb.classList.add("dog");
  } else {
    navb.classList.remove("dog"); // Remove mystyle class from DIV
    navb.classList.add("unhide"); // Add newone class to DIV

    navb.style.width = "20%";
  }
}
