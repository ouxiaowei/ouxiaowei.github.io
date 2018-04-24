
/*  模态层    */
function model(){
	var oM = document.createElement('div');
	oM.className = "model";
	oM.style.width = document.documentElement.clientWidth+"px";
	oM.style.height=document.documentElement.clientHeight+"px";
	document.body.appendChild(oM);
	return oM;
};
/*  居中显示    */
function showCenter(obj){
	obj.style.display="block";		//防止隐藏时读取不到宽度
	function center(){
		obj.style.left = (document.documentElement.clientWidth - obj.offsetWidth) /2 + "px";
		obj.style.top = (document.documentElement.clientHeight - obj.offsetHeight) /2 + "px";
	};
	center();
	window.onreset = center();
}
/*  拖拽    */
function drag(obj,title){
	title = title || obj;
	title.onmousedown = function(ev){
		var m_l = ev.clientX - oBox.offsetLeft;
		var m_t = ev.clientY - oBox.offsetTop;
		
		document.onmousemove = function(ev){
			var l = ev.clientX-m_l;
			var t = ev.clientY-m_t;
			if(l<0){l=0}
			if(t<0){t=0}
			if(l>document.documentElement.clientWidth-oBox.offsetWidth){l=document.documentElement.clientWidth-oBox.offsetWidth}
			if(t>document.documentElement.clientHeight-oBox.offsetHeight){t=document.documentElement.clientHeight-oBox.offsetHeight}
			oBox.style.left = l +"px";
			oBox.style.top = t +"px";
			//ev.preventDefault();
		};
		document.onmouseup = function(){
			console.log(1)
			document.onmouseup = document.onmousemove = null;
		}
		//ev.preventDefault();
	};	
	document.onmousedown = function(ev){
		ev.preventDefault();
	};
};
/*  抖动    */
function shake(obj,num,direction,fn){
	num =num || 20;
	var objPosition ;
	objPosition=direction == "left"? obj.offsetLeft : obj.offsetTop;
	console.log(objPosition)
	var arr = [];
	for(var i=num;i>0; i-=2){
		arr.push(i);
		arr.push(-i);
	};
	arr.push(0);
	var arrL = arr.length;
	var n=0;
	clearInterval(timer);
	var timer = setInterval(function(){
		obj.style[direction] = objPosition+arr[n] + "px";
		n++;
		if(n==arrL){
			clearInterval(timer);
			n=0;
			fn&&fn();
		}
	},30)
};