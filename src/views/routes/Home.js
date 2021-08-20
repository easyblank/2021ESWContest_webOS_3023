import React, { Component } from 'react';
import kind from '@enact/core/kind';
import {Panel} from '@enact/sandstone/Panels';
import './Home.css'
import Button from '@enact/sandstone/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Movie from "./Movie"
// import Modal from './modal.js'
// import socketio from 'socket.io-client';

// const socket = socketio.connect('http://localhost:8081');
// (() => {
//     socket.emit('init', { name: 'bella' });

//     socket.on('welcome', (msg) => {
//       console.log(msg);
//     });

// })();

const Modal = (props) => {
    const {open, close, header} = props;
    return (
    <div className = { open ? 'openModal modal': 'modal'}>
        {open ? (
            <section>
                <header>
                <button className="close" onClick={close}></button>
                </header>
                <main>
                    {props.children}
                </main>
                <footer>
                    <button className="close" onClick={close}>close</button>
                </footer>
            </section>
        ):null}
    </div>
    )
}

function MyModal(){
	let [modalOpen, setModalOpen] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	}
	const closeModal = () => {
		setModalOpen(false);
	}
	return (
		<>
		<React.Fragment>
			<button onClick={openModal}>모달 팝업</button>
			<Modal open = {modalOpen} close ={closeModal} header="Modal Heading">
				냥냥
			</Modal>
		</React.Fragment>
		</>
	);
}

// function Data(){
// 	const [data, setData] = useState(null);
// 	useEffect(() => {
// 		axios.get("https://yts.mx/api/v2/list_movies.json");
// 		console.log("done")
// 	  }, []);

// 	const isLoading = (data == null);
// 	return ( isLoading ? "Loading..."  : data )
// }



// const MainPanel = kind({
// 	name: 'MainPanel',
// 	render: (props) => (
// 		<Panel {...props}>
// 			<div className="grid-container">
// 				<div className="header">Home</div>
// 				<div className="sidebar-a">
// 					{/* <Button id="button_nfc">설탕</Button> */}
// 					<MyModal></MyModal>
// 				</div>
// 				<div className="main-content">Main</div>
// 				<div className="sidebar-b">Machine</div>
// 				<div className="footer">footer</div>
// 				{/* <div className="item5">5</div>
// 				<div className="item6">6</div> */}
// 			</div>
// 		</Panel>
// 	)
// })

// const MainPanel = () => {
// 	const [count, setCount] = useState(0);
// 	return (
// 		<div className="grid-container">
// 			<div className="header">Home</div>
// 			<div className="sidebar-a">
// 				{/* <Button id="button_nfc">설탕</Button> */}
// 				<MyModal></MyModal>
// 				{count}
// 				<button onClick={() => setCount(count+1)}>Increment</button>
// 				{/* <Data></Data> */}
// 			</div>
// 			<div className="main-content">Main</div>
// 			<div className="sidebar-b">Machine</div>
// 			<div className="footer">footer</div>
// 			{/* <div className="item5">5</div>
// 			<div className="item6">6</div> */}
// 		</div>
// 	)
// }




class App extends Component{
	state = {
		isLoading: true,
		movies: []
	};
	getMovies = async () => {
		const {data:{data : {movies}}}
		= await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating")
		this.setState({movies, isLoading:false});
	};
	componentDidMount() {
		this.getMovies();
	}
	render() {
		const {isLoading, movies} = this.state;
		return (
			<div className="container">
			{
				isLoading ? (<div className="loader">
						<span className="loader_text">Loading...</span>
					</div>
					) : (
						<div className="movies">
							{
								movies.map(movie => (
										<Movie
											key={movie.id}
											id={movie.id}
											year={movie.year}
											title={movie.title}
											summary={movie.summary}
											poster={movie.medium_cover_image}
											genres={movie.genres}
										/>
									)
								)}
						</div>
					)
				}
			</div>
		)
	}
}


export default App;