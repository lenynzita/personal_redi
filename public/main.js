// Worked with Abdullahi Ali

var trash = document.getElementsByClassName("fa-trash-o");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const country = this.parentNode.parentNode.childNodes[3].innerText
    const club = this.parentNode.parentNode.childNodes[5].innerText
    const goals = this.parentNode.parentNode.childNodes[7].innerText
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleteName: name,
        deleteCountry: country,
        deleteClub: club,
        deleteGoals: goals
      }),
    }).then(function (response) {
      window.location.reload()
    })
  });
});










