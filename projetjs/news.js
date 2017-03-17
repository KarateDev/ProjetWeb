var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	var chaine = $("#zone_saisie").val();
	console.log(chaine);
	if(recherches.indexOf(chaine) == -1){
		recherches.push(chaine);
		var recherche = $('<p/>');
		recherche.attr('class','titre-recherche');
		recherche.append($('<label/>',{text:chaine,onclick:'selectionner_recherche(this)'}));
		recherche.append($('<img/>',{src:'croix30.jpg',class:'icone-croix',onclick:'supprimer_recherche(this)'}));
		$("#recherches-stockees").append(recherche);
		$("#zone_saisie").val("");
		save_cookies();
	}



}

function supprimer_recherche(e)
{
	$(e).parent().remove();
	recherches.splice(recherches.indexOf($(e).parent().find("label").text()),1);
	save_cookies();
}

function save_cookies(){
	 recherchesJSON = JSON.stringify(recherches);
	 $.cookie('recherches',recherchesJSON,{expires: 1000});
}


function selectionner_recherche(e)
{
	recherche_courante = $(e).text();
	$("#zone_saisie").val($(e).text());
}


function init()
{
	if($.cookie("recherches") != undefined){
		recherches = JSON.parse($.cookie("recherches"));
	}
	for ( i = 0 ; i < recherches.length; i++ ){
		chaine = recherches[i];
		var recherche = $('<p/>');
		recherche.attr('class','titre-recherche');
		recherche.append($('<label/>',{text:chaine,onclick:'selectionner_recherche(this)'}));
		recherche.append($('<img/>',{src:'croix30.jpg',class:'icone-croix',onclick:'supprimer_recherche(this)'}));
		$("#recherches-stockees").append(recherche);
		save_cookies();
	}
	$('#zone_saisie').val("");
}


function recherche_nouvelles()
{
	$('#resultats').children().remove();
	$('#wait').css('display','block');
	var url = "search.php?data="+$("#zone_saisie").val();
	$.get(url,function(data){
		maj_resultats(data);
	});

}


function maj_resultats(res)
{
	$('#wait').css('display','none');
	res = JSON.parse(res);
	for(r in res){
		var paragraph = $('<p/>');
		paragraph.attr('class','titre_result');
		paragraph.append($('<a/>',{class:'titre_news',href:res[r].url,target:'_blank',text:res[r].titre}));
		paragraph.append($('<span/>',{class:'date_news',text:format(res[r].date)}));
		var span = $('<span/>',{class:'action_news',onclick:'sauve_news(this)'});
		span.append($('<img/>',{src:'horloge15.jpg'}));
		paragraph.append(span);
		$('#resultats').append(paragraph);
	}
}


function sauve_news(e)
{
	var parent = $(e).parent();
	parent.find('img').attr('src','disk15.jpg');
	parent.find('img').parent().attr('onclick','supprime_news');
	var element = {url:parent.find('a').attr('href'),titre:parent.find('a').text(),date:parent.find('span').text()};
	if(recherche_courante_news.indexOf(element) == -1){
		recherche_courante_news.push(element);
	}
	recherchesJSON = JSON.stringify(recherche_courante_news);
	$.cookie('recherche_courante_news',recherchesJSON,{expires: 1000});
}


function supprime_news(e)
{

}
