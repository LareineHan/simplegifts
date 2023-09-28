import React, { useEffect } from 'react';
import '../App';

const ListItem = ({
	itemId, // Passing timestamp as itemId (생성된 시간순으로 부여된 아이디)
	item, // Passing the item object
	i,
	modal, // Passing the modal state
	modalTitle, // Passing the modal title
	setModal, // Passing the setModal function
	setModalTitle, // Passing the setModalTitle function
	num, //
	setNum,
	isLiked,
	setIsLiked,
	items,
	setItems,
}) => {
	// console.log('Rendering itemId:', itemId);

	// Log the updated status of num and isLiked by clicking the heart icon.
	useEffect(() => {
		console.log('Updated num:', num);
		console.log('Updated isLiked:', isLiked);
	}, [num, isLiked]);

	// Is num an array? Is the required index available?
	if (!Array.isArray(num) || num[i] === undefined) {
		console.error('Num array or the required index is not available.');
		return null;
	}

	// Display
	return (
		<div className='list'>
			<h4 className='contents'>
				<span
					onClick={() => {
						if (modal && modalTitle === itemId) {
							setModal(false);
						} else {
							setModalTitle(itemId);
							setModal(true);
						}
					}}>
					<p className='title'>{item.title}</p>
				</span>
				<i
					className={num[i] > 0 ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
					onClick={() => {
						// Derive the index using itemId
						const itemIndex = items.findIndex((it) => it.timestamp === itemId);
						if (itemIndex === -1) {
							console.log('no item found');
							return; // Exit if item is not found
						}

						// Increment the likes count for this specific item
						const updatedNum = [...num];
						updatedNum[itemIndex] += 1;
						setNum(updatedNum);

						// Update the liked status
						const updatedIsLiked = [...isLiked];
						updatedIsLiked[itemIndex] = true; // Since the item is liked now
						setIsLiked(updatedIsLiked);

						// Log the status of the item but this don't get updated version
						// So, I used UseEffect to log the updated version on the top of the component.
						// console.log('Hearted itemId:', itemId, 'among', num, 'posts.');
						// console.log(
						//   'Heart is clicked more than once(Last one is not counted):',
						//   isLiked
						// );
					}}></i>
				<span className='like-count decoration-sky-600'>{num[i]}</span>

				<i
					className='fa-regular fa-trash-can'
					onClick={() => {
						const itemIndex = items.findIndex(
							(item) => item.timestamp === itemId
						);
						// Which item is deleted?
						console.log(
							'Deleted itemIndex:',
							itemIndex,
							'itemID number:',
							itemId
						);

						/////////////////////////////////////////
						// Delete the item from the array ///////
						// 1. copy the array  ///////////////////
						// 2. remove the item using index ////////
						// 3. update the arrays with removed item/
						//////////////////////////////////////////

						if (itemIndex !== -1) {
							const updatedItems = [...items];
							console.log('Items before deletion:', updatedItems.length);
							updatedItems.splice(itemIndex, 1);
							setItems(updatedItems);
							console.log('Items left after deletion:', items.length - 1);

							const updatedIsLiked = [...isLiked];
							updatedIsLiked.splice(itemIndex, 1);
							setIsLiked(updatedIsLiked);

							const updatedNum = [...num];
							updatedNum.splice(itemIndex, 1);
							setNum(updatedNum);
						}
					}}></i>
			</h4>
			<p className='date'>
				{new Date()
					.toLocaleString('en-US', {
						weekday: 'short',
						month: 'short',
						day: '2-digit',
						year: 'numeric',
					})
					.replace(/\//g, '-')}
			</p>
			<hr />
		</div>
	);
};

export default ListItem;
