(function () {

  let searchQuery = "";
  let displayThreshold=4;
  const API_ID = '385c620c';
  const API_KEY = "2ab3737a884c056d1768e98eee1d0087";

  const FIRST_HALF_URL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
  const SECOND_HALF_URL= "&app_id="+API_ID+"&app_key="+API_KEY;

  let resultsToHide;
  let returnedRecipes;

  document.getElementById("toggleDisplayAllResults").style.display='none';
  document.getElementById("infoParent").style.display='none';

  searchText.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    callAPI();
  	document.getElementById("infoParent").style.display='none';
  });

  async function callAPI(){
  	const apiURLPath=FIRST_HALF_URL+searchQuery+SECOND_HALF_URL;
  	const response = await fetch(apiURLPath);
  	const data = await response.json();
  	returnedRecipes=data.hits;
  	utilizeAPIResponse(data.hits);
  }

  function utilizeAPIResponse(results){
  	console.log("hello");
  	let generatedData = "";
  	let counter = 0;
  	let oddOrEven="";

    results.map((result) => {
    	if(counter%2==0){oddOrEven="evenItem"}
    	else{oddOrEven="oddItem"}

    	if(counter<displayThreshold){
      generatedData += `
	  <div class="item alwaysShow `+oddOrEven+`">
	    <h2 class="recipe-title">${result.recipe.label}</h2>
	  	<img src="${result.recipe.image}">
	    <div class="flex-container anchor-left">
	    <a class="buttonDesign anchor-left" href="${result.recipe.url}" target="_blank">View Recipe</a>
	    <a class="buttonDesign anchor-right" id="`+counter+`">Nutrition & Ingredients</a>
	  </div>
	  </div>`;
	}
	else{
      generatedData += `
	  <div class="item toggleShow `+oddOrEven+`" >
	    <h2 class="recipe-title">${result.recipe.label}</h2>
	  <img src="${result.recipe.image}">
	    <div class="flex-container">
	    <a class="buttonDesign anchor-left" href="${result.recipe.url}" target="_blank">View Recipe</a>
	    <a class="buttonDesign anchor-right" id="`+counter+`">Nutrition & Ingredients</a>
	  </div>
	  </div>`;
	}
	counter++;
    });
    searchResultsContainer.innerHTML = generatedData;
    let resultsToHide=document.getElementsByClassName("toggleShow");
    for(let entry of resultsToHide){
    	entry.style.display='none';
    }
  	document.getElementById("toggleDisplayAllResults").style.display="block";

	  try{
	  	document.getElementById('0').onclick=updateNutritionBox;
	  	document.getElementById('1').onclick=updateNutritionBox;
	  	document.getElementById('2').onclick=updateNutritionBox;
	  	document.getElementById('3').onclick=updateNutritionBox;
	  	document.getElementById('4').onclick=updateNutritionBox;
	  	document.getElementById('5').onclick=updateNutritionBox;
	  	document.getElementById('6').onclick=updateNutritionBox;
	  	document.getElementById('7').onclick=updateNutritionBox;
	  	document.getElementById('8').onclick=updateNutritionBox;
	  	document.getElementById('9').onclick=updateNutritionBox;
	  	document.getElementById('10').onclick=updateNutritionBox;
	  	document.getElementById('11').onclick=updateNutritionBox;
	  	document.getElementById('12').onclick=updateNutritionBox;
	  	document.getElementById('13').onclick=updateNutritionBox;
	  	document.getElementById('14').onclick=updateNutritionBox;
	  	document.getElementById('15').onclick=updateNutritionBox;
	  	document.getElementById('16').onclick=updateNutritionBox;
	  	document.getElementById('17').onclick=updateNutritionBox;
	  	document.getElementById('18').onclick=updateNutritionBox;
	  	document.getElementById('19').onclick=updateNutritionBox;  
	  }
	  catch(e){
	  	console.log(e);
	  }
  }

  let clicked=false;
  document.getElementById("toggleDisplayAllResults").addEventListener("click", function(){
  		if(!clicked){
  			let resultsToShow=document.getElementsByClassName("toggleShow");
		    for(let entry of resultsToShow){
		    	entry.style.display='block';
		    }
		    clicked=true;
		    document.getElementById("toggleDisplayAllResults").innerHTML="Less Results";
  		}
  		else{
  			let resultsToHide=document.getElementsByClassName("toggleShow");
		    for(let entry of resultsToHide){
		    	entry.style.display='none';
		    }
		    clicked=false;
		    document.getElementById("toggleDisplayAllResults").innerHTML="More Results";
  		}
  })
/*
	   <p class="calories">Calories: ${result.recipe.calories.toFixed(2)}</p>
	   <p class="fat">Fat: ${result.recipe.digest[0].total.toFixed(2)}</p>
	   <p class="protein">Protein: ${result.recipe.digest[2].total.toFixed(2)}</p>
	   <p class="carbs">Carbohydrates: ${result.recipe.digest[1].total.toFixed(2)}</p>
*/

  const updateNutritionBox = function(){
  	console.log("This is the button that triggered me: "+this.id);
  	console.log(returnedRecipes[this.id].recipe.calories.toFixed(2))
  	document.getElementById("infoParent").style.display="flex";
  	console.log(returnedRecipes[this.id])
  	let newNutritionalData=`
  		<p id="calories">Calories: ${returnedRecipes[this.id].recipe.calories.toFixed(2)}</p>
  	`
  	for(let entry of returnedRecipes[this.id].recipe.digest){
  		try{
  			newNutritionalData+="<p id=\""+entry.label+"\">"+entry.label+": "+entry.total.toFixed(2)+"</p>"
  		}
  		catch(e){

  		}
  	}
  	document.getElementById("nutritionInfoHere").innerHTML=newNutritionalData;

  	let ingredientData="";
  	let index=0;
  	for(let entry of returnedRecipes[this.id].recipe.ingredients){
  		try{
  			ingredientData+="<p id=\"ingredient-"+index+"\">"+entry.text+"</p>"
  		}
  		catch(e){}
  	}
  	document.getElementById("ingredientInfoHere").innerHTML=ingredientData;
  }
})();