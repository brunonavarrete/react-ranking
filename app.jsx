var Recipes = [
	{
		id: 1,
		title: 'Smothered Chicken with Mushrooms',
		summary: 'A play on the chain restaurant specialty of the same name - a bit healthier and just as satisfying!',
		ranking: 4.5
	},
	{
		id: 2,
		title: 'Slow Cooker Belgian Chicken Booyah',
		summary: 'This is a booyah recipe that is adapted from originally a 50 gallon recipe cooked in large 55 gallon cast-iron kettles with a wood fire, most often at church picnics in northeastern Wisconsin.',
		ranking: 4
	},
	{
		id: 3,
		title: 'Colleen\'s Slow Cooker Jambalaya',
		summary: 'This recipe came about from a lot of experimenting over the years. My family and friends like this version the best. Serve over cooked rice.',
		ranking: 4.5
	},
];

function Star(props){
	return (
		<span onClick={ props.setRank } className="click-star text-muted mr-1">★</span>
	)
}

Star.propTypes = {
	setRank: React.PropTypes.func.isRequired,
}

var Ranker = React.createClass({
	propTypes: {
		tagline: React.PropTypes.string.isRequired,
		rank: React.PropTypes.number.isRequired
	},
	getDefaultProps: function(){
		return {
			tagline: 'Rate it!',
		}
	},
	getInitialState: function(){
		return {
			rank: 0
		}
	},
	setRank: function(val){
		this.state.rank = val;
		this.setState(this.state);
	},
	render: function(){
		var possibleStars = [];
		for (let i = 1; i < 6; i++) {
			possibleStars.push( 
				<Star 
				key={i} 
				setRank={ function(){ this.setRank(i) }.bind(this) } /> 
			);
		};
		return (
			<div className="card-footer alert-success">
				<p>{ this.props.tagline }</p>
				<div className="rank">
					{ possibleStars }{ this.state.rank }
				</div>
			</div>
		)
	}
});

function Card(props){
	var starsState = [];
	for (let i = 0; i < props.ranking; i++) {
		starsState.push( <span className="text-warning mr-1" key={i}>★</span> );
	};

	return (
		<div className="card">
			<div className="card-body d-flex flex-column">
				<h2 className="card-title h4">{ props.title }</h2>
				<p className="card-text">{ props.summary }</p>
				<div className="mt-auto">{ starsState }&nbsp;{ props.ranking }</div>
			</div>
			<Ranker tagline="Do you agree? Rate it yourself!" rank={0} />
		</div>
	);
}

Card.propTypes = {
	title: React.PropTypes.string.isRequired,
	summary: React.PropTypes.string.isRequired,
	ranking: React.PropTypes.number.isRequired
}

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
								ranking={ recipe.ranking } />
						);
					}.bind(this))}
				</div>
			</div>
		);
	},
});

ReactDOM.render(<Application title="Star Ranking" initialData={Recipes} />, document.getElementById('app'));
