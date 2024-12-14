// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title DWINToken
 * @dev ERC-20 Token with mint, burn, pause, and blacklist functionality.
 */
contract DWINToken is ERC20, Ownable, Pausable {
    mapping(address => bool) private _blacklisted;

    // Events
    event Blacklisted(address indexed account);
    event Unblacklisted(address indexed account);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    /**
     * @dev Constructor that initializes the token name and symbol.
     * @param name The name of the token.
     * @param symbol The symbol of the token.
     */
    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {}

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
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Burns tokens from the owner's address.
     * @param amount The amount of tokens to burn.
     */
    function burn(uint256 amount) external onlyOwner whenNotPaused {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Blacklists an address, preventing it from transferring or receiving tokens.
     * @param account The address to blacklist.
     */
    function blacklist(address account) external onlyOwner {
        require(account != address(0), "DWINToken: cannot blacklist the zero address");
        _blacklisted[account] = true;
        emit Blacklisted(account);
    }

    /**
     * @dev Removes an address from the blacklist.
     * @param account The address to remove from the blacklist.
     */
    function unblacklist(address account) external onlyOwner {
        require(_blacklisted[account], "DWINToken: address is not blacklisted");
        _blacklisted[account] = false;
        emit Unblacklisted(account);
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
     * @dev Triggers the paused state.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Returns to the normal state.
     */
    function unpause() external onlyOwner {
        _unpause();
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