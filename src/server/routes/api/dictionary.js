const dictionary = [
	{
		title: 'Высокая',
		description: 'Приоритетность для задач, которые должны быть выполнены немедленно',
		position: 0
	},
	{
		title: 'Средняя',
		description: 'Приоритетность для задач, которые должны быть выполнены позже',
		position: 1
	},
	{
		title: 'Низкая',
		description: 'Приоритетность для задач, которые должны быть не выполнены',
		position: 2
	}
]

export default class Dictionary {
	constructor(router) {
		this.router = router;
		this.dictionary = dictionary;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get('/api/dictionary', this.getDictionary.bind(this));
		this.router.post('/api/dictionary', this.postDictionary.bind(this));
	}

	getDictionary(req, res, next) {
		res.json({
			data: this.dictionary
		})
	}

	postDictionary(req, res, next) {
		this.dictionary = req.body.data;
		
		res.json({
			data: 'succsess'
		})
	}
}