
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
      case "none":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");

        $(".hm-diabetes, .hm-services").addClass("active bulu");
        break;

        case "helpline":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");

        $(".hm-helpline, .hm-services").addClass("active bulu");
        break;
      
        case "bmi":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");

        $(".hm-bmi, .hm-services").addClass("active bulu");
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

  // Function to get a cookie value by name
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }

  // Function to check if the user is logged in
  function checkLogin() {
    const loginDetails = getCookie('LOGIN_DETAILS'); // Check if login details are stored in cookies

    // If not logged in, redirect to login page
    if (!loginDetails) {
      const currentPage = window.location.pathname; // Get the current page URL
      const loginPage = '/login.html'; // The path to your login page
      const signupPage = '/signup.html'; // The path to your signup page

      // Only redirect to login if the user is not on the login or signup page
      if (currentPage !== loginPage && currentPage !== signupPage) {
        window.location.href = loginPage;
      }
    } else {
      // User is logged in, display their details
      const loginDetailsJSON = JSON.parse(loginDetails.split("=")[1]);
      const username = loginDetailsJSON.username;

      // Update the UI with the login status (example: in a navigation bar)
      const signElement = document.getElementById('sign');
      if (signElement) {
        signElement.innerHTML = `Logged in as ${username}. Logout`;
        signElement.href = "logout.html"; // Logout link
      }
    }
  }

  // Run the login check when the page loads
  document.addEventListener('DOMContentLoaded', function () {
    checkLogin();
  });

