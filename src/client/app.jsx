import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from 'containers/row';

import * as actions from './actions';
 
import './styles/screen.scss';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dictionary: this.props.priorities.dictionary
		}
	}

	componentDidMount() {
		const { getRequest } = this.props.actions;

		getRequest();
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({
			dictionary: nextProps.priorities.dictionary
		})	
	}

	addPriority() {
		const dictionary = [
			...this.state.dictionary,
			{
				title: undefined,
				description: undefined,
				position: this.state.dictionary.length,
				isNew: true
			}
		]

		this.setState({
			dictionary
		})
	}

	getRows() {
		const dictionary = this.state.dictionary;

		return dictionary.map((priority, index) => {
			const { setPriority, deletePriority } = this.props.actions; 
			return (
				<Row 
					key={`priority-${index}`}
					change={(typeof priority.isNew == 'undefined') ? false : true}
					priority={priority}
					actions={{setPriority, deletePriority, dragEnd: this.dragEnd.bind(this)}}
					/>
			)
		})
	}
	

	dragOver(e){
		const row = findAncestor(e.target, 'row');
		
		this.dragTo = parseInt(row.id.split('-')[1], 10);
	}
	

	dragEnd(dragFrom){
		const dictionary = [...this.state.dictionary];
		const spliced = dictionary.splice(dragFrom, 1);
		
		dictionary.splice(this.dragTo, 0, spliced[0]);

		const { setSorted } = this.props.actions;
		setSorted(dictionary);
	}
	
	save(){
		const { saveRequest } = this.props.actions;
		saveRequest();
	}

	render() {
		if (!this.props.priorities.loaded) {
			return (
				<section className="priorities"></section>
			)
		}

		return (
			<section className="priorities">
				<div className="modal">
					<header className="header">
						Настройка приоритетностей
					</header>
					<div className="content">
						<table className="aui">
							<thead>
								<tr>
									<th className="number">#</th>
									<th className="priority">Приоритетность</th>
									<th className="description">Описание</th>
								</tr>
							</thead>
							<tbody onDragOver={(e) => this.dragOver(e)}>
								{this.getRows()}
							</tbody>
						</table>
					</div>
					<footer className="footer actions">
						<button onClick={this.save.bind(this)} className="aui-button right">Сохранить</button>
						<button onClick={this.addPriority.bind(this)} className="aui-button right">Добавить</button>
					</footer>
				</div>
			</section>
		)
	}
}

function mapStateToProps(state){
	return{
		priorities: state.priorities
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

function findAncestor(el, className) {
	while ((el = el.parentElement) && !el.classList.contains(className));
	return el;
}

export default connect(mapStateToProps, mapDispatchToProps)(App)