var Recipes = [
	{
		id: 1,
		title: 'Smothered Chicken with Mushrooms',
		summary: 'A play on the chain restaurant specialty of the same name - a bit healthier and just as satisfying!',
		grades: [4,1,2,2],
	},
	{
		id: 2,
		title: 'Slow Cooker Belgian Chicken Booyah',
		summary: 'This is a booyah recipe that is adapted from originally a 50 gallon recipe cooked in large 55 gallon cast-iron kettles with a wood fire, most often at church picnics in northeastern Wisconsin.',
		grades: [4,4,5,4,5,2,3,4],
	},
	{
		id: 3,
		title: 'Colleen\'s Slow Cooker Jambalaya',
		summary: 'This recipe came about from a lot of experimenting over the years. My family and friends like this version the best. Serve over cooked rice.',
		grades: [4,5,3,4,3,5,1,4],
	},
];

var RecipeForm = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		summary: React.PropTypes.string,
		onSave: React.PropTypes.func.isRequired
	},
	getInitialState: function(){
		return {
			title: '',
			summary: '',
		}
	},
	onTitleChange: function(e){
		this.setState({
			title: e.target.value
		});
	},
	onSummaryChange: function(e){
		this.setState({
			summary: e.target.value
		});
	},
	onSubmit: function(e){
		e.preventDefault();
		if( this.state.title !== '' && this.state.summary !== '' ){
			this.props.onSave( this.state );
			this.setState({
				title: '',
				summary: '',
			});
		} else {
			alert( 'Title and summary are required ');
		}
	},
	render: function(){
		return(
			<form onSubmit={ this.onSubmit } className="w-100 align-self-xl-center">
				<div className="form-group">
					<input type="text" name="title" className="form-control" value={ this.state.title } placeholder="Dish Name:" 
					onChange={ this.onTitleChange } />
				</div>
				<div className="form-group mb-0 d-flex justify-content-bewteen align-items-center">
					<textarea onChange={ this.onSummaryChange } type="text" rows="2" name="summary" className="form-control" placeholder="Summary:" value={ this.state.summary }></textarea>
					<input type="submit" className="btn btn-danger py-1 px-4 ml-3" value="Save" />
				</div>
			</form>
		)
	},
});

function Star(props){
	return (
		<span onClick={ props.setGrade } className="mr-1">★</span>
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
	}
	return (
		<div className={'d-flex justify-content-between align-items-center rank rank--' + props.grade}>
			<p>{ props.tagline }</p>
			<p>{ possibleStars }</p>
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
		if( this.state.isGraded ) {
			this.state.gradesArray.splice(-1,1);
		} else if( this.state.gradesArray.indexOf(0) >= 0 ){
			this.state.gradesArray.splice(-1,1);
			this.state.isGraded = true;
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
		
		for (let i = 0; i < Math.round(ranking); i++) {
			starsState.push( 
				<span className="text-warning mr-1" key={i}>★</span>
			);
		};

		return (
			<div className="card px-0">
				<div className="card-body d-flex flex-column">
					<h2 className="card-title h4">{ this.props.title }</h2>
					<p className="card-text">{ this.props.summary }</p>
					<div className="mt-auto ml-auto">
						<p className="d-flex align-items-center mb-0 text-right">
							<small className="pr-2 text-right">({ ranking })</small> { starsState }
						</p>
					</div>
				</div>
				<div className="card-footer alert-primary">
					<Ranker 
						tagline="Do you agree? Let us know!" 
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
		initialData: React.PropTypes.array.isRequired,
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
	saveRecipe: function(recipe){
		var key = this.state.recipes.length + 1;
		recipe.id = key;
		recipe.grades = [0];
		console.log(recipe);
		this.state.recipes.push(recipe);
		this.setState(this.state);
	},
	render: function(){
		return (
			<div className="container py-5">
				<header className="row mb-5">
					<div className="col-12 col-xl-6">
						<h1 className="display-1 mb-1">
							{ this.props.title }
						</h1>
						<p className="mb-0">
							Content shamelessly stolen from <a href="https://www.allrecipes.com/" target="_blank">All Recipes</a>
						</p>
					</div>
					<div className="col-12 d-xl-flex col-xl-6">
						<RecipeForm onSave={ function(obj){ this.saveRecipe(obj); }.bind(this) } />
					</div>
				</header>
				<section className="row">
					<div className="card-group col-12">
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
				</section>
			</div>
		);
	},
});

ReactDOM.render(<Application title="Rank-a-rec" initialData={Recipes} />, document.getElementById('app'));