(function () {
  'use strict';

  angular
    .module('polls.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('polls', {
        abstract: true,
        url: '/polls',
        template: '<ui-view/>'
      })
      .state('polls.list', {
        url: '',
        templateUrl: 'modules/polls/client/views/list-polls.client.view.html',
        controller: 'PollsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Polls List'
        }
      })
      .state('polls.create', {
        url: '/create',
        templateUrl: 'modules/polls/client/views/form-poll.client.view.html',
        controller: 'PollsEditController',
        controllerAs: 'vm',
        resolve: {
          pollResolve: newPoll
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Polls Create'
        }
      })
      .state('polls.edit', {
        url: '/:pollId/edit',
        templateUrl: 'modules/polls/client/views/form-poll.client.view.html',
        controller: 'PollsController',
        controllerAs: 'vm',
        resolve: {
          pollResolve: getPoll
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Poll {{ pollResolve.title }}'
        }
      })
      .state('polls.view', {
        url: '/:pollId',
        templateUrl: 'modules/polls/client/views/view-poll.client.view.html',
        controller: 'PollsViewController',
        controllerAs: 'vm',
        resolve: {
          pollResolve: getPoll
        },
        data: {
          pageTitle: 'Poll {{ pollResolve.title }}'
        }
      });
  }

  getPoll.$inject = ['$stateParams', 'PollsService'];

  function getPoll($stateParams, PollsService) {
    return PollsService.get({
      pollId: $stateParams.pollId
    }).$promise;
  }

  newPoll.$inject = ['PollsService'];

  function newPoll(PollsService) {
    return new PollsService();
  }
}());
