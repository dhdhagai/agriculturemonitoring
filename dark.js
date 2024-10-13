
$(function () {
  $("#hm-nav").load("header.html", function (response, status, request) {
    
    switch (page) {
      case "home":
        $(".nav-link").removeClass("active");
        $(".hm-home").addClass("active bulu");
        break;
      case "tips":
        $(".nav-link").removeClass("active");
        $(".hm-tips").addClass("active bulu");

        break;
      case "login":
        $(".nav-link").removeClass("active");

        $(".hm-about").addClass("active bulu");

        break;
        case "liveview":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");
        $(".hm-liveview, .hm-services").addClass("active bulu");
        break;

        case "agricultureai":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");
        $(".hm-agricultureai, .hm-services").addClass("active bulu");
        break;
      
        case "weatherapp":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");
        $(".hm-weatherapp, .hm-services").addClass("active bulu");
        break;
        case "hospital":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");

        $(".hm-hospital, .hm-services").addClass("active bulu");
        break;
        case "disease":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");

        $(".hm-disease, .hm-services").addClass("active bulu");
        break;
      
    }
    

  });
  $("#hm-footer").load("footer.html");
document.getElementById("darkSwitch").addEventListener("click", () => {
  setTimeout(() => {
    DarkModeToggle()
  }, 100);
})
});


//                        //
//                        //
//                        //
//                        //          
//                        //
//        DarkMode        //
//                        //
//                        //
//                        //
//                        //
//                        //
//                        //


function DarkModeToggle() {
  const darkSwitch = localStorage.getItem("darkSwitch");
  const elementsToToggle = {
    navLinks: document.querySelectorAll(".nav-link"),
    chatContainer: document.querySelectorAll("#user-input"),
    messages: document.querySelectorAll("div#messages"),
    forms: document.querySelectorAll("div#chat-form"),
    img: document.querySelectorAll(".img-fluid"),
    links: document.querySelectorAll(".github-profile"),
    table: document.getElementById("table"),
    drpdwn: document.getElementById("drpdwn"),
    allLinks: document.querySelectorAll("a"),
    textContainer: document.querySelectorAll(".text-container")
  };

  // Function to apply dark mode classes
  function applyDarkMode() {
    elementsToToggle.textContainer.forEach(el => {
      el.classList.add("bg-dark", "text-white")
    })
    elementsToToggle.img.forEach(el => {
      el.setAttribute("src", "github-mark-white.svg");
    });
    
    elementsToToggle.forms.forEach(el => {
      el.classList.add("bg-dark", "text-white");
    });
    
    elementsToToggle.chatContainer.forEach(el => {
      el.classList.add("bg-dark", "text-white", "dropdown-menu-dark", "dropdown-item-dark");
    });
    
    elementsToToggle.messages.forEach(el => {
      el.classList.add("bg-dark", "text-white", "dropdown-menu-dark", "dropdown-item-dark");
    });
    
    if (elementsToToggle.table) {
      elementsToToggle.table.classList.add("table-dark");
    }
    
    if (elementsToToggle.drpdwn) {
      elementsToToggle.drpdwn.classList.add("dropdown-menu-dark");
    }

    elementsToToggle.navLinks.forEach(el => {
      el.classList.add("text-white");
    });
    
    elementsToToggle.allLinks.forEach(el => {
      el.classList.add("text-white");
    });
    
    elementsToToggle.links.forEach(el => {
      el.classList.add("text-white");
    });
    document.getElementById("lastUpdated").classList.add("text-white")
    localStorage.setItem("darkSwitch", "dark");
  }

  // Function to remove dark mode classes
  function removeDarkMode() {
    elementsToToggle.textContainer.forEach(el => {
      el.classList.remove("bg-dark", "text-white")
    })
    elementsToToggle.img.forEach(el => {
      el.setAttribute("src", "github-mark.svg");
    });
    
    elementsToToggle.forms.forEach(el => {
      el.classList.remove("bg-dark", "text-white");
    });
    
    elementsToToggle.chatContainer.forEach(el => {
      el.classList.remove("bg-dark", "text-white", "dropdown-menu-dark", "dropdown-item-dark");
    });
    
    elementsToToggle.messages.forEach(el => {
      el.classList.remove("bg-dark", "text-white", "dropdown-menu-dark", "dropdown-item-dark");
    });
    
    if (elementsToToggle.table) {
      elementsToToggle.table.classList.remove("table-dark");
    }
    
    if (elementsToToggle.drpdwn) {
      elementsToToggle.drpdwn.classList.remove("dropdown-menu-dark");
    }

    elementsToToggle.navLinks.forEach(el => {
      el.classList.remove("text-white");
    });
    
    elementsToToggle.allLinks.forEach(el => {
      el.classList.remove("text-white");
    });
    
    elementsToToggle.links.forEach(el => {
      el.classList.remove("text-white");
    });
    document.getElementById("lastUpdated").classList.remove("text-white")
    localStorage.setItem("darkSwitch", "light");


  }

  // Toggle dark mode based on the current state
  if (darkSwitch === "dark") {
    applyDarkMode();
  } else {
    removeDarkMode();
  }
}

