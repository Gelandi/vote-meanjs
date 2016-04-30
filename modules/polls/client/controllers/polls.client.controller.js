(function () {
  'use strict';

  // Polls controller
  angular
    .module('polls')
    .controller('PollsController', PollsController);

  PollsController.$inject = ['$scope', '$state', 'Authentication', 'pollResolve'];

  function PollsController ($scope, $state, Authentication, poll) {
    var vm = this;

    vm.authentication = Authentication;
    vm.poll = poll;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    if (!vm.poll._id){
      vm.poll.options = [{ optionText: 'Poll option #1', optionScore:0 },
                         { optionText: 'Poll option #2', optionScore:0 }];
      console.log('Into New Opt shit');
    }

    vm.addPollOption = function() {
      var i = vm.poll.options.length + 1;
      var t = 'Poll option #'+i;
      vm.poll.options.push({ optionText: t, optionScore:0 });
      console.log('You are tired '+i);

    }

    // Remove existing Poll
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.poll.$remove($state.go('polls.list'));
      }
    }

    // Save Poll
    function save(isValid) {
      console.log('SAVING!');
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.pollForm');
        console.log('INVALID!');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.poll._id) {
        vm.poll.$update(successCallback, errorCallback);
      } else {
        vm.poll.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        console.log('Sucess!');
        $state.go('polls.view', {
          pollId: res._id
        });
      }

      function errorCallback(res) {
        console.log('ERROR!');
        console.log(res.data.message);
        vm.error = res.data.message;
      }
    }
  }
})();
