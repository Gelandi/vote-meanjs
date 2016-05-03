(function () {
  'use strict';

  describe('Polls Route Tests', function () {
    // Initialize global variables
    var $scope,
      PollsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PollsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PollsService = _PollsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('polls');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/polls');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('polls.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have template', function () {
          expect(liststate.templateUrl).toBe('modules/polls/client/views/list-polls.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PollsController,
          mockPoll;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('polls.view');
          $templateCache.put('modules/polls/client/views/view-poll.client.view.html', '');

          // create mock poll
          mockPoll = new PollsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Poll about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          PollsController = $controller('PollsController as vm', {
            $scope: $scope,
            pollResolve: mockPoll
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:pollId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.pollResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            pollId: 1
          })).toEqual('/polls/1');
        }));

        it('should attach an poll to the controller scope', function () {
          expect($scope.vm.poll._id).toBe(mockPoll._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/polls/client/views/view-poll.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PollsController,
          mockPoll;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('polls.create');
          $templateCache.put('modules/polls/client/views/form-poll.client.view.html', '');

          // create mock poll
          mockPoll = new PollsService();

          // Initialize Controller
          PollsController = $controller('PollsController as vm', {
            $scope: $scope,
            pollResolve: mockPoll
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.pollResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/polls/create');
        }));

        it('should attach an poll to the controller scope', function () {
          expect($scope.vm.poll._id).toBe(mockPoll._id);
          expect($scope.vm.poll._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/polls/client/views/form-poll.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PollsController,
          mockPoll;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('polls.edit');
          $templateCache.put('modules/polls/client/views/form-poll.client.view.html', '');

          // create mock poll
          mockPoll = new PollsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Poll about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          PollsController = $controller('PollsController as vm', {
            $scope: $scope,
            pollResolve: mockPoll
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:pollId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.pollResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            pollId: 1
          })).toEqual('/polls/1/edit');
        }));

        it('should attach an poll to the controller scope', function () {
          expect($scope.vm.poll._id).toBe(mockPoll._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/polls/client/views/form-poll.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope) {
          $state.go('polls.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('polls/');
          $rootScope.$digest();

          expect($location.path()).toBe('/polls');
          expect($state.current.templateUrl).toBe('modules/polls/client/views/list-polls.client.view.html');
        }));
      });

    });
  });
}());
