function initializeApp(){

    let config =
        Storage.load("dezMoedas.config");

    if(!config){

        Storage.save(
            "dezMoedas.config",
            DEFAULT_CONFIG
        );

        config = DEFAULT_CONFIG;
    }

    let wallets =
        Storage.load("dezMoedas.wallets");

    if(!wallets){

        Storage.save(
            "dezMoedas.wallets",
            DEFAULT_WALLETS
        );

        wallets = DEFAULT_WALLETS;
    }

    renderWallets(wallets);
    updateDashboard();
}

function renderWallets(wallets){

    const walletList =
        document.getElementById("walletList");

    walletList.innerHTML = "";

    wallets.forEach(wallet => {

        walletList.innerHTML += `
        <div class="wallet">
            <div class="wallet-name">
                ${wallet.name}
            </div>

            <div class="wallet-balance">
                ${(wallet.balance / 100).toFixed(2)} €
            </div>
        </div>
        `;

    });

}

function addSalary(){

    Number(
        document
            .getElementById("salaryInput")
            .value
    );

    if(!value || value <= 0){
        alert("Valor inválido");
        return;
    }

    const config =
        Storage.load("dezMoedas.config");

    const wallets =
        Storage.load("dezMoedas.wallets");

    const salaryCents =
        Math.round(value * 100);

    const house =
        config.houseAmount;

    let remaining =
        salaryCents - house;

    if(remaining < 0){
        remaining = 0;
    }

    wallets[0].balance += Math.round(remaining * 0.15);
    wallets[1].balance += Math.round(remaining * 0.05);
    wallets[2].balance += Math.round(remaining * 0.30);
    wallets[3].balance += Math.round(remaining * 0.30);
    wallets[4].balance += Math.round(remaining * 0.10);
    wallets[5].balance += Math.round(remaining * 0.10);

    Storage.save(
        "dezMoedas.wallets",
        wallets
    );

    let income =
        Storage.load("dezMoedas.income") || 0;

    income += salaryCents;

    Storage.save(
        "dezMoedas.income",
        income
    );

    document.getElementById(
        "salaryInput"
    ).value = "";

    renderWallets(wallets);
    updateDashboard();
}

function updateDashboard(){

    const income =
        Storage.load("dezMoedas.income") || 0;

    const wallets =
        Storage.load("dezMoedas.wallets") || [];

    let netWorth = 0;

    wallets.forEach(wallet => {
        netWorth += wallet.balance;
    });

    document.getElementById(
        "incomeTotal"
    ).textContent =
        (income / 100).toFixed(2) + " €";

    document.getElementById(
        "netWorth"
    ).textContent =
        (netWorth / 100).toFixed(2) + " €";
}

initializeApp();
