//add controller
fbook.controller('addController',function($scope,$firebaseArray,$state,recipeService){
    $scope.submitRecipe = function(){
        $scope.newRec = recipeService.all;
        $scope.newRec.$add({
            recipeName: $scope.recName,
            recipeIngredients: $scope.recIngredients,
            recipeDirections: $scope.recDirections,
            recipeImage: $scope.recIamge,
            recipeScore: 0,
            recipeRankCount: 0
        });
        $state.go('home');
    };
});



fbook.controller('listController',function($scope,recipeService){
    $scope.recipes = recipeService.all;
});



fbook.controller('recipeController',function($scope,recipeService,$stateParams,$state){
    $scope.singleRecipe = recipeService.get($stateParams.id);
    $scope.ingList =  $scope.singleRecipe.recipeIngredients.split(';');
    $scope.prepList = $scope.singleRecipe.recipeDirections.split(';');
});

fbook.controller('deleteController',function($scope,recipeService,$firebaseArray,$ionicActionSheet){
	$scope.recs = recipeService.all;

	$scope.showDetails = function(id) {
		$ionicActionSheet.show({
			destructiveText: '刪除',
			titleText: '確認要刪除嗎?',
			cancelText: '取消',
			destructiveButtonClicked: function() {
				var rem = $scope.recs.$getRecord(id);
				$scope.recs.$remove(rem);
				return true;
			}
		});
	};
});







fbook.controller('editController',function($scope,recipeService){
	$scope.editRecipes = recipeService.all;
});

fbook.controller('rankController',function($scope,recipeService){
  $scope.rankrecipes = recipeService.all;
  $scope.number = $scope.rankrecipes.recipeScore;


  console.log($scope.rating);
});

fbook.controller('rankScoreController',function($scope, recipeService,$stateParams,$state){
  $scope.allRecs = recipeService.all;
  $scope.onlyoneRecipe = recipeService.get($stateParams.id);
  $scope.title = $scope.onlyoneRecipe.recipeName;
  $scope.myid = $scope.onlyoneRecipe.$id;
  $scope.image = $scope.onlyoneRecipe.recipeImage;
  $scope.number = $scope.onlyoneRecipe.recipeScore;
  $scope.rankIt = $scope.rankIt;
  $scope.rankCount = $scope.onlyoneRecipe.recipeRankCount;
  $scope.rating = Math.round($scope.number / $scope.rankCount);
  console.log($scope.rating);
  $scope.ratingArr = [{
    value: 1,
    icon: 'ion-ios-star-outline'
  }, {
    value: 2,
    icon: 'ion-ios-star-outline'
  }, {
    value: 3,
    icon: 'ion-ios-star-outline'
  }, {
    value: 4,
    icon: 'ion-ios-star-outline'
  }, {
    value: 5,
    icon: 'ion-ios-star-outline'
  }, {
    value: 6,
    icon: 'ion-ios-star-outlien'
  }, {
    value: 7,
    icon: 'ion-ios-star-outlien'
  }, {
    value: 8,
    icon: 'ion-ios-star-outlien'
  }, {
    value: 9,
    icon: 'ion-ios-star-outlien'
  }, {
    value: 10,
    icon: 'ion-ios-star-outlien'
  }];
    var rtgs = $scope.ratingArr;
    for (var i = 0; i < rtgs.length; i++) {
      if (i < $scope.rating) {
        rtgs[i].icon = 'ion-ios-star';
      } else {
        rtgs[i].icon = 'ion-ios-star-outline';
      } };


  $scope.ScoreRecipe = function(id) {
    var setRank = $scope.allRecs.$getRecord(id);
    setRank.recipeName = $scope.title;
    setRank.recipeScore = parseInt(setRank.recipeScore,10) + parseInt($scope.rankIt,10);
    setRank.recipeRankCount = parseInt(setRank.recipeRankCount,10) + 1 ;
    $scope.allRecs.$save(setRank);

    $state.go('rank');
  };


});

fbook.controller('recipeEditController',function($scope, recipeService, $stateParams, $state){
	$scope.allRecs = recipeService.all;
	$scope.singleRecipe = recipeService.get($stateParams.id);
	$scope.title = $scope.singleRecipe.recipeName;
	$scope.ingredients = $scope.singleRecipe.recipeIngredients;
	$scope.directions = $scope.singleRecipe.recipeDirections;
  $scope.image = $scope.singleRecipe.recipeImage;
	$scope.myid = $scope.singleRecipe.$id;
	$scope.updateRecipe = function(id) {
		var ed = $scope.allRecs.$getRecord(id);
		ed.recipeName = $scope.title;
		ed.recipeIngredients = $scope.ingredients;
		ed.recipeDirections = $scope.directions;
    ed.recipeImage = $scope.image;
		$scope.allRecs.$save(ed);
		$state.go('edit');
	};
});








