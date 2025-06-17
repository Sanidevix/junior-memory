
	class MemoryGame {
		constructor() {
			this.cards = [];
			this.flippedCards = [];
			this.matchedPairs = 0;
			this.moves = 0;
			this.gameStarted = false;
			this.gameMode = 'classic';
			this.timer = 0;
			this.gameTimer = null;
			this.customImages = [];
			this.directoryImages = [];
			
			this.defaultEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐷', '🐮', '🐧', '🐔', '🐢', '🦄', '🐠'];
			this.imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
			
			this.initializeEventListeners();
		}

		initializeEventListeners() {
			document.getElementById('gameMode').addEventListener('change', (e) => {
				this.gameMode = e.target.value;
				this.toggleTimeInputs();
			});

			document.getElementById('imageInput').addEventListener('change', (e) => {
				this.handleImageUpload(e);
			});

			document.getElementById('rows').addEventListener('change', () => this.validateBoard());
			document.getElementById('cols').addEventListener('change', () => this.validateBoard());
		}

		toggleTimeInputs() {
			const flashTime = document.getElementById('flashTime');
			const gameTime = document.getElementById('gameTime');
			
			flashTime.disabled = this.gameMode !== 'flash';
			gameTime.disabled = this.gameMode !== 'timed';
		}

		validateBoard() {
			const rows = parseInt(document.getElementById('rows').value);
			const cols = parseInt(document.getElementById('cols').value);
			const total = rows * cols;
			
			if (total % 2 !== 0) {
				if (cols > rows) {
					document.getElementById('cols').value = cols - 1;
				} else {
					document.getElementById('rows').value = rows - 1;
				}
			}
		}

		handleImageUpload(event) {
			const files = Array.from(event.target.files);
			this.customImages = [];
			const preview = document.getElementById('imagePreview');
			preview.innerHTML = '';

			files.forEach((file, index) => {
				if (file.type.startsWith('image/')) {
					const reader = new FileReader();
					reader.onload = (e) => {
						this.customImages.push(e.target.result);
						
						const img = document.createElement('img');
						img.src = e.target.result;
						img.className = 'preview-img';
						img.alt = `Imagen ${index + 1}`;
						preview.appendChild(img);
					};
					reader.readAsDataURL(file);
				}
			});
		}

		async loadDirectoryImages() {
			try {
				this.directoryImages = [];
				const preview = document.getElementById('imagePreview');
				preview.innerHTML = '<p>Cargando imágenes del directorio...</p>';

				// Lista de nombres de imágenes comunes que podrían estar en el directorio imgs
				const commonImageNames = [
					'arce', 'bellotas', 'bichito', 'caballito', 'caracola_circ', 'castana', 'cerezas', 'ciruela', 'coco', 'conchacono',
					'conchacono2', 'estrella', 'flor', 'guisantes', 'hojitas', 'hoja2', 'huevo', 'judia', 'limon', 'manzana',
					'margarita', 'melocoton', 'morpho', 'naranja', 'patata', 'pera', 'pina', 'platano', 'pluma', 'roble',
					'rosa', 'tomate', 'trebol', 'vacaloura', 'vieira', 'volvoreta'];

				let loadedCount = 0;
				const maxImages = 36; // Límite para evitar demasiadas peticiones
				const maxPreviewImages = 20; // Límite para evitar demasiadas imagenes de previsualización

				for (let name of commonImageNames) {
					if (loadedCount >= maxImages) break;
					
					for (let ext of this.imageExtensions) {
						try {
							const imgPath = `imgs/${name}.${ext}`;
							const img = new Image();
							
							await new Promise((resolve, reject) => {
								img.onload = () => {
									this.directoryImages.push(imgPath);
									loadedCount++;
									
									if(loadedCount <= maxPreviewImages)
									{
										// Agregar a la vista previa
										const previewImg = document.createElement('img');
										previewImg.src = imgPath;
										previewImg.className = 'preview-img';
										previewImg.alt = name;
										preview.appendChild(previewImg);
									}
									
									resolve();
								};
								img.onerror = () => reject();
								img.src = imgPath;
							});
							break; // Si encontró la imagen con esta extensión, no probar otras
						} catch (error) {
							continue; // Probar siguiente extensión
						}
					}
				}

				if (this.directoryImages.length === 0) {
					preview.innerHTML = `
						<p style="color: #666; text-align: center; margin: 20px 0;">
							⚠️ No se encontraron imágenes en el directorio /imgs<br>
							<small>Asegúrate de tener imágenes con nombres como: img1.jpg, cat.png, etc.</small>
						</p>
					`;
				} else {
					const infoDiv = document.createElement('div');
					infoDiv.style.textAlign = 'center';
					infoDiv.style.marginTop = '10px';
					infoDiv.style.color = '#666';
					infoDiv.innerHTML = `✅ Se cargaron ${this.directoryImages.length} imágenes del directorio`;
					preview.insertBefore(infoDiv, preview.firstChild);
				}

			} catch (error) {
				console.error('Error cargando imágenes del directorio:', error);
				document.getElementById('imagePreview').innerHTML = `
					<p style="color: #e74c3c; text-align: center; margin: 20px 0;">
						❌ Error al cargar imágenes del directorio /imgs<br>
						<small>Verifica que el directorio existe y contiene imágenes válidas</small>
					</p>
				`;
			}
		}

		createBoard() {
			const rows = parseInt(document.getElementById('rows').value);
			const cols = parseInt(document.getElementById('cols').value);
			const totalCards = rows * cols;
			const pairsNeeded = totalCards / 2;

			// Seleccionar imágenes/emojis
			let symbols;
			if (this.directoryImages.length >= pairsNeeded) {
				//Barajar el Array
				this.directoryImages= this.shuffleArray(this.directoryImages);
				symbols = this.directoryImages.slice(0, pairsNeeded);
			} else if (this.customImages.length >= pairsNeeded) {
				//Barajar el Array
				this.customImages = this.shuffleArray(this.customImages);
				symbols = this.customImages.slice(0, pairsNeeded);
			} else {
				//Barajar el Array
				this.defaultEmojis = this.shuffleArray(this.defaultEmojis);
				symbols = this.defaultEmojis.slice(0, pairsNeeded);
			}

			// Crear pares y mezclar
			this.cards = [];
			symbols.forEach(symbol => {
				this.cards.push({ symbol, isFlipped: false, isMatched: false });
				this.cards.push({ symbol, isFlipped: false, isMatched: false });
			});

			this.shuffleCards();
			this.renderBoard(rows, cols);
		}

		shuffleCards() {
			for (let i = this.cards.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
			}
		}

		renderBoard(rows, cols) {
			const board = document.getElementById('gameBoard');
			board.innerHTML = '';
			board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
			board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

			this.cards.forEach((card, index) => {
				const cardElement = this.createCardElement(card, index);
				board.appendChild(cardElement);
			});
		}

		createCardElement(card, index) {
			const cardDiv = document.createElement('div');
			cardDiv.className = 'card';
			cardDiv.onclick = () => this.flipCard(index);

			const cardBack = document.createElement('div');
			cardBack.className = 'card-face card-back';
			cardBack.textContent = '?';

			const cardFront = document.createElement('div');
			cardFront.className = 'card-face card-front';

			if (typeof card.symbol === 'string' && (card.symbol.startsWith('data:') || card.symbol.startsWith('imgs/'))) {
				const img = document.createElement('img');
				img.src = card.symbol;
				img.alt = 'Carta';
				cardFront.appendChild(img);
			} else {
				cardFront.textContent = card.symbol;
			}

			cardDiv.appendChild(cardBack);
			cardDiv.appendChild(cardFront);

			return cardDiv;
		}

		flipCard(index) {
			if (!this.gameStarted || this.flippedCards.length >= 2) return;
			
			const card = this.cards[index];
			if (card.isFlipped || card.isMatched) return;

			card.isFlipped = true;
			this.flippedCards.push(index);
			
			const cardElement = document.querySelectorAll('.card')[index];
			cardElement.classList.add('flipped');

			if (this.flippedCards.length === 2) {
				this.moves++;
				document.getElementById('moves').textContent = this.moves;
				
				setTimeout(() => this.checkMatch(), 1000);
			}
		}

		checkMatch() {
			const [first, second] = this.flippedCards;
			const firstCard = this.cards[first];
			const secondCard = this.cards[second];

			if (firstCard.symbol === secondCard.symbol) {
				firstCard.isMatched = true;
				secondCard.isMatched = true;
				this.matchedPairs++;

				const cardElements = document.querySelectorAll('.card');
				cardElements[first].classList.add('matched');
				cardElements[second].classList.add('matched');

				document.getElementById('pairs').textContent = this.matchedPairs;

				if (this.matchedPairs === this.cards.length / 2) {
					this.endGame(true);
				}
			} else {
				firstCard.isFlipped = false;
				secondCard.isFlipped = false;

				const cardElements = document.querySelectorAll('.card');
				cardElements[first].classList.remove('flipped');
				cardElements[second].classList.remove('flipped');
			}

			this.flippedCards = [];
		}

		startGame() {
			this.resetGame();
			this.createBoard();
			this.gameStarted = true;

			if (this.gameMode === 'flash') {
				this.startFlashMode();
			} else if (this.gameMode === 'timed') {
				this.startTimedMode();
			} else {
				this.startTimer();
			}
		}

		startFlashMode() {
			const flashTime = parseInt(document.getElementById('flashTime').value) * 1000;
			const overlay = document.getElementById('flashOverlay');
			
			// Mostrar todas las cartas
			const cardElements = document.querySelectorAll('.card');
			cardElements.forEach(card => card.classList.add('flipped'));
			
			overlay.style.display = 'flex';
			
			setTimeout(() => {
				cardElements.forEach(card => card.classList.remove('flipped'));
				overlay.style.display = 'none';
				this.startTimer();
			}, flashTime);
		}

		startTimedMode() {
			const gameTime = parseInt(document.getElementById('gameTime').value);
			this.timer = gameTime;
			this.updateTimerDisplay();
			
			this.gameTimer = setInterval(() => {
				this.timer--;
				this.updateTimerDisplay();
				
				if (this.timer <= 0) {
					this.endGame(false);
				}
			}, 1000);
		}

		startTimer() {
			this.timer = 0;
			this.gameTimer = setInterval(() => {
				this.timer++;
				this.updateTimerDisplay();
			}, 1000);
		}

		updateTimerDisplay() {
			const minutes = Math.floor(this.timer / 60);
			const seconds = this.timer % 60;
			document.getElementById('timer').textContent = 
				`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		}

		endGame(won) {
			this.gameStarted = false;
			clearInterval(this.gameTimer);
			
			setTimeout(() => {
				if (won) {
					alert(`¡Felicidades! Has ganado en ${this.moves} movimientos y ${document.getElementById('timer').textContent}`);
				} else {
					alert('¡Se acabó el tiempo! Inténtalo de nuevo.');
				}
			}, 500);
		}

		resetGame() {
			this.cards = [];
			this.flippedCards = [];
			this.matchedPairs = 0;
			this.moves = 0;
			this.gameStarted = false;
			this.timer = 0;
			
			if (this.gameTimer) {
				clearInterval(this.gameTimer);
			}

			document.getElementById('moves').textContent = '0';
			document.getElementById('pairs').textContent = '0';
			document.getElementById('timer').textContent = '00:00';
		}
		
		shuffleArray(array) {
		  let currentIndex = array.length; // Empieza desde el final del array
		  let randomIndex;

		  // Mientras queden elementos por mezclar
		  while (currentIndex !== 0) {
			// Selecciona un elemento restante
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// Intercambia el elemento actual con el elemento aleatorio
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		  }

		  return array;
		}
	}

	// Instancia global del juego
	const game = new MemoryGame();

	// Funciones globales para los botones
	function startGame() {
		game.startGame();
	}

	function openImageModal() {
		document.getElementById('imageModal').style.display = 'flex';
	}

	function closeImageModal() {
		document.getElementById('imageModal').style.display = 'none';
	}

	function useCustomImages() {
		const totalImages = game.customImages.length + game.directoryImages.length;
		if (totalImages < 8) {
			alert('Necesitas al menos 8 imágenes para jugar.');
			return;
		}
		closeImageModal();
	}

	function useDefaultImages() {
		game.customImages = [];
		game.directoryImages = [];
		closeImageModal();
	}

	function loadDirectoryImages() {
		game.loadDirectoryImages();
	}

	// Inicializar el juego al cargar la página
	game.toggleTimeInputs();