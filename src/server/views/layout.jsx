import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

// import Header from './header';
// import Footer from './footer';

import config from './../../config';

class Layout extends Component {
	render() {
		return (
			<html>
				<head>
					<title>React app</title>
					<link rel="stylesheet" href="//aui-cdn.atlassian.com/aui-adg/6.0.6/css/aui.min.css" media="all" />
					<link rel="stylesheet" href={config.build.css}/>
					<meta charSet="utf-8" />
				</head>
				<body>
					<section id="app"></section>
					<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
					<script src="//aui-cdn.atlassian.com/aui-adg/6.0.6/js/aui.min.js"></script>
					<script type="application/javascript" src={config.build.js}></script>
				</body>
			</html>
		)
	}
}

export default ReactDOMServer.renderToStaticMarkup(<Layout />);