(function(){
  //essa forma significa que não pertence ao escopo global, 
  angular.module('primeiraApp').controller('DashboardCtrl', [
     '$http',
      DashboardController
    ])
    
    function DashboardController( $http) {
      const vm = this
      vm.getSummary = function(){
      
        const url = 'http://localhost:3003/api/billingSummary'
        $http.get(url).then(function(response) {
          const {credit = 0, debt = 0} = response.data 
          //funcionou com o codigo abaixo tambem do curso
          //var data = response.data
          vm.credit = credit
          vm.debt = debt
          vm.total = credit - debt
        })
      }
    
      vm.getSummary()
    }
})()

