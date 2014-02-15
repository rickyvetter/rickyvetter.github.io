---
layout: project
title:  "Bikes for Books"
date:   2014-02-01 16:58:00
categories: projects
company: Bikes for Books
role: Web Development
skills: "WordPress, PHP, JavaScript, CSS"
icon: desktop
excerpt: "<p>The Bikes for Books website was created to help the launch of the Chicago-based non-profit. The site uses a heavily modified default WordPress theme and a number of plugins to create a custom look and feel.</p>"
---

<article>
	<div class="title-and-info">
		<h2>About</h2>
	</div>
	<div class="content">
		<p>The Bikes for Books website was created to help the launch of the Chicago-based non-profit. The site uses a heavily modified default WordPress theme and a number of plugins to create a custom look and feel.</p>
	</div>
</article>
<article>
	<div class="title-and-info">
		<h2>Pictures</h2>
	</div>
	<div class="content">
	    <div id="b4b-pics" class="owl-carousel"></div>
	</div>
</article>



<style type="text/css">
.owl-carousel .item{
background: #a1def8;
padding: 30px 0px;
display: block;
margin: 5px;
color: #FFF;
-webkit-border-radius: 3px;
-moz-border-radius: 3px;
border-radius: 3px;
text-align: center;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {
     
    $("#b4b-pics").owlCarousel({
    jsonPath : '/json/b4b-pics.json',
    jsonSuccess : customDataSuccess
    });
     
    function customDataSuccess(data){
    var content = "";
    for(var i in data["items"]){
    var img = data["items"][i].img;
    var alt = data["items"][i].alt;
     
    content += "<img src=\"" +img+ "\" alt=\"" +alt+ "\">"
    }
    $("#owl-demo").html(content);
    }
     
    });
</script>

