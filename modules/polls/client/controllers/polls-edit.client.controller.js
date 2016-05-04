(function () {
  'use strict';

  // Polls controller
  angular
    .module('polls')
    .controller('PollsEditController', PollsEditController);

  PollsEditController.$inject = ['$scope', '$state', 'Authentication', 'pollResolve'];

  function PollsEditController($scope, $state, Authentication, poll) {
    var vm = this;

    vm.authentication = Authentication;
    vm.poll = poll;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.checkDropOption = function () {
      if (vm.poll.optionsArray.length > 2) {
        return true;
      } else {
        return false;
      }
    };

    if (!vm.poll._id) {
      // vm.poll._id = 'new';
      vm.poll.optionsArray = [{ optionText: '', optionScore: 0 },
        { optionText: '', optionScore: 0 }
      ];
      console.log('Into New Poll shit');
    }

    vm.pollFormInit = function () {
      // vm.poll._id = 'new';
      vm.poll.optionsArray = [{ optionText: '', optionScore: 0 },
        { optionText: '', optionScore: 0 }
      ];
      vm.poll.question = '';
      console.log('Into New Poll shit');
    };

    vm.addPollOption = function () {
      vm.poll.optionsArray.push({ optionText: '', optionScore: 0 });
      console.log(JSON.toString(vm.poll.pollForm));

    };

    vm.dropPollOption = function (id) {
      console.log('drop option id is ' + id);
      if (id > -1) {
        vm.poll.optionsArray.splice(id, 1);
      }
    };

    // vm.pickDate.numbers = [1,2,3,4,5,10,15,20,30,45,60,80,100];

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
}());
