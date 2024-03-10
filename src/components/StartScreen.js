import React from 'react';
import '../css/StartScreen.css';

const StartScreen = () => {
	return (
		<div>
			<div className='block1'>
				<h1>Welcome to SimpleGifts</h1>
				<p>
					A simple yet powerful tool for managing your notes or quick ideas.
					This app is designed to help you keep track of important memos, ideas,
					or notes with ease. Here's how to get started:
				</p>
				<ol>
					<li>
						<strong>Adding a New Note</strong>: Click on the rounded '+' button
						located at the bottom right corner of the screen to open a modal. In
						the modal, you'll find two input areas: one for the title and
						another for the details of your note.
					</li>
					<li>
						<strong>Formatting Details</strong>: In the details section,{' '}
						<p className='codeSample'>
							you can use triple backticks (```) to start and end a block of
							code.{' '}
						</p>
						This feature allows you to format your writing in a code-like style,
						making it easier to read and distinguish from regular text.
					</li>{' '}
					<li>
						<strong>Saving Your Note</strong>: Once you've filled in the title
						and details, click the save button to add your note to the list of
						memos displayed on the screen.
					</li>{' '}
					<li>
						<strong>Marking Notes as Important</strong>: To mark a note as
						important, simply click on the heart icon next to the note. This
						will highlight the note, making it stand out from the rest.
					</li>{' '}
					<li>
						<strong>Deleting Notes</strong>: If you need to remove a note, click
						on the trash icon next to the note. This will delete the note from
						your list.
					</li>{' '}
					<li>
						<strong>Clearing All Notes</strong>: For a fresh start, click on the
						trash icon located at the top left corner of the screen. This will
						remove all notes from your list.
					</li>{' '}
				</ol>{' '}
				<p>
					Please note that this app is currently not linked to a database, so
					your notes will not be saved beyond the current session. However, this
					app is a great demonstration of React skills and will be enhanced with
					MongoDB integration in the future.
				</p>{' '}
			</div>
		</div>
	);
};

export default StartScreen;
