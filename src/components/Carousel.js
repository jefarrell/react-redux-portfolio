import React from 'react';
import Slider from 'react-slick';
const imgs = require.context('../assets/images', true);

function NextArrow(props) {
	const { className, style, onClick } = props
	return (
		<div
			className={className}
			id="modal_carousel_next_arrow"
			style={{...style, display: 'block'}}
			onClick={onClick}
	    ></div>
	);
}

function PrevArrow(props) {
	const { className, style, onClick } = props
	return (
		<div
			className={className}
			style={{...style, display: 'block'}}
			onClick={onClick}
		></div>
	);
}

class SimpleSlider extends React.Component {

  	render() {

    	let settings = {
      		dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <NextArrow />,
			prevArrow: <PrevArrow />
    	};

    	const types = ["jpg", "jpeg", "png", "gif"];
    	let project = this.props.project;

    	// Slider with video iframes
    	if(this.props.videos) {
    		let images = [];
    		
    		this.props.video_src.map((v, vIndex) => {
    			images.push(
	    			<div key={ v }>
	    				<iframe 
                            src={ v } 
                            className="modal_carousel_video"
		    				title="project video" 
		    				width="700" 
		    				height="400"
		    				frameBorder="0"
		    			/>
	    			</div>
    			)
    		})

    		for(let i = 0; i < this.props.photo_count; i++) {
    			types.map(type => {
    				try {
    					images.push(
    						<div key={ i }>
    							<img 
    								className="modal_carousel_img" 
    								src={ imgs(`./${project}/${project+i}.${type}`) }
    								/>
    						</div>
    					)
    				}
    				catch(e){
    					// probably use winston
    				}
    			})
    		}

    		return (
		      <Slider {...settings}>
				{ images }
		      </Slider>
		    );


    	// Slider with just images
    	} else {
    		let images = [];
    		for(let i = 0; i < this.props.photo_count; i++) {
    			types.map(type => {
    				try {
    					images.push(
    						<div key={ i }>
    							<img 
    								className="modal_carousel_img" 
    								src={ imgs(`./${project}/${project+i}.${type}`) }
    								/>
    						</div>
    					)
    				}
    				catch(e){
    					// probably use winston
    				}
    			})
    		}
    		
    		return (
		      <Slider {...settings}>
		        { images }
		      </Slider>
		    );
    	}
	    
  }
}

export default SimpleSlider;