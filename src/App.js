App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const smart = await $.getJSON('smartcontract.json')
    App.contracts.smartcontract = TruffleContract(smart)
    App.contracts.smartcontract.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.smart = await App.contracts.smartcontract.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Attendance
    await App.renderAttendance()

    // Update loading state
    App.setLoading(false)
  },

  renderAttendance: async () => {
    // Load the total attendance count from the blockchain
    const bookcount = await App.smart.bookcount()
    const $bookTemplate = $('.bookTemplate')

    // Render out each attendance with a new attendance template
    for (var i = 1; i <= bookcount; i++) {
      // Fetch the attendance data from the blockchain
      const at = await App.smart.books(i)
      const atbookid = at[0].toNumber()
      const bookname = at[1]
      const rent = at[2];
      const borrower = at[3]

      // Create the html for the attendance
      const $newbookTemplate = $bookTemplate.clone()
      $newbookTemplate.find('.bookname').html(name)
      $newbookTemplate.find('.borrower').html(borrower)
      $newbookTemplate.find('.rent').html(rent)

      // Put the attendance in the correct list
      $('#bookList').append($newbookTemplate)

      // Show the attendance
      $newbookTemplate.show()
    }
  },

  recordbook: async () => {
   
    const bookount = await App.attendanceApp.bookcount()

    for (var j = 1; j <= bookcount; j++) {
      const at = await App.smart.books(j)
      if(at[2] == App.account) {
        alert("book is already rented")
        window.location.reload()
        return;
      }
    }

    
    const bookname = $('#bookname').val()
    await App.smart.recordbook(bookname,rent)
    window.location.reload()
  },

 
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
