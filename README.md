# Sebastian Vernis - Personal Portfolio Website

## Description

This is the personal portfolio website for Sebastian Vernis, showcasing web development and digital marketing services. It is designed as a single-page application (SPA) to provide a smooth user experience.

## Features

The website includes the following sections and functionalities:

*   **Home:**
    *   Hero section with an introductory message.
    *   "Why work with me?" (Diferenciadores) section.
    *   "About Me" section.
    *   "Our Process" outlining the workflow.
    *   Call-to-action (CTA) for a free consultation.
*   **Services:** Dynamically generated list of services offered, categorized for clarity. Each service includes a title, focus area, description, and a multimedia prompt suggestion.
*   **Catalog:** A showcase of sample websites.
    *   Dynamically generated catalog items.
    *   Filtering capabilities based on "Rubro" (Sector/Industry) and "Características" (Features).
    *   Each item includes a name, description, preview (iframe), list of features, and a link to a live demo.
*   **Shop:** A section for purchasing packaged digital services or requesting custom quotes.
    *   Dynamically generated product listings.
    *   Each product includes a name, short description, pricing (original and final), availability, image, and a CTA button.
*   **Contact:**
    *   A comprehensive contact form for inquiries.
    *   Uses [Web3Forms](https://web3forms.com/) for form submission.
*   **Responsive Design:** The website is designed to be accessible and usable across various devices and screen sizes.
*   **SPA-like Navigation:** Smooth transitions between sections without page reloads, managed by JavaScript.

## Technologies Used

*   **HTML5:** For the structure of the website.
*   **CSS3:** For styling and presentation.
*   **JavaScript (ES6+):** For dynamic content generation, interactivity, SPA navigation, and form handling.
*   **Web3Forms:** For the backend processing of the contact form.

## File Structure

The main files in this project are:

*   `index.html`: The main HTML file that contains the structure for all sections.
*   `script.js`: Contains all JavaScript code for:
    *   SPA navigation logic.
    *   Dynamic rendering of Services, Catalog items, and Shop products from hardcoded JavaScript arrays.
    *   Filtering logic for the Catalog.
    *   Contact form submission logic (interfacing with Web3Forms).
*   `styles.css`: Contains all CSS rules for the website's appearance.
*   `CNAME`: Custom domain configuration file for GitHub Pages.

## Setup

To run this website locally:

1.  Clone the repository or download the files.
2.  Open the `index.html` file in your web browser.

No special build steps or dependencies are required.

## How to Use/Navigate

*   Click on the navigation links in the header (`Inicio`, `Servicios`, `Catálogo`, `Tienda`, `Contacto`) to jump to the respective sections.
*   Buttons within sections (e.g., "Ver Mis Servicios", "Solicita una asesoría gratuita") also navigate to relevant parts of the page.
*   The Catalog section features filters that can be toggled and used to narrow down the displayed sample websites.
*   The Shop section items have CTAs that typically lead to the Contact section with pre-filled information (though this pre-fill might be basic).

## Content Sources

The content for the "Servicios", "Catálogo", and "Tienda" sections is managed directly within the `script.js` file as JavaScript arrays:

*   `serviciosData`: Array of service objects.
*   `catalogoData`: Array of catalog item objects.
*   `tiendaProductosData`: Array of shop product objects.

To update or add content to these sections, you will need to modify these arrays in `script.js`.

## Contact Form

The contact form in the "Contacto" section uses Web3Forms. The API access key is included in `script.js`. Messages are sent to the email address associated with this key.

## Author

*   **Sebastian Vernis**

## License

This project is currently not under a specific license. Consider adding an open-source license like MIT if you wish to allow others to use or modify the code.
