import React from 'react';

export default class Home extends React.Component {

	render(props, state) {
		return (
			<section className="home">
        <div className="row">
          <div id="logo" className="col-sm-4"></div>
          <div className="col-sm">
            <h2>Welcome to Maze Framework!</h2>
            <p>Thank you for trying out the Maze Framework.
            We are working hard to provide a super fast and reliable framework that provides
            all the productivity tools you are used to without sacrificing the speed.</p>
            <div className="list-group">
              <a className="list-group-item list-group-item-action" target="_blank"
              href="https://docs.mazeframework.org">Getting Started with Maze Framework</a>
              <a className="list-group-item list-group-item-action" target="_blank"
              href="https://github.com/veelenga/awesome-crystal">List of Awesome Crystal projects and shards</a>
              <a className="list-group-item list-group-item-action" target="_blank"
              href="https://crystalshards.xyz">What is hot in Crystal right now</a>
            </div>
          </div>
        </div>
			</section>
		);
	}
}
