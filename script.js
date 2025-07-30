// script.js

document.addEventListener('DOMContentLoaded', function () {
    const scrolledHeader = document.getElementById('scrolled-header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const serviceTabs = document.querySelectorAll('.service-tab');
    const propertyCardsInnerContainer = document.getElementById('property-cards-inner-container');
    const propertyDetailOverlay = document.getElementById('property-detail-overlay');
    const closeDetailBtn = document.getElementById('close-detail-btn');

    // Contact Us form elements
    const inquiryForm = document.getElementById('inquiryForm');
    const formMessage = document.getElementById('formMessage');

    // Property data - Generate 40 entries (20 residential, 20 commercial)
    const properties = [];
    const baseImages = [
        "./images/featured-1.jpg", "./images/featured-2.jpg", "./images/featured-3.jpg",
        "./images/featured-4.jpg", "./images/featured-5.jpg", "./images/featured-6.jpg",
        "./images/property-7.jpg", "./images/property-8.jpg", "./images/property-6.jpg"
    ];

    // Generate 20 Residential Properties
    for (let i = 1; i <= 20; i++) {
        let status;
        let titlePrefix = "Residential";
        let descriptionBase;
        let featuresBase;
        let category;

        if (i % 2 === 0) { // Even IDs for rent
            status = "for rent";
            descriptionBase = "Comfortable apartment for rent";
            featuresBase = ["2 Beds", "1 Bath", "Balcony"];
            category = "for rent";
        } else { // Odd IDs for sell/buy
            status = "for sell";
            descriptionBase = "Spacious family home for sale";
            featuresBase = ["3 Beds", "2 Baths", "Modern Kitchen"];
            category = "for sell";
            if (i % 3 === 0) { // Every 3rd residential property can be 'for buy'
                category = "for buy";
            }
        }

        properties.push({
            id: i,
            image: baseImages[(i - 1) % baseImages.length],
            timeAgo: `${Math.floor(Math.random() * 30) + 1} days ago`,
            status: status,
            category: category,
            type: "residential",
            title: `${titlePrefix} ${i}: ${descriptionBase.split(' ')[0]}`,
            description: `${descriptionBase} with excellent amenities. Located in a prime area.`,
            features: featuresBase.concat([`Feature A${i}`, `Feature B${i}`])
        });
    }

    // Generate 20 Commercial Properties
    for (let i = 21; i <= 40; i++) {
        let status;
        let titlePrefix = "Commercial";
        let descriptionBase;
        let featuresBase;
        let category;

        if (i % 2 === 0) { // Even IDs for rent/lease
            status = "for rent";
            descriptionBase = "Modern office space for rent";
            featuresBase = ["Open Plan", "Conference Room", "High-Speed Internet"];
            category = "for rent";
            if (i % 4 === 0) { // Every 4th commercial property can be 'for lease'
                category = "for lease";
            }
        } else { // Odd IDs for sell
            status = "for sell";
            descriptionBase = "Prime commercial property for sale";
            featuresBase = ["Retail Space", "Ample Parking", "High Foot Traffic"];
            category = "for sell";
        }

        properties.push({
            id: i,
            image: baseImages[(i - 21) % baseImages.length], // Cycle through images for commercial
            timeAgo: `${Math.floor(Math.random() * 30) + 1} days ago`,
            status: status,
            category: category,
            type: "commercial",
            title: `${titlePrefix} ${i - 20}: ${descriptionBase.split(' ')[0]}`,
            description: `${descriptionBase} with excellent facilities. Ideal for business growth.`,
            features: featuresBase.concat([`Feature C${i}`, `Feature D${i}`])
        });
    }


    // Header scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            scrolledHeader.classList.add('bg-gray-900', 'bg-opacity-90', 'shadow-lg');
            scrolledHeader.classList.remove('bg-transparent');
        } else {
            scrolledHeader.classList.remove('bg-gray-900', 'bg-opacity-90', 'shadow-lg');
            scrolledHeader.classList.add('bg-transparent');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        hamburger.classList.toggle('open'); // Toggle class for hamburger animation
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('open');
        });
    });

    // Function to render property cards (re-usable for all sections)
    function renderPropertyCards(containerElement, filteredProperties) {
        containerElement.innerHTML = ''; // Clear previous cards
        if (filteredProperties.length === 0) {
            containerElement.innerHTML = '<p class="text-center text-gray-400 w-full">No properties found for this category.</p>';
            return;
        }

        filteredProperties.forEach(property => {
            const card = document.createElement('div');
            card.classList.add(
                'bg-gray-800', 'rounded-lg', 'shadow-xl', 'overflow-hidden',
                'transform', 'transition', 'hover:scale-105', 'hover:shadow-2xl',
                'property-card-shadow', 'w-80', 'flex-shrink-0', // Added flex-shrink-0 for horizontal scrolling
                'cursor-pointer', 'mx-4' // Added mx-4 for spacing in carousel
            );
            card.dataset.propertyId = property.id; // Store property ID for detail view

            const limitedFeaturesHtml = property.features.slice(0, 2).map(feature => `<li class="text-gray-400 text-sm mb-1">${feature}</li>`).join('');

            card.innerHTML = `
                <img src="${property.image}" alt="${property.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-xs text-gray-500">${property.timeAgo}</span>
                        <span class="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">${property.status}</span>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">${property.title}</h3>
                    <p class="text-gray-300 text-sm mb-4 truncate">${property.description}</p>
                    <ul class="list-disc list-inside mb-4">
                        ${limitedFeaturesHtml}
                    </ul>
                    <span class="text-xs text-blue-400 hover:underline">Read More...</span>
                </div>
            `;
            containerElement.appendChild(card);

            card.addEventListener('click', () => showPropertyDetail(property.id));
        });
    }

    // Function to show property detail modal
    function showPropertyDetail(propertyId) {
        const property = properties.find(p => p.id === propertyId);
        if (!property) return;

        document.getElementById('detail-property-image').src = property.image;
        document.getElementById('detail-property-title').textContent = property.title;
        document.getElementById('detail-property-description').textContent = property.description;
        document.getElementById('detail-property-status').textContent = property.status;
        document.getElementById('detail-property-timeago').textContent = property.timeAgo;

        const featuresList = document.getElementById('detail-property-features');
        featuresList.innerHTML = ''; // Clear previous features
        property.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        // Set animated image (can be the same as main image or a different one)
        document.getElementById('detail-animated-image').src = property.image;

        propertyDetailOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Prevent background scrolling
    }

    // Close property detail modal
    closeDetailBtn.addEventListener('click', function () {
        propertyDetailOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden'); // Restore background scrolling
    });

    // Close modal if clicked outside (on the overlay itself)
    propertyDetailOverlay.addEventListener('click', function (event) {
        if (event.target === propertyDetailOverlay) {
            propertyDetailOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });

    // Services Section Tabs
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active state from all tabs
            serviceTabs.forEach(t => t.classList.remove('bg-blue-600', 'hover:bg-blue-700'));
            serviceTabs.forEach(t => t.classList.add('bg-gray-700', 'hover:bg-gray-600'));

            // Add active state to clicked tab
            this.classList.remove('bg-gray-700', 'hover:bg-gray-600');
            this.classList.add('bg-blue-600', 'hover:bg-blue-700');

            const category = this.dataset.category;
            let filteredProperties;
            if (category === 'featured') {
                // For featured, display a mix or a specific subset (e.g., first 8 properties)
                // Now ensuring we pick from both residential and commercial for "featured"
                filteredProperties = properties.slice(0, 4).concat(properties.slice(20, 24)); // 4 residential + 4 commercial
            } else if (category === 'for buy') {
                filteredProperties = properties.filter(prop => prop.category === 'for buy' || prop.status === 'for sell');
            } else {
                filteredProperties = properties.filter(prop => prop.category === category);
            }
            renderPropertyCards(propertyCardsInnerContainer, filteredProperties);
        });
    });


    // --- Generic Carousel Logic Function ---
    function createCarousel(carouselInnerId, tabSelector, propertyType) {
        const carouselInner = document.getElementById(carouselInnerId);
        const tabs = document.querySelectorAll(tabSelector);
        let currentIndex = 0;
        let carouselInterval;
        const scrollSpeed = 3000; // milliseconds

        function getItemsPerView() {
            if (window.innerWidth >= 1024) { // lg breakpoint
                return 3;
            } else if (window.innerWidth >= 768) { // md breakpoint
                return 2;
            } else { // small screens
                return 1;
            }
        }

        function updateCarousel() {
            const currentItemsPerView = getItemsPerView();
            const carouselItems = carouselInner.children;
            const totalItems = carouselItems.length;

            if (totalItems === 0) return; // No items to scroll

            // Calculate max index to scroll to without showing empty space
            const maxScrollIndex = Math.max(0, totalItems - currentItemsPerView);

            if (currentIndex > maxScrollIndex) {
                currentIndex = 0; // Loop back to the beginning
            }

            let itemWidth = carouselItems[0].offsetWidth;
            const style = window.getComputedStyle(carouselItems[0]);
            itemWidth += parseFloat(style.marginLeft) + parseFloat(style.marginRight);

            const offset = -currentIndex * itemWidth; // Adjusted to scroll by single item width

            carouselInner.style.transition = `transform ${scrollSpeed / 1000}s ease-in-out`;
            carouselInner.style.transform = `translateX(${offset}px)`;
        }

        function startCarousel() {
            clearInterval(carouselInterval); // Clear any existing interval
            carouselInterval = setInterval(() => {
                const currentItemsPerView = getItemsPerView();
                const carouselItems = carouselInner.children;
                const totalItems = carouselItems.length;
                if (totalItems === 0) return; // No items to scroll

                const maxScrollIndex = Math.max(0, totalItems - currentItemsPerView);

                currentIndex++;
                if (currentIndex > maxScrollIndex) {
                    currentIndex = 0; // Loop back to the beginning
                }
                updateCarousel();
            }, scrollSpeed + 500); // Wait a bit more than scroll time
        }

        // Reset and restart carousel when window is resized
        window.addEventListener('resize', () => {
            currentIndex = 0; // Reset index on resize
            updateCarousel();
            startCarousel();
        });

        // Pause on hover for carousel
        carouselInner.parentElement.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });

        carouselInner.parentElement.addEventListener('mouseleave', () => {
            startCarousel();
        });

        // Tab handling for this specific carousel
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active state from all tabs in this group
                tabs.forEach(t => t.classList.remove('bg-blue-600', 'hover:bg-blue-700'));
                tabs.forEach(t => t.classList.add('bg-gray-700', 'hover:bg-gray-600'));

                // Add active state to clicked tab
                this.classList.remove('bg-gray-700', 'hover:bg-gray-600');
                this.classList.add('bg-blue-600', 'hover:bg-blue-700');

                const category = this.dataset.category;
                let filteredPropertiesForCarousel;

                if (category === 'all') {
                    filteredPropertiesForCarousel = properties.filter(p => p.type === propertyType);
                } else if (category === 'for buy' || category === 'for lease') {
                    // Filter by specific category OR by status 'for sell' for 'buy' and 'lease'
                    filteredPropertiesForCarousel = properties.filter(p => p.type === propertyType && (p.category === category || p.status === 'for sell'));
                } else {
                    filteredPropertiesForCarousel = properties.filter(p => p.type === propertyType && p.category === category);
                }

                renderPropertyCards(carouselInner, filteredPropertiesForCarousel);
                currentIndex = 0; // Reset carousel position
                updateCarousel(); // Update immediately with new cards
                startCarousel(); // Restart carousel animation
            });
        });

        // Initial load: Trigger click on the 'All Properties' tab for this carousel
        const initialTab = document.querySelector(`${tabSelector}[data-category="all"][data-type="${propertyType}"]`);
        if (initialTab) {
            initialTab.click();
        }
    }

    // Call createCarousel for Residential and Commercial sections
    createCarousel('residential-property-carousel-inner', '.residential-tab', 'residential');
    createCarousel('commercial-property-carousel-inner', '.commercial-tab', 'commercial');


    // Automated Carousel for Featured Highlights (existing logic, adapted to new generic structure)
    const featuredCarouselInner = document.getElementById('carousel-inner');
    let featuredCurrentIndex = 0; // Renamed for clarity
    let featuredCarouselInterval; // Renamed for clarity
    const featuredScrollSpeed = 3000; // milliseconds

    function getFeaturedItemsPerView() {
        if (window.innerWidth >= 1024) { // lg breakpoint
            return 4;
        } else if (window.innerWidth >= 768) { // md breakpoint
            return 3;
        } else if (window.innerWidth >= 640) { // sm breakpoint
            return 2;
        } else { // extra small screens
            return 1;
        }
    }

    function updateFeaturedCarousel() {
        const currentItemsPerView = getFeaturedItemsPerView();
        const featuredCarouselItems = featuredCarouselInner.children;
        const totalItems = featuredCarouselItems.length;

        if (totalItems === 0) return;

        const maxScrollIndex = Math.max(0, totalItems - currentItemsPerView);

        if (featuredCurrentIndex > maxScrollIndex) {
            featuredCurrentIndex = 0;
        }

        let itemWidth = featuredCarouselItems[0].offsetWidth;
        const style = window.getComputedStyle(featuredCarouselItems[0]);
        itemWidth += parseFloat(style.marginLeft) + parseFloat(style.marginRight);

        const offset = -featuredCurrentIndex * itemWidth; // Adjusted to scroll by single item width

        featuredCarouselInner.style.transition = `transform ${featuredScrollSpeed / 1000}s ease-in-out`;
        featuredCarouselInner.style.transform = `translateX(${offset}px)`;
    }

    function startFeaturedCarousel() {
        clearInterval(featuredCarouselInterval);
        featuredCarouselInterval = setInterval(() => {
            const currentItemsPerView = getFeaturedItemsPerView();
            const featuredCarouselItems = featuredCarouselInner.children;
            const totalItems = featuredCarouselItems.length;
            if (totalItems === 0) return;

            const maxScrollIndex = Math.max(0, totalItems - currentItemsPerView);

            featuredCurrentIndex++;
            if (featuredCurrentIndex > maxScrollIndex) {
                featuredCurrentIndex = 0;
            }
            updateFeaturedCarousel();
        }, featuredScrollSpeed + 500);
    }

    window.addEventListener('resize', () => {
        featuredCurrentIndex = 0;
        updateFeaturedCarousel();
        startFeaturedCarousel();
    });

    // Initial call to set up and start featured carousel
    updateFeaturedCarousel();
    startFeaturedCarousel();


    // Contact Form - WhatsApp integration
    inquiryForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const userName = this.user_name.value;
        const userEmail = this.user_email.value;
        const userPhone = this.user_phone.value;
        const userSubject = this.user_subject.value;
        const inquiryType = this.inquiry_type.value;
        const userMessage = this.user_message.value;

        const whatsappMessage = `Hello BanshVatika Real Estate,

I am ${userName}.
Email: ${userEmail}
Phone: ${userPhone}

Subject: ${userSubject}
Inquiry Type: ${inquiryType}

Message:
${userMessage}

I am interested in discussing this further.`;

        // Encode the message for a URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '918451980807'; // Replace with your WhatsApp number including country code

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank'); // Open WhatsApp in a new tab

        formMessage.textContent = 'Redirecting to WhatsApp...';
        formMessage.style.color = '#4CAF50'; // Green color for success
        inquiryForm.reset(); // Clear form fields
    });

    // Function to scroll to the Contact Us section
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

});
// Get the scroll-to-top button
const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

// Show or hide the scroll-to-top button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = 'flex'; // Use flex to center icon
    } else {
        scrollToTopBtn.style.display = 'none';
    }
};

// Scroll to the top of the document when the button is clicked
scrollToTopBtn.onclick = function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
