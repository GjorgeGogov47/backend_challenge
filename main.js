function testing(){
    let order_rating = document.getElementById('order_rating').value;
    let min_rating = document.getElementById('min_rating').value;
    let by_date = document.getElementById('by_date').value;
    let priority_text = document.getElementById('priority_text').value;

    let requestURL = 'https://raw.githubusercontent.com/GjorgeGogov47/backend_challenge/main/reviews.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    let odgovor;
    request.onload = function() {
      const odgovor = request.response;
      console.log("Unsorted");
      console.log(odgovor);
      const izlez = filtriranje(odgovor, order_rating,min_rating,by_date,priority_text);
      prikaz(izlez);
    }
}

function filtriranje(obj, order_rating, min_rating, by_date, priority_text){
  let izlez = JSON.parse(JSON.stringify(obj));
  let i =0;

  //Removal
  while(i < izlez.length){
    if(izlez[i].rating<min_rating){
      izlez.splice(i,1);
    }
    else{i++;}
  }

  //Sorting
  if(by_date=='Newest First'){izlez.sort( compare_date );}
  else{izlez.sort( compare_date1 );}
  if(order_rating=='Highest First'){izlez.sort( compare_rating );}
  else{izlez.sort( compare_rating1 );}
  if(priority_text=='Yes'){izlez.sort( prioritet );}

  console.log("Sorted");
  console.log(izlez);
  return izlez;
}

//Copypasta
function compare_rating( a, b ) {
  if ( a.rating > b.rating ){
    return -1;
  }
  if ( a.rating < b.rating ){
    return 1;
  }
  return 0;
}
function compare_rating1( a, b ) {
  if ( a.rating < b.rating ){
    return -1;
  }
  if ( a.rating > b.rating ){
    return 1;
  }
  return 0;
}
function compare_date( a, b ) {
  if ( a.reviewCreatedOnTime > b.reviewCreatedOnTime ){
    return -1;
  }
  if ( a.reviewCreatedOnTime < b.reviewCreatedOnTime ){
    return 1;
  }
  return 0;
}
function compare_date1( a, b ) {
  if ( a.reviewCreatedOnTime > b.reviewCreatedOnTime ){
    return -1;
  }
  if ( a.reviewCreatedOnTime < b.reviewCreatedOnTime ){
    return 1;
  }
  return 0;
}
function prioritet( a, b ) {
  if ( a.reviewFullText > b.reviewFullText ){
    return -1;
  }
  if ( a.reviewFullText < b.reviewFullText ){
    return 1;
  }
  return 0;
}


function prikaz(obj){
  let lista = document.getElementById('myList');
  for(let i =0;i<obj.length;i++){
    let node = document.createElement("LI");
    let textNode = document.createTextNode(JSON.stringify(obj[i]));
    node.appendChild(textNode);
    document.getElementById("myList").appendChild(node);
  }
}

