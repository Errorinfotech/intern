$newFooter = @'
    <!-- Modular Accordion Footer -->
    <footer class="footer">
        <div class="footer-container">
            <!-- Brand & Contact Section -->
            <div class="footer-brand-section">
                <!-- Logo top-left -->
                <div class="footer-logo-row">
                    <img src="./image/logo4.png" alt="Error Infotech Logo" class="footer-logo-img">
                </div>

                <!-- Centered content -->
                <div class="footer-center-content">
                    <p class="footer-tagline">India's Premier AI-Powered Internship Program</p>
                    <p class="footer-description">We train future-ready professionals through hands-on, industry-grade internships — giving you real tools, real projects, and real results.</p>

                    <div class="footer-contact-icons">
                        <a href="mailto:errorinfotech404@gmail.com" class="footer-icon-btn email" data-label="Email"><i class="fas fa-envelope"></i></a>
                        <a href="tel:+918128704400" class="footer-icon-btn phone" data-label="Call Us"><i class="fas fa-phone-alt"></i></a>
                        <a href="https://maps.google.com/maps?q=Malviya+Coins,+Dr+Yagnik+Rd,+Rajkot,+Gujarat+360002" target="_blank" class="footer-icon-btn location" data-label="Location"><i class="fas fa-map-marker-alt"></i></a>
                        <a href="https://wa.me/918128704400" target="_blank" class="footer-icon-btn whatsapp" data-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                        <a href="https://www.linkedin.com/in/error-infotech-1947b9381/" target="_blank" class="footer-icon-btn linkedin" data-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://www.instagram.com/errorinfotech_pvt.ltd" target="_blank" class="footer-icon-btn instagram" data-label="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                    <p class="footer-address"><i class="fas fa-map-marker-alt" style="color:#bb734b;font-size:0.75rem;"></i> 302 - Malviya Coins, Dr Yagnik Rd, Rajkot, Gujarat 360002</p>
                </div>
            </div>

            <!-- Map + Navigation Layout -->
            <div class="footer-map-nav-grid">

                <!-- Left: Embedded Map -->
                <div class="footer-map-wrapper">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3020788360077!2d70.80177727526163!3d22.30382577968585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca10b5fc42bd%3A0xcb1a8b1ee7c8082f!2sMalviya%20Coins%2C%20Dr%20Yagnik%20Rd%2C%20Rajkot%2C%20Gujarat%20360002!5e0!3m2!1sen!2sin!4v1712494000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        class="footer-map-iframe">
                    </iframe>
                    <div class="footer-map-overlay">
                        <a href="https://maps.google.com/maps?q=Malviya+Coins,+Dr+Yagnik+Rd,+Rajkot,+Gujarat+360002" target="_blank" class="footer-map-link">
                            <i class="fas fa-map-marker-alt"></i> Open in Google Maps
                        </a>
                    </div>
                </div>

                <!-- Right: Accordion Buttons stacked vertically -->
                <div class="footer-accordion-stack">
                    <!-- Program / Services -->
                    <div class="accordion-item" id="services-accordion">
                        <div class="accordion-header" onclick="toggleFooterAccordion('services-accordion')">
                            <div class="header-icon"><i class="fas fa-briefcase"></i></div>
                            <span>OUR PROGRAMS</span>
                            <i class="fas fa-chevron-right arrow"></i>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-links-grid">
                                <a href="#operations">Operations</a>
                                <a href="#packages">Internship Packages</a>
                                <a href="#company">About Us</a>
                                <a href="#apply">Apply Now</a>
                            </div>
                        </div>
                    </div>

                    <!-- Support & Legal -->
                    <div class="accordion-item" id="support-accordion">
                        <div class="accordion-header" onclick="toggleFooterAccordion('support-accordion')">
                            <div class="header-icon"><i class="fas fa-question-circle"></i></div>
                            <span>SUPPORT &amp; LEGAL</span>
                            <i class="fas fa-chevron-right arrow"></i>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-links-grid">
                                <a href="#" onclick="openModal('faqModal'); return false;">Help &amp; FAQ</a>
                                <a href="#" onclick="openModal('contactModal'); return false;">Contact Support</a>
                                <a href="#" onclick="openModal('termsModal'); return false;">Terms of Service</a>
                                <a href="#" onclick="openModal('privacyModal'); return false;">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Trust Strip — credibility for students -->
            <div class="footer-trust-strip">
                <div class="trust-item">
                    <span class="trust-number">500+</span>
                    <span class="trust-label">Interns Trained</span>
                </div>
                <div class="trust-item">
                    <span class="trust-number">10+</span>
                    <span class="trust-label">Internship Tracks</span>
                </div>
                <div class="trust-item">
                    <span class="trust-number">95%</span>
                    <span class="trust-label">Placement Rate</span>
                </div>
                <div class="trust-item">
                    <span class="trust-number">5&#9733;</span>
                    <span class="trust-label">Student Rating</span>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="footer-bottom-v2">
                <p>&copy; 2026 Error Infotech Pvt. Ltd. All rights reserved.</p>
                <div class="footer-bottom-socials">
                    <a href="https://www.linkedin.com/in/error-infotech-1947b9381/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/errorinfotech_pvt.ltd" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="https://wa.me/918128704400" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>
    </footer>
'@

$pages = @(
    "data-analysis.html",
    "backend-dev.html",
    "frontend-dev.html",
    "ai-ml internship.html",
    "qa-testing.html",
    "graphic-designer-operations.html",
    "content-creator.html",
    "bde-operations.html",
    "digital bussiness management.html",
    "product photography-videography.html"
)

$baseDir = "e:\intern\intern\paid intern\frontend"

foreach ($page in $pages) {
    $path = Join-Path $baseDir $page
    if (-not (Test-Path $path)) {
        Write-Host "NOT FOUND: $page"
        continue
    }

    $content = Get-Content $path -Raw -Encoding UTF8

    # Match from the footer comment to closing </footer> tag
    $pattern = '(?s)([ \t]*<!--\s*Modular Accordion Footer\s*-->.*?</footer>)'

    if ($content -match $pattern) {
        $content = $content -replace $pattern, $newFooter
        [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
        Write-Host "UPDATED: $page"
    } else {
        Write-Host "PATTERN NOT MATCHED: $page — trying fallback..."
        # Fallback: match just <footer ...> to </footer>
        $fallbackPattern = '(?s)(<footer class="footer">.*?</footer>)'
        if ($content -match $fallbackPattern) {
            # Wrap with the comment
            $replacement = "    <!-- Modular Accordion Footer -->`n" + ($newFooter -replace '^\s*<!--.*?-->\s*\n', '')
            $content = $content -replace $fallbackPattern, $newFooter
            [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
            Write-Host "UPDATED (fallback): $page"
        } else {
            Write-Host "COULD NOT UPDATE: $page"
        }
    }
}

Write-Host "`nAll done!"
