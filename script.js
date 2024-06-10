// Mock database
const users = [
  {
    nome: "admin",
    matricula: 123,
    funcao: "Administrador",
    empresa: "EmpresaX",
    isAdmin: true
  }
];

const funcionarios = [];
const midias = [];

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const cadastroForm = document.getElementById("cadastro-form");
  const loginContainer = document.querySelector(".login-container");
  const cadastroContainer = document.querySelector(".cadastro-container");
  const container = document.querySelector(".container");
  const pageTitle = document.getElementById("page-title");
  const funcionariosTable = document.getElementById("funcionarios-table");
  const midiasTable = document.getElementById("midias-table");
  const toggleCadastroButton = document.getElementById("toggle-cadastro");

  let currentUser = null;

  // Toggle between login and cadastro screens
  document.getElementById("cadastro-link").addEventListener("click", function () {
    loginContainer.style.display = "none";
    cadastroContainer.style.display = "block";
  });

  document.getElementById("login-link").addEventListener("click", function () {
    cadastroContainer.style.display = "none";
    loginContainer.style.display = "block";
  });

  // Handle login form submission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("login-nome").value;
    const matricula = parseInt(document.getElementById("login-matricula").value);

    currentUser = users.find(user => user.nome === nome && user.matricula === matricula);
    
    if (currentUser) {
      loginContainer.style.display = "none";
      container.style.display = "block";
      if (currentUser.isAdmin) {
        pageTitle.textContent = "Cadastro de Funcionários";
        funcionariosTable.style.display = "table";
        midiasTable.style.display = "none";
        toggleCadastroButton.style.display = "block";
      } else {
        pageTitle.textContent = "Cadastro de Mídias";
        midiasTable.style.display = "table";
        funcionariosTable.style.display = "none";
        toggleCadastroButton.style.display = "none";
      }
      renderTables();
    } else {
      alert("Usuário não encontrado!");
    }
  });

  // Handle cadastro form submission
  cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("cadastro-nome").value;
    const matricula = parseInt(document.getElementById("cadastro-matricula").value);
    const funcao = document.getElementById("cadastro-funcao").value;
    const empresa = document.getElementById("cadastro-empresa").value;

    users.push({
      nome: nome,
      matricula: matricula,
      funcao: funcao,
      empresa: empresa,
      isAdmin: false // New users are not admins by default
    });

    cadastroContainer.style.display = "none";
    loginContainer.style.display = "block";
    alert("Cadastro realizado com sucesso!");
  });

  // Function to toggle between Cadastro de Funcionários and Cadastro de Mídias
  window.toggleCadastro = function () {
    const isMidia = pageTitle.textContent === "Cadastro de Mídias";
    pageTitle.textContent = isMidia ? "Cadastro de Funcionários" : "Cadastro de Mídias";
    midiasTable.style.display = isMidia ? "none" : "table";
    funcionariosTable.style.display = isMidia ? "table" : "none";
  };

  // Handle 'Incluir' button click to open modal
  window.openModal = function () {
    document.querySelector(".modal-container").style.display = "flex";
    if (pageTitle.textContent === "Cadastro de Mídias") {
      document.getElementById("midia-form").style.display = "block";
      document.getElementById("funcionario-form").style.display = "none";
    } else {
      document.getElementById("midia-form").style.display = "none";
      document.getElementById("funcionario-form").style.display = "block";
    }
  };

  // Handle modal close
  document.querySelector(".modal-container").addEventListener("click", function (event) {
    if (event.target === this) {
      this.style.display = "none";
    }
  });

  // Handle save buttons
  document.getElementById("btnSalvar").addEventListener("click", function (event) {
    event.preventDefault();
    const nome = document.getElementById("m-nome").value;
    const funcao = document.getElementById("m-funcao").value;
    const matricula = parseInt(document.getElementById("m-matricula").value);
    const empresa = document.getElementById("m-empresa").value;

    funcionarios.push({
      nome: nome,
      funcao: funcao,
      matricula: matricula,
      empresa: empresa
    });

    document.querySelector(".modal-container").style.display = "none";
    renderTables();
  });

  document.getElementById("btnSalvarMidia").addEventListener("click", function (event) {
    event.preventDefault();
    const tipomidia = document.getElementById("m-tipomidia").value;
    const nummidia = document.getElementById("m-nummidia").value;
    const nummatricula = document.getElementById("m-nummatricula").value;
    const numserie = document.getElementById("m-numserie").value;
    const empresaMidia = document.getElementById("m-empresa-midia").value;
    const status = document.getElementById("m-status").value;
    const serie = document.getElementById("m-serie").value;

    midias.push({
      tipomidia: tipomidia,
      nummidia: nummidia,
      nummatricula: nummatricula,
      numserie: numserie,
      empresaMidia: empresaMidia,
      status: status,
      serie: serie
    });

    document.querySelector(".modal-container").style.display = "none";
    renderTables();
  });

  // Function to render tables
  function renderTables() {
    renderFuncionariosTable();
    renderMidiasTable();
  }

  function renderFuncionariosTable() {
    const tbody = funcionariosTable.querySelector("tbody");
    tbody.innerHTML = "";
    funcionarios.forEach((funcionario, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${funcionario.nome}</td>
        <td>${funcionario.funcao}</td>
        <td>${funcionario.matricula}</td>
        <td>${funcionario.empresa}</td>
        <td class="acao"><button onclick="editFuncionario(${index})">Editar</button></td>
        <td class="acao"><button onclick="deleteFuncionario(${index})">Excluir</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderMidiasTable() {
    const tbody = midiasTable.querySelector("tbody");
    tbody.innerHTML = "";
    midias.forEach((midia, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${midia.tipomidia}</td>
        <td>${midia.nummidia}</td>
        <td>${midia.nummatricula}</td>
        <td>${midia.numserie}</td>
        <td>${midia.empresaMidia}</td>
        <td>${midia.status}</td>
        <td>${midia.serie}</td>
        <td class="acao"><button onclick="editMidia(${index})">Editar</button></td>
        <td class="acao"><button onclick="deleteMidia(${index})">Excluir</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.editFuncionario = function (index) {
    const funcionario = funcionarios[index];
    document.getElementById("m-nome").value = funcionario.nome;
    document.getElementById("m-funcao").value = funcionario.funcao;
    document.getElementById("m-matricula").value = funcionario.matricula;
    document.getElementById("m-empresa").value = funcionario.empresa;

    document.querySelector(".modal-container").style.display = "flex";
    document.getElementById("funcionario-form").style.display = "block";
    document.getElementById("midia-form").style.display = "none";

    funcionarios.splice(index, 1); // Remove item for update, add back on save
  };

  window.deleteFuncionario = function (index) {
    if (confirm("Tem certeza que deseja excluir este funcionário?")) {
      funcionarios.splice(index, 1);
      renderTables();
    }
  };

  window.editMidia = function (index) {
    const midia = midias[index];
    document.getElementById("m-tipomidia").value = midia.tipomidia;
    document.getElementById("m-nummidia").value = midia.nummidia;
    document.getElementById("m-nummatricula").value = midia.nummatricula;
    document.getElementById("m-numserie").value = midia.numserie;
    document.getElementById("m-empresa-midia").value = midia.empresaMidia;
    document.getElementById("m-status").value = midia.status;
    document.getElementById("m-serie").value = midia.serie;

    document.querySelector(".modal-container").style.display = "flex";
    document.getElementById("midia-form").style.display = "block";
    document.getElementById("funcionario-form").style.display = "none";

    midias.splice(index, 1); // Remove item for update, add back on save
  };

  window.deleteMidia = function (index) {
    if (confirm("Tem certeza que deseja excluir esta mídia?")) {
      midias.splice(index, 1);
      renderTables();
    }
  };

  // Initial table render
  renderTables();
});
