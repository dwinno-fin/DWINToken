// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "hardhat/console.sol";

/**
 * @title DWINToken
 * @dev ERC-20 Token with mint, burn, pause, and blacklist functionality.
 */
contract DWINTokenV2 is ERC20, Ownable, Pausable {
    mapping(address => bool) private _blacklisted;

    /**
     * @dev Constructor that initializes the token name and symbol.
     * @param name The name of the token.
     * @param symbol The symbol of the token.
     */
    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {
        console.log("Create From: ", msg.sender);
    }

    /**
     * @dev Modifier to check if the address is blacklisted.
     * @param account The address to check.
     */
    modifier notBlacklisted(address account) {
        require(!_blacklisted[account], "DWINToken: address is blacklisted");
        _;
    }

    /**
     * @dev Mints new tokens to the specified address.
     * @param to The address to mint tokens to.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) external onlyOwner whenNotPaused notBlacklisted(to) {
        console.log("Mint From: ", msg.sender);
        _mint(to, amount);
    }

    /**
     * @dev Burns tokens from the owner's address.
     * @param amount The amount of tokens to burn.
     */
    function burn(uint256 amount) external onlyOwner whenNotPaused {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Blacklists an address, preventing it from transferring or receiving tokens.
     * @param account The address to blacklist.
     */
    function blacklist(address account) external onlyOwner {
        _blacklisted[account] = true;
    }

    /**
     * @dev Removes an address from the blacklist.
     * @param account The address to remove from the blacklist.
     */
    function unblacklist(address account) external onlyOwner {
        _blacklisted[account] = false;
    }

    /**
     * @dev Checks if an address is blacklisted.
     * @param account The address to check.
     * @return True if the address is blacklisted, false otherwise.
     */
    function isBlacklisted(address account) external view returns (bool) {
        return _blacklisted[account];
    }

    /**
     * @dev Overrides the `transfer` function to include blacklist and pause checks.
     * @param to The address to transfer tokens to.
     * @param amount The amount of tokens to transfer.
     */
    function transfer(address to, uint256 amount) public override whenNotPaused notBlacklisted(msg.sender) notBlacklisted(to) returns (bool) {
        return super.transfer(to, amount);
    }

    /**
     * @dev Overrides the `transferFrom` function to include blacklist and pause checks.
     * @param from The address transferring tokens.
     * @param to The address receiving tokens.
     * @param amount The amount of tokens to transfer.
     */
    function transferFrom(address from, address to, uint256 amount) public override whenNotPaused notBlacklisted(from) notBlacklisted(to) returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}