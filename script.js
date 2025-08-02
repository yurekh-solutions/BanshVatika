// script.js

document.addEventListener('DOMContentLoaded', function () {
    const scrolledHeader = document.getElementById('scrolled-header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContentContainer = document.getElementById('property-cards-inner-container'); // Renamed for clarity
    const propertyDetailOverlay = document.getElementById('property-detail-overlay');
    const closeDetailBtn = document.getElementById('close-detail-btn');

    // Contact Us form elements
    const inquiryForm = document.getElementById('inquiryForm');
    const formMessage = document.getElementById('formMessage');

    // Property data - Generate 50 entries (25 residential, 25 commercial)
    const properties = [];
    const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];

    // User-provided images (for initial few properties in the Service section)
    // These are used for the static service content, not the carousels directly
    const userImages = {
        residential1:         "./images/property-6.jpg",

        residential2:         "./images/property-4.jpg",

        residential3:         "./images/property-2.jpg",

        commercial1:         "./images/property-5.jpg",

        generalProperty:         "./images/property-1.jpg", // Example from your previous list

    };

    // >>> YOUR ACTUAL REAL ESTATE IMAGE URLs GO HERE <<<
    // These arrays will be used for the Residential and Commercial Properties carousels.
    // Ensure these paths are correct relative to your index.html file.
    const myResidentialImages = [
        "./images/property-1.jpg", // Example from your previous list
        "./images/property-2.jpg",
        "./images/property-3.jpg",
        "./images/property-4.jpg",
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/property-7.jpg",
         "./images/featured-1.jpg",
        "./images/featured-2.jpg",
        "./images/featured-3.jpg",
        "./images/featured-5.jpg",
        "./images/featured-4.jpg",
        "./images/featured-6.jpg",
        "./images/property-9.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",
        "./images/property-4.jpg", // Mixing with general property images for variety
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",
         "./images/featured-1.jpg",
        "./images/featured-2.jpg",
        "./images/featured-3.jpg",
        "./images/featured-5.jpg",
        "./images/featured-4.jpg",
        "./images/featured-6.jpg",
        "./images/property-1.jpg", // Example from your previous list
        "./images/property-2.jpg",
        "./images/property-3.jpg",
        "./images/property-4.jpg",
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/property-7.jpg",
        "./images/property-9.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",

    ];

    const myCommercialImages = [
        "./images/property-4.jpg", // Mixing with general property images for variety
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",
        "./images/property-1.jpg", // Example from your previous list
        "./images/property-2.jpg",
        "./images/property-3.jpg",
        "./images/property-4.jpg",
        "./images/property-5.jpg",
         "./images/featured-1.jpg",
        "./images/featured-2.jpg",
        "./images/featured-3.jpg",
        "./images/featured-5.jpg",
        "./images/featured-4.jpg",
        "./images/featured-6.jpg",
        "./images/property-6.jpg",
         "./images/featured-1.jpg",
        "./images/featured-2.jpg",
        "./images/featured-3.jpg",
        "./images/featured-5.jpg",
        "./images/featured-4.jpg",
        "./images/featured-6.jpg",
        "./images/property-7.jpg",
        "./images/property-9.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",
        "./images/property-4.jpg", // Mixing with general property images for variety
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",
        "./images/property-1.jpg", // Example from your previous list
        "./images/property-2.jpg",
        "./images/property-3.jpg",
        "./images/property-4.jpg",
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/property-7.jpg",
        "./images/property-9.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",

    ];

    const myFeaturedImages = [
        "./images/featured-1.jpg",
        "./images/featured-2.jpg",
        "./images/featured-3.jpg",
        "./images/featured-5.jpg",
        "./images/featured-4.jpg",
        "./images/featured-6.jpg",
        
        "./images/property-4.jpg", // Mixing with general property images for variety
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",

              
        "./images/property-4.jpg", // Mixing with general property images for variety
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",
        "./images/property-1.jpg", // Example from your previous list
        "./images/property-2.jpg",
        "./images/property-3.jpg",
        "./images/property-4.jpg",
        "./images/property-5.jpg",
        "./images/property-6.jpg",
        "./images/property-7.jpg",
        "./images/property-9.jpg",
        "./images/services-1.jpg",
        "./images/services-2.jpg",
        "./images/services-3.jpg",

    ];
    // <<< END OF YOUR CUSTOM IMAGE ARRAYS >>>


    // More realistic and diplomatic residential titles and descriptions
    const residentialTitles = [
        "Luxurious Downtown Apartment", "Expansive Suburban Villa", "Charming Family Bungalow",
        "Contemporary Penthouse Suite", "Serene Lakeside Cottage", "Elegant City Townhouse",
        "Modern Studio Flat", "Grand Estate with Lush Garden", "Riverside Duplex Residence",
        "Sophisticated Urban Loft", "Classic Heritage Home", "Secure Gated Community Residence"
    ];
    const residentialDescriptions = [
        "A meticulously designed residence offering unparalleled comfort and sophisticated style, ideal for discerning homeowners.",
        "Perfect for growing families seeking ample space, modern amenities, and a peaceful, well-established neighborhood.",
        "Experience contemporary living in this beautifully appointed home, featuring all essential amenities for a comfortable lifestyle.",
        "An exquisite property boasting breathtaking panoramic views and premium finishes, representing a prime investment opportunity.",
        "Ideal for those who appreciate tranquility and natural beauty, this home offers a serene retreat from urban life.",
        "Urban sophistication meets practical, elegant living in this prime location, offering convenience and upscale features.",
        "Contemporary design with an open-plan layout and integrated smart home features, perfect for modern urban dwellers.",
        "A private and serene retreat featuring lush green spaces and ample privacy, designed for ultimate relaxation and comfort.",
        "Spacious interiors combined with a vibrant community atmosphere, providing an ideal setting for family life and entertaining.",
        "This property offers strong investment potential, blending luxurious living with a desirable location and high appreciation prospects."
    ];

    // More realistic and diplomatic commercial titles and descriptions
    const commercialTitles = [
        "Prime Office Tower Space", "High-Traffic Retail Unit", "Modern Commercial Hub",
        "Advanced Industrial Warehouse Facility", "Executive Boutique Office Suite", "Prominent Commercial Showroom",
        "Flexible Co-working Space", "State-of-the-Art Medical Office Building", "Efficient Logistics Center", "Premium Restaurant Space"
    ];
    const commercialDescriptions = [
        "Strategically located for maximum business visibility and growth, offering a prestigious address for your enterprise.",
        "A spacious and versatile layout, perfectly suited for various commercial ventures seeking high foot traffic and accessibility.",
        "State-of-the-art facilities designed for modern enterprises, ensuring optimal productivity and a professional environment.",
        "Excellent connectivity and ample parking solutions, providing convenience for both clients and staff in a bustling commercial zone.",
        "A versatile space ideal for startups or expanding businesses, offering flexible configurations to meet diverse operational needs.",
        "Located in a high foot traffic area, this property is perfect for retail and customer engagement, promising strong commercial returns.",
        "Flexible office solutions with modern infrastructure, designed to foster collaboration and innovation for dynamic teams.",
        "A purpose-built facility optimized for efficient operations and storage, offering seamless logistics and robust security.",
        "This property presents a significant investment opportunity in a rapidly developing commercial district, promising strong rental yields.",
        "Designed for seamless business operations, this space combines strategic location with advanced amenities for unparalleled convenience."
    ];

    // Data for Featured Highlights carousel (titles and descriptions remain dynamic)
    const featuredHighlightsData = [
        { title: "Modern Family Home", description: "Spacious living in a prime location, perfect for families." },
        { title: "Luxury Apartment", description: "Elegant design with breathtaking city views." },
        { title: "Charming Villa", description: "A serene escape with a private garden." },
        { title: "Urban Penthouse", description: "Sophisticated living in the heart of the city." },
        { title: "Cozy Studio Apartment", description: "Ideal for singles or young professionals." },
        { title: "Spacious Commercial Office", description: "Prime location for your business growth." },
        { title: "Suburban Family Home", description: "Comfortable living with excellent amenities nearby." },
        { title: "Renovated Heritage Property", description: "A blend of classic charm and modern comfort." },
        { title: "High-Tech Office Suite", description: "Innovative workspace designed for efficiency." },
        { title: "Riverside Retreat", description: "Tranquil property with scenic water views." }
    ];

    // Helper function to get image URL for Residential/Commercial Properties (carousels)
    function getPropertyImage(type, index) {
        const width = 600;
        const height = 400;
        const genericPlaceholder = `https://placehold.co/${width}x${height}/CCCCCC/000000?text=Image+Missing`;

        if (type === 'residential') {
            // Use custom images first. If not available, use a generic placeholder.
            if (myResidentialImages.length > 0 && index - 1 < myResidentialImages.length) {
                return myResidentialImages[index - 1]; // index - 1 to match 0-based array
            }
            return genericPlaceholder;
        } else if (type === 'commercial') {
            // Use custom images first. If not available, use a generic placeholder.
            if (myCommercialImages.length > 0 && index - 1 < myCommercialImages.length) {
                return myCommercialImages[index - 1]; // index - 1 to match 0-based array
            }
            return genericPlaceholder;
        } else {
            return genericPlaceholder;
        }
    }

    // Helper function to get image URL for Featured Highlights (uses myFeaturedImages array)
    function getFeaturedHighlightImage(index) {
        const width = 600;
        const height = 400;
        const genericPlaceholder = `https://placehold.co/${width}x${height}/AAAAAA/000000?text=Featured+Image+Missing`;

        if (myFeaturedImages.length > 0 && index < myFeaturedImages.length) {
            return myFeaturedImages[index]; // index matches 0-based array
        }
        return genericPlaceholder;
    }


    // Generate 25 Residential Properties
    for (let i = 1; i <= 25; i++) {
        let status;
        let title;
        let description;
        let featuresBase;
        let category;
        let propertyType;
        let price;
        let area;
        let beds;
        let baths;

        title = residentialTitles[Math.floor(Math.random() * residentialTitles.length)];
        description = residentialDescriptions[Math.floor(Math.random() * residentialDescriptions.length)];


        if (i % 2 === 0) { // Even IDs for rent
            status = "for rent";
            featuresBase = ["2 Beds", "1 Bath", "Balcony"];
            category = "for rent";
            propertyType = "Apartment";
            price = `₹${(Math.floor(Math.random() * 20) + 10) * 1000}`; // 10k-30k
            area = `${Math.floor(Math.random() * 400) + 600} sqft`; // 600-1000 sqft
            beds = Math.floor(Math.random() * 2) + 1; // 1-2 beds
            baths = Math.floor(Math.random() * 1) + 1; // 1 bath
        } else { // Odd IDs for sell/buy
            status = "for sell";
            featuresBase = ["3 Beds", "2 Baths", "Modern Kitchen"];
            category = "for sell";
            propertyType = (i % 3 === 0) ? "House" : "Villa";
            price = `₹${(Math.floor(Math.random() * 5) + 1) * 10000000}`; // 1-5 Cr
            area = `${Math.floor(Math.random() * 1000) + 1500} sqft`; // 1500-2500 sqft
            beds = Math.floor(Math.random() * 2) + 2; // 2-3 beds
            baths = Math.floor(Math.random() * 2) + 1; // 1-2 baths
        }

        properties.push({
            id: i,
            image: getPropertyImage('residential', i),
            timeAgo: `${Math.floor(Math.random() * 30) + 1} days ago`,
            status: status,
            category: category,
            type: "residential",
            title: title,
            description: `${description} This property is available ${status.replace('for ', '')}. Located in a prime area of ${cities[Math.floor(Math.random() * cities.length)]}.`,
            features: [`${beds} Beds`, `${baths} Baths`, area, "Parking", "24/7 Security"],
            price: price,
            location: cities[Math.floor(Math.random() * cities.length)],
            propertyType: propertyType,
            furnishing: "Semi-furnished",
            availability: "Immediate"
        });
    }

    // Generate 25 Commercial Properties
    for (let i = 26; i <= 50; i++) {
        let status;
        let title;
        let description;
        let featuresBase;
        let category;
        let propertyType;
        let price;
        let area;

        title = commercialTitles[Math.floor(Math.random() * commercialTitles.length)];
        description = commercialDescriptions[Math.floor(Math.random() * commercialDescriptions.length)];

        if (i % 2 === 0) { // Even IDs for rent/lease
            status = "for rent";
            featuresBase = ["Open Plan", "Conference Room", "High-Speed Internet"];
            category = "for rent";
            propertyType = (i % 4 === 0) ? "Retail Shop" : "Office Space";
            price = `₹${(Math.floor(Math.random() * 5) + 5) * 100000}`; // 5L-10L per month
            area = `${Math.floor(Math.random() * 1000) + 500} sqft`; // 500-1500 sqft
        } else { // Odd IDs for sell
            status = "for sell";
            featuresBase = ["Retail Space", "Ample Parking", "High Foot Traffic"];
            category = "for sell";
            propertyType = "Commercial Building";
            price = `₹${(Math.floor(Math.random() * 10) + 5) * 10000000}`; // 5-15 Cr
            area = `${Math.floor(Math.random() * 5000) + 2000} sqft`; // 2000-7000 sqft
        }

        properties.push({
            id: i,
            image: getPropertyImage('commercial', i - 25), // Adjust index for commercial properties (1 to 25)
            timeAgo: `${Math.floor(Math.random() * 30) + 1} days ago`,
            status: status,
            category: category,
            type: "commercial",
            title: title,
            description: `${description} This property is available ${status.replace('for ', '')}. Located in ${cities[Math.floor(Math.random() * cities.length)]}.`,
            features: featuresBase.concat([area, "24/7 Access", "Prime Location"]),
            price: price,
            location: cities[Math.floor(Math.random() * cities.length)],
            propertyType: propertyType,
            furnishing: "Unfurnished",
            availability: "Immediate"
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

    // Function to render property cards (re-usable for all sections) - This is for carousels only
    function renderPropertyCards(containerElement, filteredProperties) {
        containerElement.innerHTML = ''; // Clear previous cards
        if (filteredProperties.length === 0) {
            containerElement.innerHTML = '<p class="text-center text-gray-400 w-full">No properties found for this category.</p>';
            return;
        }

        filteredProperties.forEach((property, index) => {
            const card = document.createElement('div');
            card.classList.add(
                'bg-gray-800', 'rounded-lg', 'shadow-xl', 'overflow-hidden',
                'transform', 'transition-all', 'duration-500',
                'hover:scale-105', 'hover:shadow-2xl',
                'property-card-shadow', 'w-96', 'flex-shrink-0',
                'cursor-pointer', 'mx-4',
                'opacity-0', 'translate-y-8'
            );
            card.style.transitionDelay = `${index * 50}ms`;
            card.dataset.propertyId = property.id;

            // Simplified card content: only image and description
            card.innerHTML = `
                <img src="${property.image}" alt="${property.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-white mb-2">${property.title}</h3>
                    <p class="text-gray-300 text-sm mb-2">${property.description}</p>
                </div>
            `;
            containerElement.appendChild(card);

            setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-8');
                card.classList.add('opacity-100', 'translate-y-0');
            }, 10);

            card.addEventListener('click', () => showPropertyDetail(property.id));
        });
    }

    // Function to render static content for Service Tabs
     function renderServiceContent(category) {
        serviceContentContainer.innerHTML = ''; // Clear previous content
        // Add classes for a smooth fade-in effect when content changes
        serviceContentContainer.classList.add('opacity-0', 'transition-opacity', 'duration-500'); 

        let contentHtml = '';
        // Define a robust card class for responsiveness:
        // - bg-gray-800, rounded-lg, shadow-xl for styling
        // - p-8 for padding
        // - flex flex-col md:flex-row: Stacks vertically on small screens, becomes horizontal on medium screens and up
        // - items-center: Vertically centers items in the flex container
        // - gap-8: Adds space between flex items
        // - w-full max-w-6xl mx-auto: Ensures full width on small screens, max-width on larger, and centers the card
        const cardClass = "bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 w-full max-w-6xl mx-auto";

        switch (category) {
            case 'featured':
                contentHtml = `
                    <div class="${cardClass}">
                        <div class="md:w-1/2 w-full">
                            <img src="${userImages.residential1}" alt="Featured Property" class="w-full h-auto rounded-md shadow-lg object-cover">
                        </div>
                        <div class="md:w-1/2 w-full text-center md:text-left">
                            <h2 class="text-3xl font-bold text-blue-300 mb-4">Discover Our Featured Properties</h2>
                            <p class="text-gray-300 text-lg mb-4">Explore a curated selection of our most exclusive and high-demand properties. These listings offer exceptional value and strong investment potential.</p>
                            <ul class="text-gray-400 list-disc list-inside space-y-2 mb-6 text-left mx-auto md:mx-0">
                                <li>Prime Locations & Exclusive Deals</li>
                                <li>High Appreciation & Rental Yield Prospects</li>
                                <li>Vetted Properties for Quality Assurance</li>
                            </ul>
                            <button onclick="window.scrollToContact()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105">Inquire About Featured</button>
                        </div>
                    </div>
                `;
                break;
            case 'for sell':
                contentHtml = `
                    <div class="${cardClass}">
                        <div class="md:w-1/2 w-full">
                            <img src="${userImages.commercial1}" alt="Selling Process" class="w-full h-auto rounded-md shadow-lg object-cover">
                        </div>
                        <div class="md:w-1/2 w-full text-center md:text-left">
                            <h2 class="text-3xl font-bold text-blue-300 mb-4">Our Seamless Selling Process</h2>
                            <p class="text-gray-300 text-lg mb-4">Selling your home is easy with us. We leverage our experience to guide you through every step, ensuring you get the best value.</p>
                            <ol class="text-gray-400 list-decimal list-inside space-y-3 mb-6 text-left mx-auto md:mx-0">
                                <li><strong>Consultation:</strong> Understand your needs and property value.</li>
                                <li><strong>Market Analysis:</strong> Comprehensive market insights and pricing.</li>
                                <li><strong>Preparation:</strong> Professional photography and staging advice.</li>
                                <li><strong>Showcase:</strong> Virtual tours, open houses, compelling descriptions.</li>
                                <li><strong>Marketing:</strong> Targeted campaigns on top portals and social media.</li>
                                <li><strong>Negotiation:</strong> Expert negotiation for best offers and terms.</li>
                                <li><strong>Closing:</strong> Smooth paperwork and hassle-free transaction.</li>
                            </ol>
                            <button onclick="window.scrollToContact()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105">Start Selling Today</button>
                        </div>
                    </div>
                `;
                break;
            case 'for buy':
                contentHtml = `
                    <div class="${cardClass}">
                        <div class="md:w-1/2 w-full">
                            <img src="${userImages.generalProperty}" alt="Buying a Property" class="w-full h-auto rounded-md shadow-lg object-cover">
                        </div>
                        <div class="md:w-1/2 w-full text-center md:text-left">
                            <h2 class="text-3xl font-bold text-blue-300 mb-4">Your Journey to a New Home Starts Here</h2>
                            <p class="text-gray-300 text-lg mb-4">Finding your dream property is an exciting adventure. We offer expert guidance and personalized support for an effortless buying experience.</p>
                            <ol class="text-gray-400 list-decimal list-inside space-y-3 mb-6 text-left mx-auto md:mx-0">
                                <li><strong>Define Needs:</strong> Understand your preferences, budget, and ideal location.</li>
                                <li><strong>Property Search:</strong> Access our extensive database for curated listings.</li>
                                <li><strong>Guided Viewings:</strong> Accompanied tours with expert insights.</li>
                                <li><strong>Offer & Negotiation:</strong> Craft competitive offers and secure best terms.</li>
                                <li><strong>Financing & Legal:</strong> Seamless loan and documentation support.</li>
                                <li><strong>Due Diligence:</strong> Comprehensive property checks for peace of mind.</li>
                                <li><strong>Smooth Closing:</strong> Oversee final stages for hassle-free ownership transfer.</li>
                            </ol>
                            <button onclick="window.scrollToContact()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105">Find Your Property</button>
                        </div>
                    </div>
                `;
                break;
            case 'for rent':
                contentHtml = `
                    <div class="${cardClass}">
                        <div class="md:w-1/2 w-full">
                            <img src="./images/featured-2.jpg" alt="Rental Services" class="w-full h-auto rounded-md shadow-lg object-cover">
                        </div>
                        <div class="md:w-1/2 w-full text-center md:text-left">
                            <h2 class="text-3xl font-bold text-blue-300 mb-4">Hassle-Free Rental Solutions</h2>
                            <p class="text-gray-300 text-lg mb-4">Whether you're looking to rent or lease out your property, we offer comprehensive services for your convenience.</p>
                            <ol class="text-gray-400 list-decimal list-inside space-y-3 mb-6 text-left mx-auto md:mx-0">
                                <li><strong>Property Search:</strong> Wide range of residential and commercial rentals.</li>
                                <li><strong>Guided Tours:</strong> Explore properties with our knowledgeable agents.</li>
                                <li><strong>Application:</strong> Streamlined application and vetting process.</li>
                                <li><strong>Lease Agreement:</strong> Expert assistance with all legal documentation.</li>
                                <li><strong>Property Management:</strong> Optional services for landlords (rent, maintenance).</li>
                                <li><strong>Move-in Support:</strong> Smooth transition assistance for tenants.</li>
                            </ol>
                            <button onclick="window.scrollToContact()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105">Explore Rentals</button>
                        </div>
                    </div>
                `;
                break;
            default:
                contentHtml = '<p class="text-center text-gray-400 w-full">Select a service to learn more.</p>';
        }

        serviceContentContainer.innerHTML = contentHtml;
        // Trigger fade-in to make the content appear smoothly
        setTimeout(() => {
            serviceContentContainer.classList.remove('opacity-0');
        }, 10);
    }



    // Function to show property detail modal
    function showPropertyDetail(propertyId) {
        const property = properties.find(p => p.id === propertyId);
        if (!property) return;

        document.getElementById('detail-property-image').src = property.image;
        document.getElementById('detail-property-title').textContent = property.title;
        document.getElementById('detail-property-description').textContent = property.description;
        // The detail overlay still uses status and timeago
        document.getElementById('detail-property-status').textContent = property.status;
        document.getElementById('detail-property-timeago').textContent = property.timeAgo;

        const featuresList = document.getElementById('detail-property-features');
        featuresList.innerHTML = ''; // Clear previous features
        property.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            li.classList.add('text-gray-300', 'text-base'); // Add Tailwind classes for styling
            featuresList.appendChild(li);
        });

        // Update additional details
        document.getElementById('detail-property-type').textContent = property.propertyType || 'N/A';
        document.getElementById('detail-property-area').textContent = property.features.find(f => f.includes('sqft')) || 'N/A';
        document.getElementById('detail-property-beds').textContent = property.features.find(f => f.includes('Beds')) || 'N/A';
        document.getElementById('detail-property-baths').textContent = property.features.find(f => f.includes('Bath')) || 'N/A';
        document.getElementById('detail-property-price').textContent = property.price || 'On Request';
        document.getElementById('detail-property-location').textContent = property.location || 'N/A';
        document.getElementById('detail-property-furnishing').textContent = property.furnishing || 'N/A';
        document.getElementById('detail-property-availability').textContent = property.availability || 'N/A';


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
            renderServiceContent(category); // Call the new function for static content
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
                currentIndex = 0;
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
                if (totalItems === 0) return;

                const maxScrollIndex = Math.max(0, totalItems - currentItemsPerView);

                currentIndex++;
                if (currentIndex > maxScrollIndex) {
                    currentIndex = 0;
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


    // Automated Carousel for Featured Highlights (now uses dynamic generation)
    const featuredCarouselInner = document.getElementById('carousel-inner');
    let featuredCurrentIndex = 0;
    let featuredCarouselInterval;
    const featuredScrollSpeed = 3000;

    // Function to render Featured Highlights items dynamically
    function renderFeaturedHighlights() {
        featuredCarouselInner.innerHTML = ''; // Clear existing items
        featuredHighlightsData.forEach((item, index) => {
            const highlightCard = document.createElement('div');
            highlightCard.classList.add(
                'group', 'relative', 'flex-none', 'w-full', 'sm:w-1/2', 'md:w-1/3', 'lg:w-1/4',
                'h-[250px]', 'rounded-xl', 'shadow-lg', 'overflow-hidden', 'cursor-pointer', 'mx-4'
            );
            highlightCard.innerHTML = `
                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style="background-image: url('${getFeaturedHighlightImage(index)}');">
                </div>
                <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 class="text-lg sm:text-xl font-semibold mb-2">${item.title}</h3>
                    <p class="text-sm sm:text-base">${item.description}</p>
                </div>
            `;
            featuredCarouselInner.appendChild(highlightCard);
        });
    }


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

        const offset = -featuredCurrentIndex * itemWidth;

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

    // Initial call to render and start featured carousel
    renderFeaturedHighlights(); // Render the items first
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

    // Initial load: Trigger click on the 'Featured' tab for services section
    const initialServiceTab = document.querySelector('.service-tab[data-category="featured"]');
    if (initialServiceTab) {
        initialServiceTab.click();
    }

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