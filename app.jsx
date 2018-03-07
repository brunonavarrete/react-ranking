var Recipes = [
	{
		id: 1,
		title: 'Smothered Chicken with Mushrooms',
		summary: 'A play on the chain restaurant specialty of the same name - a bit healthier and just as satisfying!',
		grades: [4,5],
	},
	{
		id: 2,
		title: 'Slow Cooker Belgian Chicken Booyah',
		summary: 'This is a booyah recipe that is adapted from originally a 50 gallon recipe cooked in large 55 gallon cast-iron kettles with a wood fire, most often at church picnics in northeastern Wisconsin.',
		grades: [4,4],
	},
	{
		id: 3,
		title: 'Colleen\'s Slow Cooker Jambalaya',
		summary: 'This recipe came about from a lot of experimenting over the years. My family and friends like this version the best. Serve over cooked rice.',
		grades: [4,5],
	},
];

function Star(props){
	return (
		<span onClick={ props.setGrade } className="click-star text-muted mr-1">★</span>
	)
}

Star.propTypes = {
	setGrade: React.PropTypes.func.isRequired,
}

function Ranker(props) {
	var possibleStars = [];
	for (let i = 1; i < 6; i++) {
		possibleStars.push( 
			<Star 
			key={i} 
			setGrade={ function(){props.setRank(i)} } /> 
		);
		/**/
	};
	return (
		<div className={'rank ' + props.grade}>
			<p>{ props.tagline }</p>
			{ possibleStars } { props.grade }
		</div>
	)
}

Ranker.propTypes = {
	tagline: React.PropTypes.string.isRequired,
	setRank: React.PropTypes.func,
	grade: React.PropTypes.number
}

var Card = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		summary: React.PropTypes.string.isRequired,
		initialGrades: React.PropTypes.array.isRequired,
		isGraded: React.PropTypes.bool,
		newGrade: React.PropTypes.number,
	},
	getInitialState: function(){
		return {
			gradesArray: this.props.initialGrades,
			isGraded: this.props.isGraded,
			newGrade: 0
		}
	},
	addRank: function(grade){
		if( this.state.isGraded ){
			this.state.gradesArray.splice(-1,1);
		} else {
			this.state.isGraded = true;
		}
		this.state.gradesArray.push(grade);
		this.state.newGrade = grade;
		this.setState(this.state);
	},
	render: function(){
		var avg = 0;
		for (var i = 0; i < this.state.gradesArray.length; i++) {
			avg += this.state.gradesArray[i];
		}
		avg = avg/this.state.gradesArray.length;
		var ranking = Math.round( avg * 10 ) / 10;
		var starsState = [];
		for (let i = 0; i < ranking; i++) {
			starsState.push( <span className="text-warning mr-1" key={i}>★</span> );
		};

		return (
			<div className="card">
				<div className="card-body d-flex flex-column">
					<h2 className="card-title h4">{ this.props.title }</h2>
					<p className="card-text">{ this.props.summary }</p>
					<div className="mt-auto">{ starsState }&nbsp;{ ranking }</div>
				</div>
				<div className="card-footer alert-success">
					<Ranker 
						tagline="Do you agree? Rate it yourself!" 
						setRank={ function(grade){ this.addRank(grade); }.bind(this) }
						grade={ this.state.newGrade } />
				</div>
			</div>
		);
	}
});

var Application = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		initialData: React.PropTypes.array.isRequired
	},
	getDefaultProps: function(){
		return {
			title: 'Star ranking'
		}
	},
	getInitialState: function(){
		return {
			recipes: this.props.initialData
		}
	},
	render: function(){
		return (
			<div className="container py-5">
				<div className="card-group">
					{ this.state.recipes.map(function(recipe,index){
						return (
							<Card 
								key={ recipe.id }
								title={ recipe.title } 
								summary={ recipe.summary } 
								initialGrades={ recipe.grades }
								/>
						);
					}.bind(this))}
				</div>
			</div>
		);
	},
});

ReactDOM.render(<Application title="Star Ranking" initialData={Recipes} />, document.getElementById('app'));
