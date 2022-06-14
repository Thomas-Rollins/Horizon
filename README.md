# Horizon

A small discord bot which records deleted and modified messages (perserving original text) and displays an embedded message in a configured channel to display the corresponding information. Supports slash commands to allow users to change their display name colour via a pre-configured list of 'colour roles'.

## Currently Implemented Commands
### Slash Commands

- /setcolour
  - Allows a user to choose (or remove) a colour role.

### Simple Commands
- time
  - Displays the current time in the format `dd/MM/yyy HH:mm:ss zzzz`
  #
- calc `<expression>`
  - calculates the given expression. Supports basic linear algebraic operations, basic calculus operations, and basic operations. 