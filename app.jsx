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

function Card(props){
	var starsState = [];
	for (let i = 0; i < props.ranking; i++) {
		starsState.push( <span className="fas fa-star text-warning mr-1" key={i}></span> );
	};

	var starsGiven = [];
	for (let i = 0; i < 5; i++) {
		starsGiven.push( <span className="fas fa-star text-muted mr-1" key={i}></span> );
	};	

	return (
		<div className="card">
			<div className="card-body d-flex flex-column">
				<h2 className="card-title h4">{ props.title }</h2>
				<p className="card-text">{ props.summary }</p>
				<div className="mt-auto">{ starsState }&nbsp;{ props.ranking }</div>
			</div>
			<div className="card-footer alert-success">
				<p>Do you agree? Rate it yourself!</p>
				<div className="rank">
					{ starsGiven }
				</div>
			</div>
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
