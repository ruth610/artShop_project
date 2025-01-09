const headerHTML = `
<nav class="navbar navbar-expand" id="home">
    <div class="container navbar-nav d-flex justify-content-between" id="navbar">
      <button class="navbar-toggler ml-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="nav-icons ml-auto">
        <ul class="navbar-nav icons">
          <li class="nav-items"><a class="nav-link" href="#">Contacts</a></li>
            <li class="nav-items" id="loginNav"><img src="../assets/icons/lock.png" alt="" width="15">Sign In</li>
            <li class="nav-items"><a href="" class="nav-link"><img src="../assets/icons/grocery-store.png" alt="" width="20"></a></li>
        </ul>
      </div>
    </div>
  </nav>
`;
export const loadHeader = () => {
    const headerContainer = document.getElementById("header");
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }
};
