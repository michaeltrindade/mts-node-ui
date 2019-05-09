    
angular.module('primeiraApp').component('valueBox', {
    bindings: {
      grid: '@',
      colorClass: '@',
      value: '@',
      text: '@',
      iconClass: '@',
    },
    controller: [
      'gridSystem',
      function(gridSystem) {
        this.$onInit = function(){
          this.gridClasses = gridSystem.toCssClasses(this.grid)
        //ao usar o metodo onInit eu estou garantindo que só vai executar a minha função => depois que garantir meu bindings estiver .
        }
        
      }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
      <div class="small-box {{ $ctrl.colorClass }}">
        <div class="inner">
          <h3>{{ $ctrl.value }}</h3>
          <p>{{ $ctrl.text }}</p>
        </div>
        <div class="icon">
          <i class="{{ $ctrl.iconClass }}"></i>
        </div>
      </div>
    </div>
    `
  });