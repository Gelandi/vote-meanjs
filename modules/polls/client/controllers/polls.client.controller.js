(function () {
  'use strict';

  angular
    .module('polls')
    .controller('PollsController', PollsController);

  PollsController.$inject = ['$scope', '$state', 'pollResolve', '$window', 'Authentication'];

  function PollsController($scope, $state, poll, $window, Authentication) {
    var vm = this;

    vm.poll = poll;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Poll
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.poll.$remove($state.go('polls.list'));
      }
    }

    // Save Poll
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.pollForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.poll._id) {
        vm.poll.$update(successCallback, errorCallback);
      } else {
        vm.poll.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('polls.view', {
          pollId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
