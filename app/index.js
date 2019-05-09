angular.module('primeiraApp', [
    'ui.router',
    'ngAnimate',
    'toastr'
    /**
     * ui-router é para sempre que navegar de uma pagina para outra, ele vai atualizar index.html
     * toastr serve para exibir mensagens ao usuario, ex: cadastro realizado com sucesso.
     * caso esteja aparecendo a tela anterior durante a mudança de paginas por alguns instantes, basta comentar o ngAnimate
     */
  ])