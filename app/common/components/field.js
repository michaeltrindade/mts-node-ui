(function(){
    //criando o componente do meu formulario
    angular.module('primeiraApp').component('field',{
        bindings: {
            id: '@',
            label: '@',
            grid: '@',
            placeholder: '@',
            type: '@',
            model: '=',
            readonly: '<',
        },
        //fazendo a injeção de dependencia chamando meu controller, isso irá converter o meu parametro grid em classes CSS do bootstrap
        controller: [
            'gridSystem',
            function(gridSystem){
                this.$onInit = function(){
                    this.gridClasses = gridSystem.toCssClasses(this.grid)
                    //ao usar o metodo onInit eu estou garantindo que só vai executar a minha função => depois que garantir meu bindings estiver .
                }
                
            }
        ],
        // ao usar o comando ng-readonly="$ctrl.readonly" estou dizendo que ele suporte readonly e quando for fazer uma exclusão, não será possivel editar. agora bas eu ir no form.html e incluir o codigo readonly="bcCtrl.delete"
        template: `
            <div class="{{ $ctrl.gridClasses }}">
                <div class="form-group">
                    <label for="{{ $ctrl.id }}">{{ $ctrl.label}}</label>
                    <input id="{{ $ctrl.id}}" class="form-control" placeholder="{{$ctrl.placeholder}}" 
                    type="{{ $ctrl.type}}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly"/>
            
                </div>            
            </div>
        `
    })
})()