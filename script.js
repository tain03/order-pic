// Game configuration
  const config = {
    totalImages: 5,
    imageSize: 140,
    correctOrder: [0, 3, 2, 4, 1], // Correct order: 1, 4, 3, 5, 2
  }
  
  // Game state
  let attempts = 0
  let draggedItem = null
  let currentConfig = null; // Store the current configuration
  
  // Initialize the game
  function initGame() {
    setupDragAndDrop()
    createBubbles()
  
    // Add button event listeners
    document.getElementById("checkBtn").addEventListener("click", checkArrangement)
  }
  
  // Setup drag and drop functionality
  function setupDragAndDrop() {
    const images = document.querySelectorAll(".image-item")
    const slots = document.querySelectorAll(".slot")
  
    // Add drag event listeners to images
    images.forEach((img) => {
      img.addEventListener("dragstart", handleDragStart)
      img.addEventListener("dragend", handleDragEnd)
    })
  
    // Add drop event listeners to slots
    slots.forEach((slot) => {
      slot.addEventListener("dragover", handleDragOver)
      slot.addEventListener("dragleave", handleDragLeave)
      slot.addEventListener("drop", handleDrop)
    })
  }
  
  // Create random bubbles
  function createBubbles() {
    const gameContainer = document.querySelector(".game-container")
    const bubbleCount = 15
  
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div")
      bubble.className = "bubble"
  
      // Random size between 10px and 40px
      const size = Math.floor(Math.random() * 30) + 10
      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`
  
      // Random position
      const posX = Math.floor(Math.random() * 100)
      const posY = Math.floor(Math.random() * 100)
      bubble.style.left = `${posX}%`
      bubble.style.top = `${posY}%`
  
      // Random animation delay
      const delay = Math.random() * 5
      bubble.style.animationDelay = `${delay}s`
  
      gameContainer.appendChild(bubble)
    }
  }
  
  // Load configuration from management interface
  function loadConfiguration(config) {
    currentConfig = config; // Store the current configuration
    const sourcePanel = document.getElementById("sourcePanel")
    const slotsContainer = document.getElementById("slotsContainer")
  
    // Clear existing content
    sourcePanel.innerHTML = ""
    slotsContainer.innerHTML = ""
  
    // Create slots
    for (let i = 0; i < config.totalImages; i++) {
      const slot = document.createElement("div")
      slot.className = "slot"
      slot.dataset.index = i
      slotsContainer.appendChild(slot)
    }
  
    // Create images
    config.images.forEach((image, index) => {
      const numberedImage = document.createElement("div")
      numberedImage.className = "numbered-image"
      const numberBadge = document.createElement("div")
      numberBadge.className = "number-badge"
      numberBadge.textContent = Number(image.order) + 1
      numberedImage.appendChild(numberBadge)
  
      const img = document.createElement("img")
      img.src = image.url
      img.className = "image-item"
      img.draggable = true
      img.dataset.correctIndex = image.order
      img.dataset.currentIndex = index
      img.alt = image.name || `Image ${index + 1}`
      numberedImage.appendChild(img)
      sourcePanel.appendChild(numberedImage)
  
      // Add drag event listeners
      img.addEventListener("dragstart", handleDragStart)
      img.addEventListener("dragend", handleDragEnd)
    })
  
    // Add drop event listeners to slots
    document.querySelectorAll(".slot").forEach((slot) => {
      slot.addEventListener("dragover", handleDragOver)
      slot.addEventListener("dragleave", handleDragLeave)
      slot.addEventListener("drop", handleDrop)
    })
  
    // Add button event listeners
    document.getElementById("checkBtn").addEventListener("click", checkArrangement)
  }
  
  // Drag and drop handlers
  function handleDragStart(e) {
    const parent = this.closest(".numbered-image") || this.parentNode
    draggedItem = this
    this.style.opacity = "0.5"
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", this.dataset.correctIndex)
  
    // Add a class to the body to indicate dragging state
    document.body.classList.add("dragging")
  }
  
  function handleDragEnd(e) {
    this.style.opacity = "1"
    document.querySelectorAll(".slot").forEach((slot) => {
      slot.classList.remove("dragover")
    })
  
    // Remove dragging state
    document.body.classList.remove("dragging")
  }
  
  function handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    this.classList.add("dragover")
  }
  
  function handleDragLeave(e) {
    this.classList.remove("dragover")
  }
  
  function handleDrop(e) {
    e.preventDefault()
    this.classList.remove("dragover")
  
    if (this.children.length > 0) {
      // If slot has an image, don't allow drop
      return
    }
  
    // Get the original parent (numbered-image div)
    const originalParent = draggedItem.closest(".numbered-image") || draggedItem.parentNode
  
    // If the image is already in a slot, move it back to source panel
    if (draggedItem.parentNode.classList.contains("slot")) {
      draggedItem.parentNode.classList.remove("filled")
    }
  
    // Move the image to the slot
    this.appendChild(draggedItem)
    this.classList.add("filled")
  
    // Add a subtle animation
    draggedItem.animate([{ transform: "scale(0.95)" }, { transform: "scale(1)" }], {
      duration: 200,
      easing: "ease-out",
    })
  }
  
  // Game logic
  function checkArrangement() {
    attempts++
    document.getElementById("attemptsCount").textContent = attempts
  
    const slots = document.querySelectorAll(".slot")
    const sourcePanel = document.getElementById("sourcePanel")
    let isCorrect = true
    let filledSlots = 0
  
    slots.forEach((slot) => {
      const image = slot.children[0]
      if (!image) {
        isCorrect = false
      } else {
        filledSlots++
        // Get the slot index
        const slotIndex = Number(slot.dataset.index)
        // Get the correct image index for this slot from correctOrder
        const correctImageIndex = currentConfig.correctOrder[slotIndex]
        // Check if the image's correctIndex matches the expected image index
        if (Number(image.dataset.correctIndex) !== correctImageIndex) {
          isCorrect = false
        }
      }
    })
  
    const message = document.getElementById("message")
    message.style.display = "block"
  
    if (filledSlots < slots.length) {
      message.className = "message error"
      message.textContent = "Please place all images in the slots!"
      setTimeout(() => {
        message.style.display = "none"
      }, 3000)
      return
    }
  
    if (isCorrect) {
      message.className = "message success"
      message.textContent = "Congratulations! You arranged the images correctly!"
      // Add celebration effect
      createBubbleBurst()
    } else {
      message.className = "message error"
      message.textContent = "Incorrect arrangement. Resetting slots!"
      setTimeout(() => {
        message.style.display = "none"
        // Collect all images from slots
        const images = []
        slots.forEach((slot) => {
          const image = slot.children[0]
          if (image) {
            images.push(image)
            slot.classList.remove("filled")
          }
        })
  
        // Clear the source panel
        sourcePanel.innerHTML = ""
  
        // Sort images by their correct index to maintain original order
        images.sort((a, b) => Number(a.dataset.correctIndex) - Number(b.dataset.correctIndex))
  
        // Rebuild the source panel with sorted images
        images.forEach((image) => {
          const numberedImage = document.createElement("div")
          numberedImage.className = "numbered-image"
          const numberBadge = document.createElement("div")
          numberBadge.className = "number-badge"
          numberBadge.textContent = Number(image.dataset.correctIndex) + 1
          numberedImage.appendChild(numberBadge)
          numberedImage.appendChild(image)
          sourcePanel.appendChild(numberedImage)
        })
      }, 3000)
    }
  }
  
  // Create bubble burst animation for success
  function createBubbleBurst() {
    const gameContainer = document.querySelector(".game-container")
    const bubbleCount = 30
  
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div")
      bubble.className = "bubble"
  
      // Random size between 10px and 40px
      const size = Math.floor(Math.random() * 30) + 10
      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`
  
      // Start from bottom center
      bubble.style.left = `${Math.random() * 80 + 10}%`
      bubble.style.bottom = "0"
      bubble.style.top = "auto"
  
      // Random animation duration
      const duration = Math.random() * 3 + 2
      bubble.style.animation = `float ${duration}s ease-out forwards`
  
      gameContainer.appendChild(bubble)
  
      // Remove bubble after animation
      setTimeout(() => {
        bubble.remove()
      }, duration * 1000)
    }
  }
  
  // Initialize the game when the page loads
  window.addEventListener("load", initGame)