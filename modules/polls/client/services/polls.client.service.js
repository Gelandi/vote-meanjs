(function () {
  'use strict';

  angular
    .module('polls.services')
    .factory('PollsService', PollsService);

  PollsService.$inject = ['$resource'];

  function PollsService($resource) {
    return $resource('api/polls/:pollId', {
      pollId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
