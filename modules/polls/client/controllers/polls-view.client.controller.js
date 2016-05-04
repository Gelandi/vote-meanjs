(function () {
  'use strict';

  // View single poll controller

  angular
    .module('polls')
    .controller('PollsViewController', PollsViewController);

  PollsViewController.$inject = ['$scope', '$state', 'Authentication', 'pollResolve'];

  function PollsViewController($scope, $state, Authentication, poll) {
    var vm = this;

    vm.authentication = Authentication;
    vm.poll = poll;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    console.log('currentUser is ' + JSON.stringify(vm.poll.currentUser));
    vm.poll.noOtherVote = checkOtherVote();
    vm.poll.hasVoted = checkVote();

    vm.poll.total_score = vm.poll.option1_score + vm.poll.option2_score;
    vm.poll.style1 = 'width:' + (vm.poll.option1_score / vm.poll.total_score * 100).toString() + '%';
    vm.poll.style2 = 'width:' + (vm.poll.option2_score / vm.poll.total_score * 100).toString() + '%';

    console.log('style1 is ' + vm.poll.style1);
    console.log('style2 is ' + vm.poll.style2);

    function checkOtherVote() {
      var result = true;
      if (vm.poll.votes.length > 0) {
        console.log('other votes length is ' + vm.poll.votes.length);
        if (vm.poll.isCurrentUserOwner) {
          for (var i = vm.poll.votes.length - 1; i >= 0; i--) {
            if (vm.poll.votes[i] !== vm.poll.currentUser) { result = false; }
          }
          console.log('other vote user is ' + vm.poll.currentUser);
        }
      }
      console.log('other vote result is ' + result);
      return result;
    }

    function checkVote() {
      if (vm.poll.votes.length > 0) {
        var result = false;
        console.log('id is ' + JSON.stringify(vm.poll.currentUser));
        console.log('votes are ' + JSON.stringify(vm.poll.votes));
        for (var i = vm.poll.votes.length - 1; i >= 0; i--) {
          if (vm.poll.votes[i] === vm.poll.currentUser) { result = true; }
        }
        console.log('result is ' + result);
        console.log('user is ' + vm.poll.currentUser);
        return result;
      } else {
        return false;
      }
    }

    vm.userVote = function (id) {
      if (id === 1) { vm.poll.option1_score++; }
      if (id === 2) { vm.poll.option2_score++; }
      vm.poll.votes.push(vm.poll.currentUser);
      console.log('votes are ' + JSON.stringify(poll.votes));
      console.log('VOTED!');
      save(true);
    };

    // Remove existing Poll
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.poll.$remove($state.go('polls.list', {}, { reload: true }));
      }
    }

    // Save Poll
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.pollForm');
        console.log('INVALID SAVE!');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.poll._id) {
        vm.poll.$update(successCallback, errorCallback);
      } else {
        vm.poll.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        console.log('successCallback Sucess!');
        $state.go('polls.view', {
          pollId: res._id
        }, { reload: true });
      }

      function errorCallback(res) {
        console.log('ERROR!');
        console.log(res.data.message);
        vm.error = res.data.message;
      }
    }
  }
}());
