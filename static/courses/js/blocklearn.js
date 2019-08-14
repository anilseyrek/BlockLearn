function startIntroJS() {
  var stil = document.getElementById("slidess").style.transform; //= "translate(-50%, -50%) scale(0.789943) !important";
  console.log(stil);
  introJs().start();
/*
  var size = getComputedSlideSizeValue();
  // Determine scale of content to fit within available space
  scale = Math.min( size.presentationWidth / size.width, size.presentationHeight / size.height );

  // Respect max/min scale settings
  scale = Math.max( scale, config.minScale );
  scale = Math.min( scale, config.maxScale );*/
  //transformSlides( { layout: ''+ stil +' !important' } );
  //document.getElementById("slidess").style.transform = "translate(-50%, -50%) scale(0.789943) !important";
}

document.addEventListener("exitFromIntro", function(){
  //document.getElementById("slidess").style.position = "";
});
