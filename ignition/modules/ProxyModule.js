const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const proxyModule = buildModule("ProxyModule", (m) => {
    const proxyAdminOwner = m.getAccount(0);

    const token = m.contract("DWINToken");

    const proxy = m.contract("TransparentUpgradeableProxy", [
        token,
        proxyAdminOwner,
        "0x",
    ]);

    const proxyAdminAddress = m.readEventArgument(
        proxy,
        "AdminChanged",
        "newAdmin"
    );

    const proxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);

    return { proxyAdmin, proxy };
});

const tokenModule = buildModule("DWINTokenModule", (m) => {
    const { proxy, proxyAdmin } = m.useModule(proxyModule);

    const token = m.contractAt("DWINToken", proxy);

    return { token, proxy, proxyAdmin };
});