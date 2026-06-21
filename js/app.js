function initializeApp(){

    let config = Storage.load("dezMoedas.config");

    if(!config){
        Storage.save(
            "dezMoedas.config",
            DEFAULT_CONFIG
        );
    }

    let wallets = Storage.load("dezMoedas.wallets");

    if(!wallets){
        Storage.save(
            "dezMoedas.wallets",
            DEFAULT_WALLETS
        );

        wallets = DEFAULT_WALLETS;
    }

    renderWallets(wallets);
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

initializeApp();
