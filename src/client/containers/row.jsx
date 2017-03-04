import React, { Component } from 'react';
import clickOutside from 'react-click-outside';

class Row extends Component {
	constructor(props) {
		super(props);
		this.state = {
			change: this.props.change || false
		}	
	}
	
	activate() {
		this.setState({
			change: true 
		})
	}
	
	handleClickOutside(){
		if (!this.state.change){
			return ;
		}
		
		const title = this.refs.title.value;
		const description = this.refs.description.value;
		const position = this.props.priority.position;

		const { setPriority } = this.props.actions;

		setPriority({
			title: (title === '') ? 'Без названия' : title,
			description: (description === '') ? 'Всем и так всё ясно' : description,
			position
		})

		this.setState({
			change: false
		})
	}
	
	deleteRow(){
		this.setState({
			change: false
		})

		const { deletePriority } = this.props.actions;
		deletePriority(this.props.priority.position);
	}
	
	dragEnd(){
		this.setState({
			change: false
		})

		const position = this.props.priority.position;

		this.props.actions.dragEnd(position);
	}
	
	nextField(e){
		if (e.key == 'Enter'){
			this.refs.description.focus();
		}
	}
	
	done(e){
		if (e.key == 'Enter'){
			this.handleClickOutside();
		}
	}

	render() {
		const { priority } = this.props;

		if(!this.state.change) {
			return(
				<tr 
					className="row"
					id={`row-${priority.position}`}
					draggable="true" 
					onDragEnd={this.dragEnd.bind(this)}
					onClick={this.activate.bind(this)}
					>
					<td className="number">
						<span className="number__edit aui-icon aui-icon-small aui-iconfont-edit"></span>
						<span className="number__value">{priority.position + 1}</span>
					</td>
					<td className="priority">{priority.title}</td>
					<td className="description">{priority.description}</td>
				</tr>
			)
		}
		else {
			return(
				<tr 
					className="active row"
					id={`row-${priority.position}`}
					draggable="true" 
					onDragEnd={this.dragEnd.bind(this)}
					onClick={this.activate.bind(this)}
					>
					<td className="number">
						<span 
							onClick={this.deleteRow.bind(this)} 
							className="number__del aui-icon aui-icon-small aui-iconfont-close-dialog">
						</span>
					</td>
					<td className="priority">
						<input 
							type="text"
							onKeyPress={(e) => this.nextField(e)}
							defaultValue={priority.title}  
							ref="title"
							className="priority__input" 
							placeholder="Приоритетность"/>
					</td>
					<td className="description">
						<input 
							type="text" 
							defaultValue={priority.description} 
							onKeyPress={(e) => this.done(e)}
							ref="description"
							className="priority__input" 
							placeholder="Моя новая и классная приоритетность"/>
					</td>
				</tr>
			)
		}	
	}
}

export default clickOutside(Row);