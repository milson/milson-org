---
  title: NodeJS
  id: nodejs
---

The documentation platform runs on Linux, OS X, and Windows using NodeJS.

### Try this first

Download the NodeJS installer <http://nodejs.org/#download> for OS X or Windows.

### Ubuntu Linux (Terminal)

    # To add the nodejs repositories to apt-get
    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update

    # Install NodeJS
    sudo apt-get install nodejs

### Apple OS X (Terminal)

    # To install `brew`, the OS X package manager
    /usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"

    # Install NodeJS
    brew install node

### Windows (PowerShell)

    # To install Chocolatey, the Windows package manager
    Set-ExecutionPolicy Unrestricted
    iex ((new-object net.webclient).DownloadString("http://bit.ly/psChocInstall"))

    # Install NodeJS
    cinst nodejs
