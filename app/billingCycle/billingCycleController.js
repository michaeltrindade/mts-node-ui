(function(){
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = function() {
            const page = parseInt($location.search().page) || 1
            //abaixo havera uma pequena mudança para que a paginação seja concluida. onde era assim: $http.get(url).then(function(response){
            $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response){
                //console.log(response)
                vm.billingCycle = { credits: [{}], debts: [{}]}
                vm.billingCycles = response.data
                vm.calculateValues()
                

                //o metodo abaixo servirá para me retornar o total de paginação, 
                //para isso irei no arquivo routes.js na linha 9 que antes era assim: url: "/billingCycles", fica assim: url: "/billingCycles?pages"
                // e aqui no meu controller vou add uma nova injeção de dependencia '$location' e depois add como parametro do controller
                $http.get(`${url}/count`).then(function(response){
                    vm.pages = Math.ceil(response.data.value / 10)
                    tabs.show(vm, {tabList: true, tabCreate: true})
                    //console.log('pages =', vm.pages)
                })
            })
        }

        vm.create = function(){
            
            $http.post(url, vm.billingCycle)
            .then(function(response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
                //console.log('Sucesso!')
            })
            .catch(function(response){
                msgs.addError(response.data.errors)
                //console.log(response.data.errors)
            })
        }

        vm.showTabUpdate = function(billingCycle) {
            // este método vai receber como parametro a linha atual billingCycle, agora para que esse botão funcione eu vou dentro da lista e incluo a seguinte linha de codigo ng-click="bcCtrl.showUpdate(billingCycle)"
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(billingCycle) {
            // este método vai receber como parametro a linha atual billingCycle
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, {tabDelete: true})
        }

        vm.update = function(){
            const updateUrl = `${url}/${vm.billingCycle._id}`
            $http.put(updateUrl, vm.billingCycle).then(function(response){
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
                //console.log(response.data.errors)
            })
        }

        //agora vamos linkar a chamada desta função com o formulario (form.html) que tem a função delete inserindo o codigo ng-click="bcCtrl.delete()"
        vm.delete = function(){
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then(function(response){
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
                //console.log(response.data.errors)
            })
        }
        // depois de finalizar esses metodos irei linkar com meu arquivo credits.html e debts.html
        vm.addCredit = function(index){
            vm.billingCycle.credits.splice(index + 1, 0, {})
        }

        vm.cloneCredit = function(index, {name, value}){
            vm.billingCycle.credits.splice(index + 1, 0, {name, value})
            vm.calculateValues()
        }
        // obs: só vai excluir se tiver pelo menos dois elementos cadastrados
        vm.deleteCredit = function(index){
            if(vm.billingCycle.credits.length > 1){
                vm.billingCycle.credits.splice(index, 1)
                vm.calculateValues()
            }
        }

        vm.addDebt = function(index){
            vm.billingCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status}){
            vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
            vm.calculateValues()
        }

        vm.deleteDebt = function(index){
            if(vm.billingCycle.debts.length > 1){
                vm.billingCycle.debts.splice(index, 1)
                vm.calculateValues()
            }
        }

        vm.calculateValues = function(){
            vm.credit = 0
            vm.debt = 0

            if(vm.billingCycle){
                vm.billingCycle.credits.forEach(function({value}) {
                  vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)  
                })
                vm.billingCycle.debts.forEach(function({value}){
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
                })
            }

            vm.total = vm.credit - vm.debt
            //agora pra finalizar esse metodo eu vou chama-lo dentro do meu método refresh, 
            //cloneCredit, deleteCredit, cloneDebt, deleteDebt e para fazer esse calculo eu 
            //tambem preciso ir na lista de creditList.html e debtList.html e  incluir ng-change="bcCtrl.calculateValues()" 
            //para que sempre que eu estiver inserindo o valor ele já vai atualizando
        }

        vm.refresh()
    }
})()