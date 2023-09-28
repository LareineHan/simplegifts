/* eslint-disable */
import './App.css';
import Modal from './components/Modal';
import ListItem from './components/ListItem';
import React, { useRef, useState, useEffect } from 'react';
import mockData from './mockData'; // Adjust the path as needed
import { useHistory, useLocation, BrowserRouter } from 'react-router-dom';

function App() {
	// set up state
	const history = useHistory();
	const location = useLocation();
	const modalRef = useRef(null);
	const params = new URLSearchParams(location.search);
	const [isSorted, setIsSorted] = useState(false);
	// const [items, setItems] = useState(mockData);
	const [items, setItems] = useState(
		mockData.map((data, index) => ({
			title: data.title,
			details: data.details,
			timestamp: new Date().getTime() + index, // or simply 'index' if you prefer
		}))
	);

	const [prevItems, setPrevItems] = useState([]);

	// Initialize like-related states based on the length of the mock data
	const [isLiked, setIsLiked] = useState(new Array(items.length).fill(false));
	const [num, setNum] = useState(new Array(items.length).fill(0));

	let [modal, setModal] = useState(false); // modal open/close
	let [createModal, setCreateModal] = useState(false); // show input modal
	let [modalTitle, setModalTitle] = useState(0); // modal title
	let [inputTitleValue, setInputTitleValue] = useState(''); // input value
	let [detailsValue, setDetailsValue] = useState(''); // details input value

	// handle form submit
	const handleFormSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		// Create a new item object with the new title and details
		const newItem = {
			title: inputTitleValue,
			details: detailsValue,
			timestamp: Date.now(),
		};

		// Add the new item to the items array
		const newItems = [newItem, ...items];
		setItems(newItems);

		// Add the new like status and number
		const newIsLiked = [false, ...isLiked];
		setIsLiked(newIsLiked);

		const newNum = [0, ...num]; // Initialize the number of likes to 0 for
		// the new item on newNum array
		setNum(newNum); // set newNum array as a new num state

		// Close the modal
		setCreateModal(false);
	};
	// const handleLike = (itemId) => {
	//   console.log(`Item with ID ${itemId} was liked!`);
	//   // Any other logic that needs to happen in the parent
	// };

	useEffect(() => {
		if (modal) {
			modalRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [modal]);

	const toggleSort = () => {
		if (isSorted) {
			// When it's sorted alphabetically, sort by timestamp to get back the original order
			let timeSortedItems = [...items].sort(
				(a, b) => b.timestamp - a.timestamp // Sort by timestamp from newest to oldest
			);
			setItems(timeSortedItems);
			console.log('Sorted by timestamp');
		} else {
			// When it's not sorted, sort it alphabetically
			let sortedItems = [...items].sort((a, b) =>
				a.title.localeCompare(b.title)
			);
			setItems(sortedItems);
			console.log('Sorted by title');
		}
		setIsSorted(!isSorted);
		console.log('isSorted (by timestamp)?: ' + isSorted);
	};

	// display
	return (
		<div className='App'>
			<div className='black-nav'>
				<div>
					Dev Simple Things <i className='fa-solid fa-keyboard' size='xs' />
				</div>
			</div>
			<div className='contents-box'>
				<div className='controller'>
					{/* <i className="fa-solid fa-arrow-down-a-z" onClick={toggleSort}></i>
          <i className="fa-solid fa-arrows-rotate" onClick={reset}></i> */}
					{isSorted ? (
						<i className='fa-solid fa-arrows-rotate' onClick={toggleSort}></i>
					) : (
						<i className='fa-solid fa-arrow-down-a-z' onClick={toggleSort}></i>
					)}
				</div>
				{items.map((item, index) => (
					<ListItem
						key={item.timestamp} // Using timestamp as the key
						itemId={item.timestamp} // Passing timestamp as itemId
						item={item}
						i={index}
						modal={modal}
						modalTitle={modalTitle}
						setModal={setModal}
						setModalTitle={setModalTitle}
						num={num}
						setNum={setNum}
						isLiked={isLiked} // Pass the isLiked state
						setIsLiked={setIsLiked}
						items={items}
						setItems={setItems}
					/>
				))}
				<center>
					{!createModal && (
						// <button className="btn-create" onClick={() => setCreateModal(true)}>
						<i
							onClick={() => setCreateModal(true)}
							className='fa-solid fa-circle-plus fab'
							size='xl'></i>
						// {/* </button> */}
					)}
					{createModal && (
						<div className='modal-create'>
							<div className='modal-content'>
								<button
									className='btn-dismiss'
									onClick={() => setCreateModal(false)}>
									<i className='fas fa-times'></i>
								</button>

								<h4 className='modal-name'>Add Dev Simple Thing</h4>
								<form onSubmit={handleFormSubmit}>
									<input
										className='title-input caret-blue-500 focus:caret-indigo-500'
										placeholder='Name Simple Thing'
										onChange={(e) => {
											setInputTitleValue(e.target.value);
										}}></input>
									<textarea
										className='detail-input caret-blue-500 md:caret-indigo-500'
										placeholder='Add Details'
										onChange={(e) => {
											setDetailsValue(e.target.value);
										}}></textarea>

									<div className='add-close-btn'>
										<button className='btn-add' type='submit'>
											Add Now
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</center>

				{modal ? (
					<div ref={modalRef}>
						<Modal
							item={items.find((i) => i.timestamp === modalTitle)}
							closeModal={() => setModal(false)}
						/>
					</div>
				) : null}
			</div>
		</div> // end of App
	); // end of return
} // end of App

export default App;
