/* eslint-disable */
import './App.css';
import StartScreen from './components/StartScreen';
import Modal from './components/Modal';
import ListItem from './components/ListItem';
import React, { useRef, useState, useEffect } from 'react';
import mockData from './mockData'; // Adjust the path as needed
import { useHistory, useLocation, BrowserRouter } from 'react-router-dom';

function App() {
	const history = useHistory();
	const location = useLocation();
	const modalRef = useRef(null);
	const params = new URLSearchParams(location.search);
	const [isSorted, setIsSorted] = useState(false);
	const [items, setItems] = useState(
		mockData.map((data, index) => ({
			title: data.title,
			details: data.details,
			timestamp: new Date().getTime() + index, // or simply 'index'
		}))
	);
	const [loading, setLoading] = useState(true);
	const [isItem, setIsItem] = useState(true);
	const [prevItems, setPrevItems] = useState([]);

	// Initialize like-related states based on the length of the mock data
	const [isLiked, setIsLiked] = useState(new Array(items.length).fill(false));
	const [num, setNum] = useState(new Array(items.length).fill(0));
	let [isStartScreen, setIsStartScreen] = useState(true); // start screen
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);
	let [modal, setModal] = useState(false); // modal open/close
	let [createModal, setCreateModal] = useState(false); // show input modal
	let [modalTitle, setModalTitle] = useState(0); // modal title
	let [inputTitleValue, setInputTitleValue] = useState(''); // input value
	let [detailsValue, setDetailsValue] = useState(''); // details input value

	useEffect(() => {
		// Simulate loading data from an API
		setTimeout(() => {
			setLoading(false);
			setItems(mockData);
		}, 2000); // Simulate a 2-second delay
	}, []);

	// handle form submit
	const handleFormSubmit = (e) => {
		e.preventDefault(); // ⭐ important: Prevent the default form submission behavior
		controllerShow();
		// Creating new item.
		const newItem = {
			title: inputTitleValue,
			details: detailsValue,
			timestamp: Date.now(), // Use the current timestamp as the unique key
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
		setIsItem(true);
		// Close the modal
		setCreateModal(false);
	};

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

	const controllerHide = () => {
		const controller = document.querySelector('.controller');
		controller.style.display = 'none';
	};
	const controllerShow = () => {
		const controller = document.querySelector('.controller');
		controller.style.display = 'flex';
	};

	const cancelCreate = () => {
		const inputTitleValue = document.querySelector('.title-input').value;
		const detailsValue = document.querySelector('.detail-input').value;
		if (inputTitleValue !== '' || detailsValue !== '') {
			// Ask the user if they want to proceed or stay
			const confirmMessage =
				'Are you sure you want to cancel? Any unsaved changes will be lost.';
			if (window.confirm(confirmMessage)) {
				setCreateModal(false);
			}
		} else {
			setCreateModal(false);
		}
	};

	const cleanSlate = () => {
		setItems([]);
		setIsLiked([]);
		setNum([]);
		setIsItem(false);
		controllerHide();
	};

	// display
	return (
		<div className='App'>
			<div className='black-nav'>
				<div>
					SimpleGifts <i className='fa-solid fa-keyboard' size='xs' />
				</div>
			</div>
			<div className='contents-box'>
				<div className='controller'>
					{
						<button
							className='bnt-clean-slate'
							onClick={() => cleanSlate()}
							onMouseEnter={() => setIsTooltipVisible(true)}
							onMouseLeave={() => setIsTooltipVisible(false)}>
							{''} <i className='fa fa-trash'></i>
							{isTooltipVisible && (
								<div className='tooltip'>
									Warning: This action will remove all notes.
								</div>
							)}
						</button>
					}
					{isSorted ? (
						<i className='fa-solid fa-undo' onClick={toggleSort}></i>
					) : (
						<i className='fa-solid fa-arrow-down-a-z' onClick={toggleSort}></i>
					)}
				</div>

				<div className='item-list'>
					{isItem ? (
						<>
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
						</>
					) : (
						<StartScreen />
					)}
				</div>
			</div>
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
							<button className='btn-dismiss' onClick={() => cancelCreate()}>
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
	); // end of return
} // end of App

export default App;
