var Kylin = {}
Kylin.chart=function(){
	var $ = function(id){return document.getElementById(id)};
	function init(el,config){
		this.el = $(el)
		this.width = $(el).width
		this.height = $(el).height
		this.data = config.data
		this.ctx = $(el).getContext('2d')
		this.margin = {
			top:10,
			left:10,
			bottom:10,
			right:20
		}
					
		this.drawAxis()
		this.bar()
		this.pie()
	}
	init.prototype = {
		drawLine:function(oX,oY,x,y,angle){
			angle = angle === undefined ? 0 : angle
			var ctx = this.ctx
			ctx.save()
			ctx.translate(oX,oY)
			ctx.beginPath()
			ctx.rotate(angle*Math.PI/180)
			ctx.lineTo(0,0)
			ctx.lineTo(x,y)
			ctx.stroke()
			ctx.closePath()
			ctx.restore()
		},
		drawAxis:function(){
			this.drawLine(this.margin.left,this.height-this.margin.bottom,this.width,0)
			this.drawLine(this.margin.left,this.height-this.margin.bottom,0,-this.height)
			this.drawLine(this.width,this.height-this.margin.bottom,-10,0,30)
			this.drawLine(this.width,this.height-this.margin.bottom,-10,0,-30)
			this.drawLine(this.margin.left,0,0,10,30)
			this.drawLine(this.margin.left,0,0,10,-30)
		},
		maxVal:function(arr){
			var maxItem = arr[0]
			for(var i=0,l=arr.length;i<l;i++){
				maxItem = maxItem < arr[i] ? arr[i] : maxItem
			}
			return maxItem
		},
		proportion:function(){
			var data = this.data.slice()
			data.sort(function(a,b){
				return b-a
			})
			this.per = this.height / data[0]
			//this.per = this.height / this.maxVal(this.data)
		},
		bar:function(){
			var ctx = this.ctx,
			space = 10,
			colNumber = this.data.length
			var colWidth = (this.width-colNumber*space-this.margin.right) / colNumber
			var that = this
			if(!this.per) this.proportion()
						
			ctx.save()
			//ctx.translate(0,that.height)
			ctx.translate(this.margin.left,this.height-this.margin.bottom)
			//ctx.globalCompositeOperation="destination-over";
			ctx.beginPath()
			this.data.forEach(function(el,i){
				var x = space*(i+1) + i * colWidth
				var y = -el * that.per
				var width = colWidth
				var height = -y//el * that.per
							
							
				ctx.fillStyle = '#426'
				ctx.rect(x,y,width,height)
				ctx.fill()
				/*
				var lineX = x + colWidth/2
							
				ctx.lineTo(lineX,y)
				ctx.stroke()
				*/
				})
				ctx.closePath()
				ctx.restore()
						
				ctx.save()
				ctx.translate(this.margin.left,this.height-this.margin.bottom)
				ctx.beginPath()
				this.data.forEach(function(el,i){
					var x = space*(i+1) + i * colWidth
					var y = -el * that.per
					var width = colWidth
					var height = -y//el * that.per
							
					var lineX = x + colWidth/2
					ctx.strokeStyle = '#919191'
					ctx.lineTo(lineX,y)
					ctx.stroke()
							
				})
				ctx.closePath()
				ctx.restore()
			},
			arrSum:function(arr){
				var sum = 0
				arr.forEach(function(el,i){
					sum += el
				})
						
				return sum
			},
			randomColor:function(){
				return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
			},
			pie:function(){
				var total = this.arrSum(this.data),
					centerX = this.width /2,
					centerY = this.height /2,
					r = 100,
					ctx = this.ctx,
					sAngle = eAngle = 0
				var that = this
				this.data.forEach(function(el,i){
					eAngle = el / total * 360 * Math.PI/180
							
					ctx.beginPath()
					ctx.lineTo(centerX,centerY)
					ctx.arc(centerX,centerY,r,sAngle,sAngle+eAngle)
							
					ctx.fillStyle = that.randomColor()
					ctx.fill()
					ctx.closePath()
							
					sAngle += eAngle
				})
			}
		}
				return init
}();